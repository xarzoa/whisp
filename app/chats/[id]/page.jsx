import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Send from './send';
import Messages from './messages';

export default function ChatPortal({ params }) {
  const { id } = params;
  console.log(id)

  return (
    <div className="grid place-items-center h-screen">
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <Messages />
        </CardContent>
        <CardFooter>
          <Send id={id}/>
        </CardFooter>
      </Card>
    </div>
  );
}
