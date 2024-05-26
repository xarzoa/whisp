'use client';
import Button from '@/components/app/submit-button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signIn, signInAnon } from '@/app/(app)/auth/actions';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRef } from 'react';

export default function Login() {
  const form = useRef(null)
  async function formAction(formData) {
    const id = toast.loading('Requesting...');
    await signIn(formData);
    form.current.reset()
    toast.success('We sent you the OTP.', { id });
  }
  return (
    <div className="grid place-items-center h-screen">
      <div className="relative font-jbmono">
        <div className="absolute h-32 w-32 bg-white/50 -z-10 blur-3xl"></div>
        <Card>
          <CardHeader>
            <CardTitle>Authenticate</CardTitle>
            <CardDescription>Sign In or Sign Up.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
              action={formAction}
              ref={form}
            >
              <Input
                name="email"
                placeholder="me@whisp.lol"
                type="email"
                required
              />
              <Button className="p-0" type="submit" childern="Sign In" />
            </form>
            <form
              action={signInAnon}
              className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mt-2"
            >
              <Button
                className="p-0"
                type="submit"
                variant="outline"
                childern="Anonymous"
                tw="bg-white"
              />
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-stone-400">
              By signing up you accept your{' '}
              <Link href="/legal/privacy" className="underline">
                privacy
              </Link>{' '}
              and{' '}
              <Link href="/legal/terms" className="underline">
                terms
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
        <div className="absolute h-32 w-32 bg-white/50 -z-10 blur-3xl -right-0 -bottom-0"></div>
      </div>
    </div>
  );
}
