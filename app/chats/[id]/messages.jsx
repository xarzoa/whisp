'use client';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState, useRef } from 'react';
import { useDocumentTitle } from '@uidotdev/usehooks';
import { socket, joinRoom, sendMessage as sendMsg } from '@/lib/ws';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import Dots from '@/components/app/loader/dots';
import { SendHorizonal, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Messages({ msgs, user, id }) {
  const supabase = createClient();
  const scroll = useRef(null);
  const form = useRef(null);
  const router = useRouter();
  useDocumentTitle(`Chat - ${msgs[0]?.sender_info.id}`);
  const [nav, setNav] = useState('en-GB');
  const scrollToBottom = () => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const [messages, setMessages] = useState(msgs);

  if (id) joinRoom(id);

  async function sendMessage(formData) {
    const message = formData.get('message');
    if (message.length < 1) return toast.error('Empty message.');
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const msg = {
      text: message,
      room: id,
      attachments: null,
      created_at: new Date(),
      flagged: false,
      sender_info: {
        id: user.id,
        name: 'your mom',
      },
    };
    const { error } = await supabase.from('messages').insert(msg);
    sendMsg(msg, id);
    setMessages([...messages, msg]);
    form.current.reset();
    if (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    socket.emit('join', id);
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setNav(navigator.language);
  }, [setNav]);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full sm:max-w-md">
        <div className="mb-2 sticky z-50 flex justify-between items-center">
          <button
            className="p-2 bg-stone-900/30 backdrop-blur-lg border rounded-lg hover:bg-stone-500/30 focus:bg-stone-500/30 duration-200"
            onClick={router.back}
          >
            <ArrowLeft />
          </button>
          <div className="flex gap-2 items-center">
            <div className="h-9 w-24 bg-stone-400 grid place-items-center font-bold text-xs font-jbmono rounded-lg relative">
              <div className="m-1 truncate max-w-20">
                {messages[0]?.sender_info.id}
              </div>
              <div className="absolute -top-2 -left-2 px-1 rounded-md backdrop-blur-lg">
                stranger
              </div>
            </div>
            <div className="h-9 w-24 bg-stone-500 grid place-items-center font-bold text-xs font-jbmono rounded-lg relative">
              <div className="m-1 truncate max-w-20">{user.id}</div>
              <div className="absolute -top-2 -left-2 px-1 rounded-md backdrop-blur-lg">
                you
              </div>
            </div>
          </div>
        </div>
        <div className="w-full rounded-md border p-2 h-[calc(100vh-7rem)] overflow-y-scroll chat-bg hide-scroll">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`w-full flex ${message.sender_info.id === user.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`gap-2 flex w-full ${message.sender_info.id === user.id ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`rounded-full h-10 w-10 bg-stone-400 grid place-items-center font-bold text-xs font-jbmono`}
                >
                  <div className="m-1 truncate max-w-4">
                    {message.sender_info.id}
                  </div>
                </div>
                <div
                  className={`bg-stone-800/60 px-3 py-1 mb-2 max-w-[60%] sm:min-w-[40%] min-w-[30%] duration-500 rounded-b-xl backdrop-blur-md ${message.sender_info.id === user.id ? 'rounded-l-xl' : 'rounded-r-xl'}`}
                >
                  <div className="mb-2 text-balance max-w-full">
                    <div className="text-balance break-words sm:max-w-full max-w-[calc(100vw-7rem)] duration-500">
                      {message.text}
                    </div>
                  </div>
                  <div className="text-[10px] font-dmsans w-full flex justify-end font-bold text-stone-400">
                    {new Date(message.created_at).toLocaleTimeString(nav, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={scroll}></div>
        </div>
        <div className="w-full mt-2">
          <div className="w-full flex">
            <form action={sendMessage} ref={form} className="w-full">
              <div className="flex w-full">
                <Input name="message" />
                <div className="ml-2">
                  <SubmitButton size="icon" type="submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubmitButton({ className, disabled, tw, ...props }) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={disabled || pending}
      className={`font-jbmono ${className}`}
      {...props}
    >
      {pending ? (
        <Dots tw={tw} />
      ) : (
        <SendHorizonal className="h-6 w-6 text-black stroke-1" />
      )}
    </Button>
  );
}
