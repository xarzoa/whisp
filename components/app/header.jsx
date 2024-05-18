import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header className="w-full top-0 fixed">
      <div className="flex m-4 h-10 justify-between font-jbmono">
        <div className="flex gap-2 flex-wrap">
          <Link
            href="/"
            className="flex items-center p-4 h-full bg-stone-900/30 border backdrop-blur-md rounded-lg font-bold shadow-[0px_0px_20px_0px_rgb(245_245_244_/_0.1)] hover:bg-stone-800/50 duration-200"
          >
            HYD? LOL
          </Link>
          <Link
            href="/about"
            className="flex items-center p-4 h-full bg-stone-900/30 border backdrop-blur-md rounded-lg font-bold hover:bg-stone-800/50 duration-200"
          >
            WHAT IS THIS?
          </Link>
        </div>
        <div className="flex gap-2 flex-wrap justify-end md:justify-start">
          <Link
            href={user ? '/chats' : '/auth'}
            className="flex items-center p-4 h-full bg-stone-900/30 border backdrop-blur-md rounded-lg font-bold hover:bg-stone-800/50 duration-200"
          >
            {user ? 'Chat' : 'Login'}
          </Link>
        </div>
      </div>
    </header>
  );
}
