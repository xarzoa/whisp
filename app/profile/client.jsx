'use client';
import {
  ArrowLeft,
  MessagesSquare,
  Camera,
  Copy,
  CopyCheck,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { useRef } from 'react';

export default function Client({ user }) {
  const profile = user.user_metadata;
  const avatarInput = useRef(null);
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  return (
    <>
      <div className="w-full sm:max-w-md">
        <div>
          <header className="w-full sticky top-0 mb-2 font-jbmono font-semibold">
            <div className="flex justify-between">
              <button className="p-2 bg-stone-900/30 backdrop-blur-lg border rounded-lg">
                <ArrowLeft />
              </button>
              <button className="p-2 bg-stone-100 text-stone-900 backdrop-blur-lg border rounded-lg">
                <MessagesSquare className="stroke-[1.5]" />
              </button>
            </div>
          </header>
        </div>
        <div>
          <div>
            <label htmlFor="avatar" className="text-sm font-bold">
              Avatar
            </label>
            <Avatar
              className="h-32 w-32 relative grid place-items-center group duration-500 rounded-lg"
              id="avatar"
            >
              <AvatarImage
                src={``}
                alt={profile.name}
                className="group-hover:blur-lg duration-500 rounded-lg"
              />
              <AvatarFallback className="group-hover:blur-lg duration-500 rounded-lg text-5xl font-semibold ">
                {profile.name.split('')[0].toUpperCase()}
              </AvatarFallback>
              <div className="absolute">
                <input
                  onProgress={console.log}
                  placeholder="Change avatar"
                  type="file"
                  ref={avatarInput}
                  className="hidden"
                  accept="image/png, image/webp, image/jpeg, image/gif"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-32 w-32 group bg-transparent focus:bg-transparent hover:bg-transparent"
                  onClick={() => avatarInput.current.click()}
                >
                  <Camera className="size-10 invisible group-hover:visible duration-200 strole-1" />
                </Button>
              </div>
            </Avatar>
          </div>
          <div>
            <label htmlFor="id" className="text-sm font-bold">
              ID
            </label>
            <div className="w-full flex">
              <Input defaultValue={user.id} id="id" readOnly />
              <Button size="icon" className="w-11 ml-2" onClick={() => copyToClipboard(user.id)}>{copiedText ? <CopyCheck className='stroke-[1.5]'/> : <Copy className='stroke-[1.5]'/>}</Button>
            </div>
          </div>
          <form className="text-lg font-dmsans mt-2">
            <div>
              <label htmlFor="name" className="text-sm font-bold">
                Name
              </label>
              <Input defaultValue={profile.name} id="name" />
            </div>
            <div>
              <label htmlFor="bio" className="text-sm font-bold">
                Bio
              </label>
              <Textarea defaultValue={profile.bio} id="bio" />
            </div>
            <div className="flex justify-end mt-2">
              <Button>Save</Button>
            </div>
          </form>
          <div className="text-center"></div>
        </div>
      </div>
    </>
  );
}
