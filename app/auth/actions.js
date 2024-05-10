"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signIn = async (formData) => {
  const email = formData.get("email");
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) {
    console.log(error);
    return redirect("/auth");
  }
  return redirect(`/auth/verify?email=${email}`);
};

export const signInAnon = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signInAnonymously();
  if (error) {
    console.log(error);
    return redirect("/auth");
  }
  return revalidatePath(`/auth`);
};
