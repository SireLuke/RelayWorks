#!/usr/bin/env python3
"""
JOBF v0.1 — Janus Octadial Breathing Field
PAN V8 research prototype.

Models an 8D cross-polytope boundary with one global breathing mode and
eight locally oscillating channels. UHFE and UDFE are separate coupled
signals. The optional softened central potential is a geometric bias,
NOT a physical gravity solver.

Dependencies: numpy, matplotlib
Run: python jobf_v0_1.py
Optional: python jobf_v0_1.py --steps 2400 --dt 0.005 --samples 8192 --gravity 0.02
"""
from __future__ import annotations

import argparse
import csv
from pathlib import Path
import numpy as np
import matplotlib.pyplot as plt

DIM = 8
PHI = (1.0 + np.sqrt(5.0)) / 2.0
GOLDEN_ANGLE = 2.0 * np.pi / PHI**2


def sphere_directions(count: int, seed: int = 7) -> np.ndarray:
    rng = np.random.default_rng(seed)
    x = rng.normal(size=(count, DIM))
    return x / np.linalg.norm(x, axis=1, keepdims=True)


def base_radius(n: np.ndarray) -> np.ndarray:
    """Radial function of {q in R^8: sum(abs(q_i)) <= 1}."""
    return 1.0 / np.maximum(np.abs(n).sum(axis=1), 1e-12)


class JanusOctadialBreathingField:
    def __init__(self, dt=0.01, gravity=0.0, softening=0.25):
        self.dt = float(dt)
        self.gravity = float(gravity)
        self.softening = float(softening)
        self.phase = np.arange(DIM) * GOLDEN_ANGLE
        self.local_phase = self.phase[::-1].copy()
        # Explicitly independent UHFE/UDFE frequencies and phase offsets.
        self.h_base = np.full(DIM, 0.60)
        self.d_base = np.full(DIM, 0.40)
        self.h_amp, self.d_amp = 0.035, 0.030
        self.h_omega, self.d_omega = 0.83, 1.09
        self.global_amp, self.global_omega = 0.12, 1.00
        self.local_amp, self.local_omega = 0.055, 1.17
        self.interaction = 0.20
        self.k_h, self.k_d = 1.0, 1.0

    def fields(self, t):
        h = self.h_base + self.h_amp * np.cos(self.h_omega*t + self.phase)
        d = self.d_base + self.d_amp * np.cos(
            self.d_omega*t + self.phase + np.pi/3.0
        )
        return h, d

    def channel_state(self, t):
        h, d = self.fields(t)
        hc, dc = h-self.h_base, d-self.d_base
        global_breath = self.global_amp*np.cos(self.global_omega*t)
        local = self.local_amp*np.cos(self.local_omega*t+self.local_phase)
        cross = hc*dc
        # Formation and dissolution remain distinct; interaction is explicit.
        channels = local + self.k_h*hc - self.k_d*dc + self.interaction*cross
        return global_breath, channels, h, d, cross

    def boundary(self, directions, t):
        rho0 = base_radius(directions)
        weights = directions**2
        weights /= weights.sum(axis=1, keepdims=True)
        global_breath, channels, h, d, cross = self.channel_state(t)
        exponent = global_breath + weights @ channels
        if self.gravity:
            q = directions*rho0[:, None]
            r2 = np.sum(q*q, axis=1)
            # Softened potential used only as a radial deformation bias.
            exponent += -self.gravity/np.sqrt(r2+self.softening**2)
        rho = rho0*np.exp(exponent)
        return rho, rho0, exponent, (global_breath, channels, h, d, cross)

    def simulate(self, steps=1200, samples=4096, seed=19):
        if steps < 2 or samples < 100:
            raise ValueError("Use steps >= 2 and samples >= 100.")
        n = sphere_directions(samples, seed)
        times = np.arange(steps)*self.dt
        rows, snapshots = [], {}
        snap_ids = set(np.linspace(0, steps-1, 7, dtype=int))
        previous_mean = None
        for k, t in enumerate(times):
            rho, rho0, exponent, state = self.boundary(n, t)
            gb, channels, h, d, cross = state
            mean_r = float(rho.mean())
            velocity = 0.0 if previous_mean is None else (mean_r-previous_mean)/self.dt
            previous_mean = mean_r
            rows.append({
                "time": float(t),
                "mean_radius": mean_r,
                "baseline_mean_radius": float(rho0.mean()),
                "mean_radial_velocity": velocity,
                "min_radius": float(rho.min()),
                "max_radius": float(rho.max()),
                "global_breath": float(gb),
                "uhfe_mean": float(h.mean()),
                "udfe_mean": float(d.mean()),
                "mean_abs_interference": float(np.abs(cross).mean()),
                "channel_spread": float(channels.std()),
                "boundary_positive": bool(np.all(rho > 0)),
            })
            if k in snap_ids:
                snapshots[k] = rho.copy()
        return times, n, rows, snapshots


