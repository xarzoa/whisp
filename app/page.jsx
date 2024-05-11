import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const metadata = {
  title: 'HYD? - Connect with anyone! Anonymously.',
};

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <main>
      <div className="h-screen grid place-items-center">
        <div>
          {user ? (
            <Button asChild>
              <Link href="/profile">Profile</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/auth">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
