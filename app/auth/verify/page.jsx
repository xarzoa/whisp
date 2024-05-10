import VerifyToken from './client';

export const metadata = {
  title: 'Verify OTP - HYD',
};

export default function Verify({ searchParams }) {
  return <VerifyToken searchParams={searchParams}/>;
}
