'use server'
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { checkUUID } from "@/lib/checks"

export async function createRoom(id, profile, user){
  const supabase = createClient()
  const uuid = checkUUID(id) ? id : profile.id
  if(uuid === user.id) return {
    message: "You can't text yourself.",
    type: "error"
  }
  if(user){
    const { data, error } =await supabase.from('rooms').insert({
      user_one: user.id,
      user_two: uuid,
    }).select()
    console.log('data',data)
    if(data){
      return redirect(`/chats/${data[0].id}`)
    }
    console.log(error)
    return {
      message: error.hint,
      type: 'error'
    }
  }
  return redirect(`/auth?match=${uuid}`)
}