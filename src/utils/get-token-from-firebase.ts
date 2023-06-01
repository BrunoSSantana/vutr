import { env } from '@/env';
const { FIREBASE_API_KEY, FIREBASE_USER, FIREBASE_PASSWORD } = env;

// const FIREBASE_API_KEY = 'AIzaSyDK0fZqkRwJ9sRDTEKwG-OhVk9UmriibMg';
// const FIREBASE_USER = 'bruno@bruno.me';
// const FIREBASE_PASSWORD = 'Usuario123@';

export const getTokenFromFirebase = async () => {
  // const response: Response = await fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API_KEY}`, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     email: FIREBASE_USER,
  //     password: FIREBASE_PASSWORD,
  //     returnSecureToken: true,
  //   }),
  // });

  // const responseJson = await response.json() as { idToken: string };

  // console.log({ token: responseJson.idToken });


  return { token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkM2E0YTllYjY0OTk0YzUxM2YyYzhlMGMwMTY1MzEzN2U5NTg3Y2EiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGV0bWVhc2stMTZlODEiLCJhdWQiOiJsZXRtZWFzay0xNmU4MSIsImF1dGhfdGltZSI6MTY4NTU4MDEzOCwidXNlcl9pZCI6IlpQSk1NQXcwNVJSME4wdmx0VGZ4TG1CeFBobTEiLCJzdWIiOiJaUEpNTUF3MDVSUjBOMHZsdFRmeExtQnhQaG0xIiwiaWF0IjoxNjg1NTgwMTM4LCJleHAiOjE2ODU1ODM3MzgsImVtYWlsIjoiYnJ1bm9AYnJ1bm8ubWUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYnJ1bm9AYnJ1bm8ubWUiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.xMKyA5_jDdUgT5y4s0Tzzbi50OwR3M6ax_Gm42AFf9WPXorY7ikTvMOuaoLZncN5lgvKar_-aBWXxqw5MsjO0VS252f7016wE3VeEI5TcPk24TA5mBFKo6CcVnrCSqtHzxQUZsHV_fJAZp16tpje9zKso-AvDcDZ6SWfeNHhUYSN7kNvxQcl9IGvA40oYggL99OCwQtV-gavmpr7IPapzvKI-xegakxDnoO9LxyoPSJlxi8ZHG7em1VMRtTfGqBf7CsQ8ixoj1FRFYp0iFJ4dYktG7N_nqfWnpVB7RXjjOTj1mfzWvu64ZkIymZ1MuvFBVqFGRdq2QZuXadx088_tw' };
};
