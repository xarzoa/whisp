import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Client from './client';

export default async function PublicProfile({ params }) {
  const { id } = params;
  const supabase = createClient();
  const { data } = await supabase
    .from('profiles')
    .select('name, username, id, bio, interests, avatar, socials')
    .or(`username.eq.${id}, id.eq.${id}`);

  const {data: {user}} = await supabase.auth.getUser()

  if (!data) return <div>404 no user</div>;

  const profile = data[0];

  return (
    <main className="grid place-items-center h-screen w-full">
      <header className="w-full top-0 fixed">
        <div className="flex m-4 h-10 justify-between font-jbmono">
          <div className="flex gap-2 flex-wrap">
            <Link
              href="/"
              className="flex items-center p-4 h-full bg-stone-900/30 border backdrop-blur-md rounded-lg font-bold shadow-[0px_0px_20px_0px_rgb(245_245_244_/_0.1)] hover:bg-stone-800/50 duration-100"
            >
              HYD? LOL
            </Link>
          </div>
        </div>
      </header>
      <div className="w-full sm:w-[25rem] h-full sm:h-[35rem] sm:border duration-500 rounded-xl sm:shadow-[0px_0px_70px_0px_rgb(245_245_244_/_0.05)]">
        <div>
          <div className="w-full flex justify-center mt-20 sm:mt-10">
            <Avatar className="h-32 w-32 rounded-3xl">
              <AvatarImage src={''} className="rounded-3xl" />
              <AvatarFallback className="rounded-3xl text-6xl font-semibold text-stone-300">
                {profile.name.split('')[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex justify-center w-full my-2">
            <div className="text-lg font-semibold font-dmsans">
              {profile.name}
            </div>
          </div>
          
          <div className="text-center">
            <Client user={user} id={id} profile={profile}/>
          </div>
        </div>
      </div>
    </main>
  );
}
