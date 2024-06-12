import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header className="w-full sticky top-0 z-50">
      <div className="m-2 flex justify-center">
        <nav className="flex h-12 justify-between font-bold backdrop-blur-sm rounded-lg bg-black/15 md:w-[80%] w-full">
          <div className="flex gap-2 flex-wrap">
            <Link
              href="/"
              className="flex items-center p-4 h-full rounded-lg hover:bg-stone-950 duration-200"
            >
              Whisp
            </Link>
          </div>
          <div className="flex gap-2 flex-wrap justify-end md:justify-start">
            <Link
              href={user ? '/chats' : '/auth'}
              className="flex items-center p-4 h-full rounded-lg hover:bg-stone-950 duration-200"
            >
              {user ? 'Chats' : 'Sign Up'}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
