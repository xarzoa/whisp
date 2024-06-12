'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createNewChat, createRandomMatch } from './actions';
import { Plus, User, DicesIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/app/submit-button';
import { socket } from '@/lib/ws';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from '../auth/actions';
import { useRouter } from 'next/navigation';

export default function ChatsClient({ user, matchs, messages: msgs }) {
  const [matches, setMatches] = useState(matchs);
  const [messages, setMessages] = useState(msgs);
  const [creating, setCreating] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  socket.emit('join', user.id);

  useEffect(() => {
    socket.on('match', (id) => {
      setMatches([...matches, id]);
    });
    socket.on('message', (msg) => {
      setMessages([...messages, msg]);
    });
    socket.on('randomMatch', (id) => {
      return router.push('/chats/' + id);
    });
  });

  async function createChat(formData) {
    setCreating(true);
    const res = await createNewChat(formData);
    if (res) {
      if (res.data) {
        setMatches([...matches, res.data]);
      }
      toast[res.type](res.message);
    }
    setCreating(false);
    doOpen();
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
      <div className="w-full h-full duration-500">
        <div>
          <header className="w-full sticky top-0 mb-2 font-jbmono font-semibold">
            <div className="flex justify-between">
              <div className='flex gap-2'>
                <Button variant="outline" size="icon" onClick={doOpen}>
                  <Plus />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => createRandomMatch()}
                >
                  <DicesIcon />
                </Button>
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <User className="stroke-[1.5]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-2">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <div className="m-2 w-48">
                      <div className="text-sm text-stone-400 truncate font-semibold">
                        {user.user_metadata.name}
                      </div>
                      <div className="text-xs text-stone-400 truncate">
                        {user.user_metadata.email}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Button
                        href="/profile"
                        variant="ghost"
                        className="w-full justify-start text-stone-200"
                        size="sm"
                        onClick={() => signOut()}
                      >
                        Logout
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
        </div>
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a chat</DialogTitle>
              <DialogDescription>Create a new chat with ID.</DialogDescription>
            </DialogHeader>
            <div>
              <form action={createChat} className="mt-2 space-y-2">
                <Input
                  name="id"
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                />
                <div className="flex justify-end">
                  <SubmitButton childern={'Create'} />
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
        <div>
          {matches?.[0] ? (
            <Matches matches={matches} user={user} messages={messages} />
          ) : (
            <div className="m-4 font-semibold font-jbmono text-center">
              No chats yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Matches({ matches, user, messages }) {
  function getStranger(match, user) {
    if (match.user_one.id === user.id) {
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
              <Avatar>
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/optimize/supabase/avatars/${getStranger(match, user).avatar}?bucket=whisp&width=128&height=128`}
                  alt={getStranger(match, user).name}
                  className="rounded-none"
                />
                <AvatarFallback className="rounded-none">
                  {getStranger(match, user).name.split('')[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="font-jbmono">
                <div className="text-sm max-w-32 truncate">
                  {getStranger(match, user).name}
                </div>
                <div className="flex flex-row">
                  <div className="text-xs text-stone-500">
                    {messages?.findLast(({ room }) => room === match.id)?.text}
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
