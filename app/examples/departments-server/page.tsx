import { headers } from "next/headers";
import styles from "../../page.module.css";
import panel from "./DepartmentsList.module.css";

type Department = {
  id: string;
  name: string;
  aisle: number;
};

const DEPARTMENTS_QUERY = /* GraphQL */ `
  query Departments {
    departments {
      id
      name
      aisle
    }
  }
`;

// Build an absolute URL to our own GraphQL route. On the server, fetch() needs
// an absolute URL, so derive the origin from the incoming request headers.
async function getDepartments(): Promise<Department[]> {
  const h = await headers();
  const host = h.get("host");
  const protocol = h.get("x-forwarded-proto") ?? "http";

  const res = await fetch(`${protocol}://${host}/api/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: DEPARTMENTS_QUERY }),
    // Always fetch fresh data at request time for this example.
    cache: "no-store",
  });

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data.departments;
}

export default async function DepartmentsServerPage() {
  const departments = await getDepartments();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Departments (server-side)</h1>
      <div className={styles.content}>
        <p>
          This page fetches data from the local GraphQL API{" "}
          <strong>on the server</strong>, at render time. The list below is
          fetched inside an <code>async</code> Server Component and arrives in
          the initial HTML — no client-side JavaScript, loading spinner, or{" "}
          <code>useEffect</code> required.
        </p>
      </div>

      <section className={panel.panel}>
        <h2 className={panel.heading}>Departments</h2>
        <ul className={panel.list}>
          {departments.map((dept) => (
            <li key={dept.id} className={panel.item}>
              <span className={panel.name}>{dept.name}</span>
              <span className={panel.aisle}>Aisle {dept.aisle}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
