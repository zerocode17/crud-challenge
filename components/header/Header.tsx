import Link from "next/link";
import { Button } from "../ui/button";
import { SignInWithGithub, LogOut, getUser } from "@/lib/actions/users";
import { LogOut as LogOutIcon } from "lucide-react";
import Github from "../icons/Github";

export default async function Header() {
  const user = await getUser();

  return (
    <header className="flex items-center justify-between p-4 w-full container mx-auto border-b">
      <Link href={"/"}>
        <Button variant={"link"} className="text-2xl font-medium">
          Home
        </Button>
      </Link>
      <form>
        {user ? (
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground">
              Logged in as:{" "}
              <span className="font-semibold text-foreground">
                {user.user_metadata?.user_name}
              </span>
            </p>
            <Button formAction={LogOut} variant={"link"} size={"icon"}>
              <LogOutIcon strokeWidth={4} className="text-white" />
            </Button>
          </div>
        ) : (
          <Button formAction={SignInWithGithub} className="">
            <Github />
            Log In
          </Button>
        )}
      </form>
    </header>
  );
}
