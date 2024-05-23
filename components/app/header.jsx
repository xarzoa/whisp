import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header className="w-full top-0 fixed">
      <div className="flex m-4 h-10 justify-between font-jbmono backdrop-blur-sm rounded-lg">
        <div className="flex gap-2 flex-wrap">
          <Link
            href="/"
            className="flex items-center p-4 h-full rounded-lg font-bold hover:bg-stone-950 duration-200"
          >
            Whisp
          </Link>
        </div>
        <div className="flex gap-2 flex-wrap justify-end md:justify-start">
          <Link
            href={user ? '/chats' : '/auth'}
            className="flex items-center p-4 h-full rounded-lg font-bold hover:bg-stone-950 duration-200"
          >
            {user ? 'Chat' : 'Login'}
          </Link>
        </div>
      </div>
    </header>
  );
}
