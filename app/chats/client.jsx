'use client';
import { useState } from 'react';
import Link from 'next/link';
import { matchRandom, createNewChat } from './actions';
import { Plus, Dices, User } from 'lucide-react';

export default function ChatsClient({ user, matchs }) {
  const [matches, setMatches] = useState(matchs);
  function getStranger(match, user) {
    if (match.user_one === user.id) {
      return match.user_two;
    }
    return match.user_one;
  }

  return (
    <>
      <div className="w-full sm:max-w-md">
        <div>
          <header className="w-full sticky top-0 mb-2 font-jbmono font-semibold">
            <div className="flex justify-between">
              <button
                className="p-2 bg-stone-900/30 backdrop-blur-lg border rounded-lg"
                onClick={() => createNewChat(user.id)}
              >
                <Plus />
              </button>
              <div className="flex gap-2">
                <Link
                  className="p-2 bg-white backdrop-blur-lg border rounded-lg text-black stroke-[1.5]"
                  href="/profile"
                >
                  <User />
                </Link>
                <button
                  className="p-2 bg-white backdrop-blur-lg border rounded-lg text-black stroke-[1.5]"
                  onClick={() => matchRandom(user.id)}
                >
                  <Dices />
                </button>
              </div>
            </div>
          </header>
        </div>
        <div className="space-y-2">
          {matches.map((match, index) => (
            <div key={index}>
              <Link href={`/chats/${match.id}`}>
                <div className="border flex align-middle items-center gap-2 p-2 rounded-lg">
                  <div
                    className={`rounded-full h-10 w-10 bg-stone-400 grid place-items-center font-bold text-xs font-jbmono`}
                  >
                    <div className="m-1 truncate max-w-4">
                      {getStranger(match, user)}
                    </div>
                  </div>
                  <div className="font-jbmono">
                    {getStranger(match, user)}
                    <div className="flex flex-row">
                      <div className="text-xs text-stone-500">
                        He said you are a bitch.
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
