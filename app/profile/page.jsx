import { createClient } from "@/lib/supabase/server";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageSquareWarning } from "lucide-react";

export const metadata = {
  title: "Profile - HYD",
};

export default async function ProtectedPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="space-y-2">
        <div className="flex">
          <Input readOnly defaultValue={user.id} />
          <Button>Copy</Button>
        </div>
        <Button className="w-full">match</Button>
        {user.is_anonymous ? (
          <Alert>
            <MessageSquareWarning className="h-4 w-4" />
            <AlertTitle>Tempory!</AlertTitle>
            <AlertDescription>
              Anon accs will get deleted after 24 hrs
            </AlertDescription>
          </Alert>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
