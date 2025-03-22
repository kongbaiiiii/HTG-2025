import Link from "next/link";
import { Aperture } from 'lucide-react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="w-full flex justify-between items-center py-4">
      <div className="flex items-center gap-2">
        <Aperture className="text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Smart Finance</h1>
      </div>
      <div className="flex items-center gap-4">
        <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Learn</Link>
        <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tools</Link>
        <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
        <SignedOut>
          <div className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors [&>*]:cursor-pointer">
            <SignInButton />
          </div>
          <div className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors [&>*]:cursor-pointer">
            <SignUpButton />
          </div>
        </SignedOut>
        <SignedIn>
          <div className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors [&>*]:cursor-pointer">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </header>
  );
}