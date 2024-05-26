import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ChatsClient from './client';

export const metadata = {
  title: 'Chats - Whisp',
};

export default async function ProtectedPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth');

  const { data: matches } = await supabase
    .from('rooms')
    .select('*')
    .or(`user_one.eq.${user.id}, user_two.eq.${user.id}`);
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .or(`sent_by.eq.${user.id}, received_by.eq.${user.id}`);

  return (
    <div className="grid w-full p-2 place-items-center h-full">
      <ChatsClient user={user} matchs={matches} messages={messages} />
    </div>
  );
}
