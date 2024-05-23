'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { matchRandom, createNewChat } from './actions';
import { Plus, Dices, User } from 'lucide-react';
import Dots from '@/components/app/loader/dots';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/app/submit-button';
import { joinRoom, socket } from '@/lib/ws';

export default function ChatsClient({ user, matchs }) {
  const [matches, setMatches] = useState(matchs);
  const [matching, setMatching] = useState(false);
  const [creating, setCreating] = useState(false);
  const [open, setOpen] = useState(false);

  joinRoom(user.id)

  useEffect(() => {
    socket.on('match', id => {
      console.log(id)
    })
  })

  async function createMatch() {
    setMatching(true);
    const res = await matchRandom(user);
    if (res) {
      toast[res.type](res.message);
    }
    setMatching(false);
  }

  async function createChat(formData) {
    setCreating(true);
    const res = await createNewChat(formData);
    if (res) {
      toast[res.type](res.message);
    }
    setCreating(false);
  }

  const doOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <div className="w-full sm:max-w-md duration-500">
        <div>
          <header className="w-full sticky top-0 mb-2 font-jbmono font-semibold">
            <div className="flex justify-between">
              <Button variant="outline" size="icon" onClick={doOpen}>
                <Plus />
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" asChild>
                  <Link href="/profile">
                    <User className="stroke-[1.5]" />
                  </Link>
                </Button>
                <Button onClick={createMatch} variant="outline" size="icon">
                  {matching ? <Dots /> : <Dices className="stok-[1.5]" />}
                </Button>
              </div>
            </div>
          </header>
        </div>
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a chat</DialogTitle>
              <DialogDescription>
                Create a new chat with ID.
              </DialogDescription>
            </DialogHeader>
            <div>
              <form action={createChat} className="mt-2 space-y-2">
                <Input name="id" placeholder="whi5p-84is-p4er-9his-pwhisper0" />
                <div className="flex justify-end">
                  <SubmitButton childern={'Create'} />
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
        <div>
          { (matches?.[0])? 
          <Matches matches={matches} user={user}/>: (
            <div className='m-4 font-semibold font-jbmono text-center'>No chats yet.</div>
          )}
        </div>
      </div>
    </>
  );
}

function Matches({ matches, user }) {
  function getStranger(match, user) {
    if (match.user_one === user.id) {
      return match.user_two;
    }
    return match.user_one;
  }

  return (
    <div className="space-y-2">
      {matches.map((match, index) => (
        <div key={index}>
          <Link href={`/chats/${match.id}`}>
            <div className="border flex align-middle items-center gap-2 p-2 rounded-lg hover:bg-stone-900 duration-300 focus:bg-stone-900">
              <div
                className={`rounded-full h-10 w-10 bg-stone-400 grid place-items-center font-bold text-xs font-jbmono`}
              >
                <div className="m-1 truncate max-w-4">
                  {getStranger(match, user)}
                </div>
              </div>
              <div className="font-jbmono">
                <div className="text-sm max-w-32 truncate">
                  {getStranger(match, user)}
                </div>
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
  );
}
