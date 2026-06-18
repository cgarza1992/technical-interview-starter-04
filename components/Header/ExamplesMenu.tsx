"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

const examples = [
  { href: "/examples/departments-client", label: "Departments (client-side)" },
  { href: "/examples/departments-server", label: "Departments (server-side)" },
  { href: "/examples/products", label: "Products (server-side)" },
];

export default function ExamplesMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.menu} ref={containerRef}>
      <button
        type="button"
        className={styles.navLink}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        Examples
      </button>
      {open && (
        <div className={styles.dropdown} role="menu">
          {examples.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.dropdownLink}
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
