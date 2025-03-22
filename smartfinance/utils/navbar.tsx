import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="hidden sm:flex gap-6">
      <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Learn</Link>
      <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tools</Link>
      <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
      <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Log In</Link>
      <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sign Up</Link>
    </nav>
  );
}