"use client";

import { useEffect, useState } from "react";
import styles from "./DepartmentsList.module.css";

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

export default function DepartmentsList() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: DEPARTMENTS_QUERY }),
          signal: controller.signal,
        });

        const json = await res.json();
        if (json.errors?.length) {
          throw new Error(json.errors[0].message);
        }

        setDepartments(json.data.departments);
      } catch (err) {
        // Ignore abort errors from the cleanup below.
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return (
    <section className={styles.panel}>
      <h2 className={styles.heading}>Departments</h2>

      {loading && <p className={styles.status}>Loading…</p>}
      {error && <p className={styles.error}>Failed to load: {error}</p>}

      {!loading && !error && (
        <ul className={styles.list}>
          {departments.map((dept) => (
            <li key={dept.id} className={styles.item}>
              <span className={styles.name}>{dept.name}</span>
              <span className={styles.aisle}>Aisle {dept.aisle}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
