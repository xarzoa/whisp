import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {
  return <main>{children}</main>;
}
