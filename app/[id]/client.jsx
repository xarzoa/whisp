'use client'
import { createRoom } from "./actions";

export default function Client({ id, user, profile }) {
  return (
    <button
      className="p-2 px-3 rounded-lg bg-stone-100 border focus:bg-stone-200/90 hover:bg-stone-200/90 duration-200 text-stone-900 font-semibold font-jbmono"
      onClick={() => createRoom(id, profile, user )}
    >
      Talk
    </button>
  );
}
