import Link from "next/link";
import { Aperture } from 'lucide-react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {checkUser} from "@/utils/checkUser";

export default async function Navbar() {
  await checkUser();
  return (
    <header className="w-full flex justify-between items-center py-4">
      <div className="flex items-center gap-2">
        <Aperture className="text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Smart Finance</h1>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-lg font-bold">Home</Link>
        <Link href="/simulation" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-lg font-bold">Simulation</Link>
        <SignedOut>
          <div className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors  text-lg [&>*]:cursor-pointer [&>*]:font-bold">
            <SignInButton />
          </div>
          <div className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-lg font-bold [&>*]:cursor-pointer">
            <SignUpButton />
          </div>
        </SignedOut>
        <SignedIn>
          <Link href="/lesson" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-lg font-bold">Lesson</Link>
          <div className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-lg font-bold [&>*]:cursor-pointer">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </header>
  );
}