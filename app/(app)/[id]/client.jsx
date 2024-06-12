'use client';
import { createRoom } from './actions';
import { useState } from 'react';
import Dots from '@/components/app/loader';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function Client({ id, user, profile }) {
  const [loading, setLoading] = useState(false);
  async function buttonClick() {
    setLoading(true);
    const res = await createRoom(id, profile, user);
    if (res) {
      toast[res.type](res.message);
    }
    setLoading(false);
  }
  return (
    <Button
      className="font-bold font-jbmono rounded-2xl"
      variant="outline"
      onClick={buttonClick}
      disabled={loading}
    >
      {loading ? <Dots /> : 'Talk'}
    </Button>
  );
}
