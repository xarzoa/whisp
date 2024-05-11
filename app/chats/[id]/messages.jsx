'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState, useCallback } from 'react';

export default function Messages() {
  const supabase = createClient();
  const [messages, setMessages] = useState([]);

  const changes = supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'messages',
      },
      (payload) => setMessages([...messages, payload.new])
    )
    .subscribe();

  console.log(messages);

  return (
    <div>
      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        {messages.map((message, index) => (
          <div key={index}>
            <div className='text-xs'>{message.sent_by}</div>
            <div>{message.message}</div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
