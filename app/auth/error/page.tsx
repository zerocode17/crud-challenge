import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthError() {
  return (
    <div className="flex pt-20 items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-600">
          There was a problem with your authentication.
        </p>
        <p className="text-gray-600">Please try signing in again.</p>
        <Link href="/">
          <Button className="mt-4 font-semibold">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
