'use server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function matchRandom(user) {
  const supabase = createClient();
  await supabase.from('pool').insert({
    gender: null,
    timezone: new Date().getTimezoneOffset(),
  });
  const { data: pool, error } = await supabase
    .from('pool')
    .select('id')
    .neq('id', user.id)
    .limit(20);
  if (!pool || !pool[0]) {
    return {
      message: "There's no online users right now.",
    };
  }
  const { data, error: err } = await supabase
    .from('rooms')
    .insert({
      user_one: user.id,
      user_two: pool[Math.floor(Math.random() * pool.length)].id,
      last_activity: new Date(),
    })
    .select();
  const { error: deleteError } = await supabase
    .from('pools')
    .delete()
    .eq('id', user.id);
  console.log(deleteError);
  if (!err) {
    return redirect(`/chats/${data[0].id}`);
  }
  return {
    message: err,
  };
}

export async function createNewChat(user) {
  console.log(user);
}
