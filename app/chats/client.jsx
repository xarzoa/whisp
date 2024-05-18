'use client';
import { useState } from 'react';
import Link from 'next/link';
import { matchRandom, createNewChat } from './actions';
import { Plus, Dices } from 'lucide-react';

export default function ChatsClient({ user, matchs }) {
  const [matches, setMatches] = useState(matchs);
  function getStranger(match, user) {
    if (match.matched_one === user.id) {
      return match.matched_two;
    }
    return match.matched_one;
  }
  
  return (
    <>
      <div className="w-full sm:max-w-md">
        <div>
          <header className="w-full sticky top-0 mb-2 font-jbmono font-semibold">
            <div className="flex justify-between">
                <button className="p-2 bg-stone-900/30 backdrop-blur-lg border rounded-lg" onClick={() => createNewChat(user.id)}>
                  <Plus/>
                </button>
                <button className="p-2 bg-white backdrop-blur-lg border rounded-lg text-black" onClick={() => matchRandom(user.id)}>
                  <Dices/>
                </button>
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
