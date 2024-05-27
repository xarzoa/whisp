import { redirect } from 'next/navigation';
import Messages from './client';
import { createClient } from '@/lib/supabase/server';
import { getStranger } from '@/lib/helpers';

export default async function ChatPortal({ params }) {
  const { id } = params;
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from('messages')
    .select(`*, sent_by:sent_by(id,name,avatar), received_by:received_by(id,name,avatar)`)
    .eq('room', id)
    .limit(30)
    .order('created_at', { ascending: false });

  console.log(data)
  const messages = data.map((message) => message).reverse();
  const { data: room } = await supabase.from('rooms').select('*').eq('id', id);
  console.log(room);
  if (!room[0]) redirect('/chats');
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', getStranger(room[0], user));
  return (
    <div className="h-screen max-w-screen">
      <div className="w-full grid place-items-center h-full p-2">
        <Messages msgs={messages} user={user} id={id} profile={profile[0]} />
      </div>
    </div>
  );
}
