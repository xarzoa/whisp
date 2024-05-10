import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PublicProfile({ params }){
  const { id } = params
  return(
    <div className="grid place-items-center">
      <div>
        { id }
        <Button asChild>
          <Link href={`/chat/${id}/new`}>Text</Link>
        </Button>
      </div>
    </div>
  )
}