'use server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { generate } from 'random-words';

export const signIn = async (formData) => {
  const email = formData.get('email');
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      data: {
        name: generate({ exactly: 2, join: ' ', minLength: 4 })
      },
    }
  });
  if (error) {
    console.log(error);
    return redirect('/auth');
  }
  return redirect(`/auth/verify?email=${email}`);
};

export const signInAnon = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signInAnonymously({
    options: {
      data: {
        name: generate({ exactly: 2, join: ' ', minLength: 4 })
      },
    }
  });
  if (error) {
    console.log(error);
    return redirect('/auth');
  }
  return redirect(`/chats`);
};
