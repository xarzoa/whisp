import VerifyClient from "./client";

export const metadata = {
  title: "Verify OTP - HYD",
};

export default function Verify({ searchParams }) {
  return <VerifyClient searchParams={searchParams} />;
}
