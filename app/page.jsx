import Link from 'next/link';
import Header from '@/components/app/header';

export const metadata = {
  title: 'Whisp - Text to people. Anonymously.',
};

export default async function Home() {
  const company = [
    { name: 'About', link: '/about' },
    { name: 'Jobs', link: '/jobs' },
  ];

  const resources = [
    { name: 'Support', link: '/supprot' },
    { name: 'Safty', link: '/safty' },
    { name: 'Feedback', link: '/feedback' },
    { name: 'Bug Bounty', link: '/developers' },
  ];

  const legal = [
    { name: 'Privacy', link: '/legal/privacy' },
    { name: 'Terms', link: '/legal/terms' },
    { name: 'DMCA', link: '/legal/feedback' },
    { name: 'Rules', link: '/legal/rules' },
  ];

  return (
    <main className="h-full w-full flex justify-center">
      <Header />
      <div className="px-4 pt-4 md:max-w-3xl mt-10">
        <div className="w-full bg-stone-900 py-32 rounded-lg">
          <div className="text-center font-jbmono">
            <div className="text-base md:text-xl duration-500 text-stone-400 font-semibold mx-16">
              Meet new people all over the world.
            </div>
            <div className="text-3xl md:text-5xl duration-500 grid place-items-center font-extrabold mx-5 text-center">
              Text to anyone, Anonymously.
            </div>
            <div className='mt-8'>
              <Link className='p-3 px-4 border bg-black/50 rounded-lg hover:bg-black/10 focus:bg-black/10 md:text-xl font-semibold duration-300' href="/auth">
                Start chatting
              </Link>
            </div>
          </div>
        </div>
        <ul className="grid gap-6 md:gap-2 md:grid-cols-8 mt-6 md:mt-4 font-jbmono font-semibold md:grid-rows-2 text-center md:text-start duration-500">
          <li className="md:col-span-4">
            <h3 className="font-bold text-xl">Simple</h3>
            <p className="text-stone-400">
              Create an account, Start texting. It is that simple. Still
              confused? Let us know.
            </p>
          </li>
          <li className="md:col-span-3 md:col-start-6">
            <h3 className="font-bold text-xl">Anonymous</h3>
            <p className="text-stone-400">
              Don&#39;t wanna share your email? Create an anon account. Stay
              anon unless you wanna use our cool features.
            </p>
          </li>
          <li className="md:col-start-1 md:col-span-3">
            <h3 className="font-bold text-xl">Secure</h3>
            <p className="text-stone-400">
              We use managed backend until we build more secure one, name starts
              with &#34;S&#34;. We promise no one can read your messages but us.
              (I don&#39;t think we can read millions of messages unless someone
              report them.
            </p>
          </li>
          <li className="md:col-span-4 md:col-start-5">
            <h3 className="font-bold text-xl">Fast</h3>
            <p className="text-stone-400">
              We use old and new tech together to make slightly fast experiance.
              I don&#39;t think this&#39;s faster than our competitors. But we
              are working on it 24/7.
            </p>
          </li>
        </ul>
        <footer className="grid md:grid-cols-2 mt-8 p-4 pb-8 bg-stone-900 rounded-t-lg">
          <div></div>
          <div className='grid grid-cols-3 text-center text-sm md:text-base md:text-end font-jbmono text-stone-200 underline gap-4'>
            <ul>
              {company.map((item, index) => (
                <li key={index}>
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
            <ul>
              {resources.map((item, index) => (
                <li key={index}>
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
            <ul>
              {legal.map((item, index) => (
                <li key={index}>
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </main>
  );
}
