import "./globals.css";

export const metadata = {
  title: "Almoxarifado",
  description: "Sistema simples de almoxarifado",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="app-wrapper">
          <header style={{ padding: 12, borderBottom: "1px solid #eee" }}>
            <h1>Almoxarifado</h1>
          </header>
          <main style={{ padding: 16 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
