// lib/auth/getServerSideToken.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function getServerSideToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    // Redirect to logout handler
    // redirect("/api/auth/logout");
  }

  return {
    Authorization: token,
  };
}
