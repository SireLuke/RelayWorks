import { Link } from "react-router-dom";

export default function NavBar() {
  const bar = {
    display: "flex",
    gap: "20px",
    padding: "10px",
    background: "#222",
    color: "#fff"
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold"
  };

  return (
    <nav style={bar}>
      <Link to="/owner" style={linkStyle}>Owner</Link>
      <Link to="/operator" style={linkStyle}>Operator</Link>
      <Link to="/client" style={linkStyle}>Client</Link>
      <Link to="/worker" style={linkStyle}>Worker</Link>
      <Link to="/reviewer" style={linkStyle}>Reviewer</Link>
    </nav>
  );
}