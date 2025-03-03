// src/app/signin/page.tsx
"use client"
import { getProviders, signIn ,useSession} from 'next-auth/react';
import { useEffect, useState ,useLayoutEffect} from 'react';
import { useRouter } from 'next/navigation';

type Provider = {
  id: string;
  name: string;
};

export default function SignInPage() {
  const router = useRouter();
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);
  useEffect(() => {
    console.log(session);
    if (session) {
      router.push('/dashboard'); // Change '/desired-page' to the page you want to redirect to
    }
  }, [session, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h1>

      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.id} className="mb-4">
            {provider.name === 'Google' && (
              <button
                onClick={() => signIn(provider.id)}
                className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
              >
                Sign in with {provider.name}
              </button>
            )}
          </div>
        ))}

      <p className="mt-4 text-sm text-gray-600">
        Don’t have an account? Just sign in, and we’ll create one for you!
      </p>
    </div>
  );
}
