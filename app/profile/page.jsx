import { createClient } from "@/lib/supabase/server";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export const metadata = {
  title: 'Profile - HYD'
}

export default async function ProtectedPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="grid min-h-screen place-items-center w-screen">
      <Input></Input>
      <Button></Button>
      { JSON.stringify(user)}
    </div>
  );
}
