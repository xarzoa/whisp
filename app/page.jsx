import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Header from '@/components/app/header';

export const metadata = {
  title: 'HYD? - Connect with anyone! Anonymously.',
};

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <main className="h-full">
      <Header />
      <div>
        <div className="w-full">
          <div className="text-center my-32 font-jbmono mx-4">
            <div className='text-base md:text-xl duration-500 text-stone-400 font-semibold mx-16'>Wanna meet new people? Afraid talk to them?</div>
            <div className="text-3xl md:text-5xl duration-500 grid place-items-center font-extrabold mx-5 text-center">
              Text anyone, Anonymously.
            </div>
          </div>
        </div>
        <div className='space-y-4 text-center'>
        <div>
          Random
        </div>
        <div>
          Talk to your friends with link in their bio
        </div>
        <div>
          Send gifts
        </div>
        <div>
          Send gifts
        </div>
        <div>
          Send gifts
        </div>
        <div>
          Send gifts
        </div>
        <div>
          Send gifts
        </div>
        <div>
          Send gifts
        </div>
        <div>
          Send gifts
        </div>
        <div>
          Send gifts
        </div>
        <div>
          Send gifts
        </div>
        <div>
          Send gifts
        </div>
        <div>
          Send gifts
        </div>
        <div>
          Send gifts
        </div>
        <div>
          Send gifts
        </div>
        <div>
          Send gifts
        </div>
        <div>
          Send gifts
        </div>
        </div>
      </div>
    </main>
  );
}
