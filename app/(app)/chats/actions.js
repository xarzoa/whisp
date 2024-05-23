'use server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { checkUUID } from '@/lib/checks';
import { revalidatePath } from 'next/cache';
import { socket } from '@/lib/ws';

export async function matchRandom(user) {
}

export async function createNewChat(formData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const id = formData.get('id');
  if (checkUUID(id)) {
    const { data, error } = await supabase
      .from('rooms')
      .insert({
        user_one: user.id,
        user_two: id,
        last_activity: new Date(),
      })
      .select();
    if (error) {
      return {
        message: error.message,
        type: 'error',
      };
    }
    return revalidatePath('/chats');
  }
  return {
    message: 'Invalid user ID.',
    type: 'error',
  };
}
