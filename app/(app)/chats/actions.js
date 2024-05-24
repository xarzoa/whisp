'use server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: 'Username must contain 2+ characters.' })
    .max(12, { message: 'Username cannot exceed 16 characters.' })
    .regex(/^[a-zA-Z0-9\$]+$/, 'Special characters not allowed.'),
});

export async function createNewChat(formData) {
  const username = formData.get('username');
  const validatedFields = usernameSchema.safeParse({
    username,
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.username,
      type: 'error',
    };
  }

  const supabase = createClient();
  const { data } = await supabase.from('profiles').select('id', 'name', 'username').eq('username', username)
  if(!data?.[0]){
    return{
      message: "No user with that username.",
      type: 'error'
    }
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from('rooms')
    .insert({
      user_one: user.id,
      user_two: data[0].id,
      last_activity: new Date()
    })
  if (error) {
    return {
      message: error.message,
      type: 'error',
    };
  }
  revalidatePath('/chats');
  return {
    message: 'Invalid user ID.',
    type: 'error',
  };
}
