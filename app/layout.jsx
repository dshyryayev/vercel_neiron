export const metadata = {
  title: "Projects App",
  description: "Next.js + Knex + PostgreSQL demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji"',
          margin: "2rem",
          lineHeight: 1.5,
        }}
      >
        {children}
      </body>
    </html>
  );
}
