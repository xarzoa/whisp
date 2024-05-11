'use client';
import SubmitButton from '@/components/app/submit-button';
import { Input } from '@/components/ui/input';
import { Send as SendIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function Send({ id }) {
  const supabase = createClient();

  async function sendMessage(formData) {
    const message = formData.get('message')
    console.log(message)
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from('messages').insert({
      message,
      sent_by: user.id,
      received_by: id,
      created_at: new Date(),
      flagged: false,
    });
    if (error) {
      console.log(error);
    }
  }

  return (
    <form action={sendMessage} className="w-full">
      <div className="flex w-full">
        <Input name="message" />
        <div>
          <SubmitButton size="icon" type="submit" childern="Send" />
        </div>
      </div>
    </form>
  );
}
