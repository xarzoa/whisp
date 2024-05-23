import { createClient } from '@/lib/supabase/server';
import Client from './client';

export const metadata = {
  title: 'Profile - Whisp',
};

export default async function ProtectedPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="grid w-full p-2 place-items-center h-full">
      <Client user={user} />
    </div>
  );
}
