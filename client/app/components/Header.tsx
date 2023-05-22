import Link from "next/link";
export default function Header() {
  const a = true;
  return (
    <header>
      <nav>
        <div>
          <Link href="/">
            <h1>Logo</h1>
          </Link>
        </div>
        <div>
          <Link href="/auth/login">Login</Link>
        </div>
      </nav>
    </header>
  );
}
