import styles from "../../page.module.css";
import DepartmentsList from "./DepartmentsList";

export default function DepartmentsClientPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Departments (client-side)</h1>
      <div className={styles.content}>
        <p>
          This page fetches data from the local GraphQL API{" "}
          <strong>in the browser</strong>. The list below is rendered by a{" "}
          <code>&quot;use client&quot;</code> component that calls{" "}
          <code>/api/graphql</code> with <code>fetch</code> inside a{" "}
          <code>useEffect</code>, managing its own loading and error states.
        </p>
      </div>
      <DepartmentsList />
    </div>
  );
}
