"use server";

import type { Provider } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";

export async function getUser() {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;
  return user;
}

export async function LogOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  redirect("/");
}

async function SignInWith(provider: Provider) {
  const supabase = createClient();

  const { data, error } = await (
    await supabase
  ).auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  redirect(data?.url);
}

export const SignInWithGithub = async () => SignInWith("github");
