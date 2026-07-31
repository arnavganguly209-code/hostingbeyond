/**
 * Temporary verification homepage — not final design.
 */
export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        backgroundColor: "#ffffff",
        color: "#111111",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, margin: 0 }}>
        HostingBeyond
      </h1>
      <p style={{ fontSize: "1.25rem", margin: 0 }}>Project is Working</p>
      <p style={{ fontSize: "1rem", margin: 0, color: "#444444" }}>
        Next.js Running Successfully
      </p>
    </main>
  );
}
