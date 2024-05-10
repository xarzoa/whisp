'use client'
import Button from "@/components/app/submit-button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn, signInAnon } from "@/app/auth/actions";
import { toast } from "sonner";

export default function Login() {
  async function formAction(formData) {
    const id = toast.loading("Requesting...");
    await signIn(formData);
    toast.success("We sent you the OTP.", { id });
  }
  return (
    <div className="grid place-items-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Authenticate</CardTitle>
          <CardDescription>Sign In or Sign Up.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            action={formAction}
          >
            <Input
              name="email"
              placeholder="you@example.com"
              type="email"
              required
            />
            <Button className="p-0" type="submit" childern="Send my OTP" />
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
          <p className="text-sm text-stone-400">
            By signing up you accept your privacy and terms.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
