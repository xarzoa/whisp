import { redirect } from "next/navigation";
import Messages from "./messages";
import { createClient } from "@/lib/supabase/server";
import { joinRoom } from "@/lib/ws";

export default async function ChatPortal({ params }) {
  const { id } = params;
  const supabase = createClient();
  if (id) joinRoom(id);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("messages")
    .select('*')
    .eq("room", id)
    .limit(30)
    .order("created_at", { ascending: false });
  const messages = data.map((message) => message).reverse();
  const { data: room } = await supabase.from('rooms').select('id').eq('id', id)
  if(!room[0]) redirect('/chats')
  return (
    <div className="h-screen max-w-screen">
      <div className="w-full grid place-items-center h-full p-2">
        <Messages msgs={messages} user={user} id={id} />
      </div>
    </div>
  );
}
