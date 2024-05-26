import VerifyClient from "./client";

export const metadata = {
  title: "Verify OTP - Whisp",
};

export default function Verify({ searchParams }) {
  return <VerifyClient searchParams={searchParams} />;
}
