/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
export const contentType = 'image/favicon';

export default function Icon() {
  return new ImageResponse(
    (
      <div tw="h-full w-full flex items-center justify-center bg-white rounded-xl">
        <div tw="p-2 font-bold">W</div>
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  );
}
