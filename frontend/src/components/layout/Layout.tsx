import NavBar from "./NavBar";

export default function Layout({ children }: any) {
  return (
    <div>
      <NavBar />
      <div style={{ padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}