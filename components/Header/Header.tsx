import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import ExamplesMenu from "./ExamplesMenu";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink} aria-label="H-E-B home">
        <Image
          src="/heb-logo.svg"
          alt="H-E-B"
          width={115}
          height={40}
          className={styles.logo}
          priority
        />
      </Link>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <ExamplesMenu />
      </nav>
    </header>
  );
}
