'use server'
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from 'zod'

const infoSchema = z.object({
  name: z.string().trim().min(3, { message: "Name must contain 3+ characters."}).max('24', { message: "Name must not exceed 24 characters."}),
  bio: z.string().max(300, { message: "Bio is way too long."}).optional()
})

export async function updateInfo(formData){
  const name = formData.get('name')
  const bio = formData.get('bio')
  console.log(bio)
  const validatedFields = infoSchema.safeParse({
    name, bio
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    console.log(error)
    return {
      message: error.bio || error.name,
      type: 'error',
    };
  }
  const supabase = createClient()
  const { data: { user }} = await supabase.auth.getUser()
  const { error } = await supabase.auth.updateUser({
    data:{ name, bio }
  })
  const { error : err} = await supabase.from('profiles').update({ name, bio }).eq('id', user.id)
  if(error || err){
    return{
      message: error.message || err.message,
      type: 'error'
    }
  }
  return revalidatePath('/profile')
}

const avatarSchema = z.object({
  avatar: z.string().min(27, { message: "Invalid Avatar Id."}).max(28, { message: "Invalid Avatar Id."})
});

export async function updateAvatar(data) {
  const key = data.key.split('/');
  const avatarId = key[key.length-1]
  const validatedFields = avatarSchema.safeParse({
    avatar: avatarId,
  });
  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      message: error.avatar,
      type: 'error',
    };
  }
  const supabase = createClient()
  const { data: { user }} = await supabase.auth.getUser()
  const { error } = await supabase.auth.updateUser({
    data:{ avatar: avatarId }
  })
  const { error : err} = await supabase.from('profiles').update({ avatar: avatarId }).eq('id', user.id)
  if(error || err){
    return{
      message: error.message || err.message,
      type: 'error'
    }
  }
  return revalidatePath('/profile')
}