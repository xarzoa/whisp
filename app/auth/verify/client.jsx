"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyToken } from "./actions";

export default function VerifyClient({ searchParams }) {
  const verifyOtp = async (e) => {
    const email = searchParams.email;
    if (e.length === 6) {
      await verifyToken(e, email);
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">OTP</CardTitle>
          <CardDescription>
            Enter the otp you recived via a email to {searchParams.email}.
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
      </Card>
    </div>
  );
}
