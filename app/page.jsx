import { getProjects } from "../lib/db";

export const runtime = "nodejs";
export const revalidate = 0;

export default async function HomePage() {
  let projects = [];
  let error = null;

  try {
    projects = await getProjects();
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  return (
    <main>
      <h1>Projects</h1>

      {error ? (
        <div style={{ color: "crimson", marginTop: "1rem" }}>
          <p>
            Error loading projects: <b>{error}</b>
          </p>
          <p>
            Ensure DATABASE_URL is set in .env.local and the database is
            reachable.
          </p>
        </div>
      ) : projects.length === 0 ? (
        <p style={{ marginTop: "1rem" }}>No projects found.</p>
      ) : (
        <table
          style={{
            borderCollapse: "collapse",
            marginTop: "1rem",
            minWidth: 400,
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                ID
              </th>
              <th
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {p.id}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