def write_metrics(rows, path):
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def plot_diagnostics(model, times, directions, rows, snapshots, path):
    fig, axes = plt.subplots(2, 2, figsize=(13, 9), constrained_layout=True)
    ax = axes[0, 0]
    ax.plot(times, [r["mean_radius"] for r in rows], label="deformed mean radius")
    ax.plot(times, [r["baseline_mean_radius"] for r in rows], "--", label="base geometry")
    ax.set(title="Global breathing response", xlabel="model time", ylabel="mean radius")
    ax.legend()

    ax = axes[0, 1]
    ax.plot(times, [r["mean_radial_velocity"] for r in rows])
    ax.axhline(0, linewidth=0.8)
    ax.set(title="Mean radial velocity", xlabel="model time", ylabel="d(mean radius)/dt")

    ax = axes[1, 0]
    for i in range(DIM):
        values = [model.channel_state(float(t))[1][i] for t in times]
        ax.plot(times, values, label=f"channel {i+1}")
    ax.set(title="Eight directional channels", xlabel="model time", ylabel="deformation")
    ax.legend(ncol=2, fontsize=8)

    ax = axes[1, 1]
    for k, rho in snapshots.items():
        points = directions*rho[:, None]
        ax.scatter(points[:, 0], points[:, 1], s=3, alpha=0.22, label=f"t={times[k]:.2f}")
    ax.set_aspect("equal", adjustable="datalim")
    ax.set(title="2D projection of sampled 8D boundary", xlabel="q1", ylabel="q2")
    ax.legend(fontsize=7)
    fig.suptitle("JOBF v0.1 — Janus Octadial Breathing Field")
    fig.savefig(path, dpi=180)
    plt.close(fig)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--steps", type=int, default=1200)
    parser.add_argument("--dt", type=float, default=0.01)
    parser.add_argument("--samples", type=int, default=4096)
    parser.add_argument("--gravity", type=float, default=0.0,
                        help="optional softened-potential shape bias (default off)")
    parser.add_argument("--output", type=Path, default=Path("jobf_output"))
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    model = JanusOctadialBreathingField(args.dt, args.gravity)
    times, directions, rows, snapshots = model.simulate(args.steps, args.samples)
    csv_path = args.output/"jobf_v0_1_metrics.csv"
    png_path = args.output/"jobf_v0_1_diagnostics.png"
    write_metrics(rows, csv_path)
    plot_diagnostics(model, times, directions, rows, snapshots, png_path)
    print("JOBF v0.1 complete")
    print(f"steps={args.steps}; dt={args.dt}; samples={args.samples}")
    print(f"boundary_positive={all(r['boundary_positive'] for r in rows)}")
    print(f"mean_radius_range=({min(r['mean_radius'] for r in rows):.6f}, "
          f"{max(r['mean_radius'] for r in rows):.6f})")
    print(f"mean_abs_interference={np.mean([r['mean_abs_interference'] for r in rows]):.6f}")
    print(f"metrics: {csv_path}")
    print(f"plot: {png_path}")


if __name__ == "__main__":
    main()
