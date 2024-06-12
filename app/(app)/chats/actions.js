'use server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { socket } from '@/lib/ws';
import { redis } from '@/lib/redis';
import { redirect } from 'next/navigation';

const usernameSchema = z.object({
  id: z
    .string()
    .trim()
    .uuid({ message: "Invalid ID format!"})
});

export async function createNewChat(formData) {
  const id = formData.get('id');
  const validatedFields = usernameSchema.safeParse({
    id,
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.username,
      type: 'error',
    };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: room, error } = await supabase
    .from('rooms')
    .insert({
      user_one: user.id,
      user_two: id,
      last_activity: new Date()
    }).select(`*, user_one:user_one(id, name, avatar), user_two:user_two(id, name, avatar)`)
  console.log(room)
  if (error) {
    return {
      message: error.message,
      type: 'error',
    };
  }
  socket.emit('match', room[0], id)
  revalidatePath('/chats/');
  return {
    data: room[0],
    message: 'Chat created.',
    type: 'success',
  };
}


export async function createRandomMatch(){
  const supabase = createClient()
  const { data: { user }} = await supabase.auth.getUser()

  const randomKey = await redis.randomkey()
  console.log(randomKey)

  if(randomKey === null) {
    await redis.set(user.id, 'hello')
    await redis.expire(user.id, 30)
    return {
      message: "Added to the queue.",
      type: 'info'
    }
  }
  const { data: room, error } = await supabase
    .from('rooms')
    .insert({
      user_one: user.id,
      user_two: randomKey,
      last_activity: new Date()
    }).select(`*, user_one:user_one(id, name, avatar), user_two:user_two(id, name, avatar)`)
  if (error) {
    console.log(error)
    return {
      message: error.message,
      type: 'error',
    };
  }
  socket.emit('randomMatch', room[0].id, randomKey)
  return redirect('/chats/'+ room[0].id)
}