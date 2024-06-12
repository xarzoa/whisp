'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { verifyToken } from './actions';
import Link from 'next/link';
import { toast } from 'sonner';

export default function VerifyClient({ searchParams }) {
  const email = searchParams.email;
  const verifyOtp = async (e) => {
    if (e.length === 6) {
      const id = toast.loading('Verifying...');
      const res = await verifyToken(e, email);
      if (res) {
        toast[res.type](res.message, { id });
      } else {
        toast.success('Verified.', { id });
      }
    }
  };
  return (
    <div className="grid place-items-center h-screen relative">
      <div className="relative">
        <div className="absolute h-32 w-32 bg-white/50 -z-10 blur-3xl -right-0"></div>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Verify OTP</CardTitle>
            <CardDescription className="md:max-w-64 text-center">
              A verification code has been sent to <b>{email}</b>. Enter the
              code to continue and be redirected.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid place-items-center gap-4 grid-cols-1">
              <InputOTP maxLength={6} name="token" onChange={verifyOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </form>
          </CardContent>
          <CardFooter className="font-jbmono text-xs flex justify-center gap-1 text-stone-400">
            Didn&#39;t recieved the code?{' '}
            <Link href="/auth" className="text-stone-500 underline ml-1">
              Resend it
            </Link>
            .
          </CardFooter>
        </Card>
        <div className="absolute h-32 w-32 bg-white/50 -z-10 blur-3xl -bottom-0"></div>
      </div>
    </div>
  );
}
