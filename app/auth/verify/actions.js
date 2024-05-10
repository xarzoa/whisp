"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function verifyToken(token, email) {
  if (token.length === 6) {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    if (error) {
      console.log(error);
      return redirect("/auth");
    }
    return redirect("/protected");
  }
}
