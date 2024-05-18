'use server'
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function createRoom(id, profile, user){
  const supabase = createClient()
  const isUUID = (/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).test(id)
  const uuid =  isUUID ? id : profile.id
  if(uuid === user.id) return {
    message: "You can't text yourself."
  }
  if(user){
    const { data } =await supabase.from('rooms').insert({
      matched_one: user.id,
      matched_two: uuid
    }).select()
    return redirect(`/chats/${data[0].id}`)
  }
  return redirect(`/auth?match=${uuid}`)
}