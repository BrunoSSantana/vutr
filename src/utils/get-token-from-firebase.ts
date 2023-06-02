import { env } from '@/env';

const { FIREBASE_API_KEY, FIREBASE_USER, FIREBASE_PASSWORD } = env;

export const getTokenFromFirebase = async () => {
  const response: Response = await fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API_KEY}`, {
    method: 'POST',
    body: JSON.stringify({
      email: FIREBASE_USER,
      password: FIREBASE_PASSWORD,
      returnSecureToken: true,
    }),
  });

  const responseJson = await response.json() as { idToken: string };

  return { token: responseJson.idToken };
};
