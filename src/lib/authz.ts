// Temporarily disabled - add Clerk keys to .env.local to enable
// import { auth, clerkClient } from '@clerk/nextjs/server';

export async function assertAdmin() {
  // Temporarily allow all access - add Clerk keys to enable proper auth
  console.warn('Auth temporarily disabled - add Clerk keys to .env.local');
  return { id: 'temp-admin', emailAddresses: [{ emailAddress: 'baobabstack@gmail.com' }] };
  
  // Uncomment when Clerk keys are added:
  // const { userId } = auth();
  // if (!userId) {
  //   const error = new Error('unauthorized');
  //   (error as any).status = 401;
  //   throw error;
  // }

  // const user = await clerkClient.users.getUser(userId);
  // const emails = (process.env.ADMIN_EMAILS || '')
  //   .split(',')
  //   .map(e => e.trim().toLowerCase())
  //   .filter(Boolean);

  // const hasEmail = user.emailAddresses?.some(e => emails.includes(e.emailAddress.toLowerCase()));
  // const role = (user.publicMetadata as any)?.role;

  // if (!(hasEmail || role === 'admin')) {
  //   const error = new Error('forbidden');
  //   (error as any).status = 403;
  //   throw error;
  // }

  // return user;
}


