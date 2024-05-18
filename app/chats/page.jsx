import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ChatsClient from "./client";

export const metadata = {
  title: "Chats - HYD",
};

export default async function ProtectedPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const { data: matches } = await supabase
    .from("rooms")
    .select("*")
    .or(`matched_one.eq.${user.id}, matched_two.eq.${user.id}`);

  return (
    <div>
      <div className="grid w-full p-2 place-items-center h-full">
        <ChatsClient user={user} matchs={matches} />
      </div>
    </div>
  );
}
