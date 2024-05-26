'use client';
import { ArrowLeft, Settings2, Camera, Copy, CopyCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { useEffect, useRef, useState } from 'react';
import { updateInfo, updateAvatar } from './actions';
import { toast } from 'sonner';
import SubmitButton from '@/components/app/submit-button';
import Link from 'next/link';

export default function Client({ user }) {
  const profile = user.user_metadata;
  const avatarInput = useRef(null);
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  async function updateProfile(formData) {
    const id = toast.loading('Saving...');
    const res = await updateInfo(formData);
    if (res) {
      toast[res.type](res.message, { id });
    } else {
      toast.success('Profile updated successfully.', { id });
    }
  }

  async function handleAvatar(data) {
    const toastId = toast.loading('Uploading...');
    if (data.target.files.length === 1) {
      try {
        const file = new FormData();
        file.append('file', data.target.files[0]);
        let responce = await fetch(
          process.env.NEXT_PUBLIC_IMAGE_SERVER +
            '/upload?id=supabase&path=avatars&bucket=whisp',
          {
            method: 'POST',
            body: file,
          }
        );
        responce = await responce.json();
        const res = await updateAvatar(responce);
        if (res) {
          toast[res.type](res.message, { id: toastId });
        } else {
          toast.success('Avatar updated.', { id: toastId });
        }
      } catch (e) {
        console.log(e);
        toast.error(e.message, { id: toastId });
      }
    } else {
      toast.error('Select 1 file.', { id: toastId });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setCopied(null);
    }, 10000);
  });
  return (
    <>
      <div className="w-full sm:max-w-md">
        <div>
          <header className="w-full sticky top-0 mb-2 font-jbmono font-semibold">
            <div className="flex justify-between">
              <Button variant="outline" size="icon" asChild>
                <Link href="/chats">
                  <ArrowLeft />
                </Link>
              </Button>
              <Button variant="outline" size="icon">
                <Settings2 className="stroke-[1.5]" />
              </Button>
            </div>
          </header>
        </div>
        <div className="p-2">
          <div>
            <label htmlFor="avatar" className="text-sm font-bold">
              Avatar
            </label>
            <Avatar
              className="h-32 w-32 relative grid place-items-center group duration-500 rounded-lg"
              id="avatar"
            >
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/optimize/supabase/avatars/${profile.avatar}?bucket=whisp&width=128&height=128`}
                alt={profile.name}
                className="group-hover:blur-lg duration-500 rounded-lg"
              />
              <AvatarFallback className="group-hover:blur-lg duration-500 rounded-lg text-5xl font-semibold ">
                {profile.name.split('')[0].toUpperCase()}
              </AvatarFallback>
              <div className="absolute">
                <input
                  onProgress={console.log}
                  onChange={handleAvatar}
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
              <Button
                size="icon"
                className="w-11 ml-2"
                variant="outline"
                onClick={() => {
                  copyToClipboard(profile.id);
                  setCopied(true);
                }}
              >
                {copied ? (
                  <CopyCheck className="stroke-[1.5]" />
                ) : (
                  <Copy className="stroke-[1.5]" />
                )}
              </Button>
            </div>
          </div>
          <form className="text-lg font-dmsans mt-2" action={updateProfile}>
            <div>
              <label htmlFor="name" className="text-sm font-bold">
                Name
              </label>
              <Input defaultValue={profile.name} id="name" name="name" />
            </div>
            <div>
              <label htmlFor="bio" className="text-sm font-bold">
                Bio
              </label>
              <Textarea defaultValue={profile.bio} id="bio" name="bio" />
            </div>
            <div className="flex justify-end mt-2">
              <SubmitButton variant="outline" type="submit" childern={'Save'} />
            </div>
          </form>
          <div className="text-center"></div>
        </div>
      </div>
    </>
  );
}
