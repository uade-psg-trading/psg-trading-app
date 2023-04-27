import { GOOGLE_CLIENT_ID, GOOGLE_SECRET } from '$env/static/private';
import { google } from 'googleapis';

export const oauth2client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET,
  // import.meta.env.VITE_HOST_URL + "/callback/google"
  'localhost:8080/api/callback/google'
);

export const authUrl = oauth2client.generateAuthUrl({
  scope: ['openid', 'https://www.googleapis.com/auth/userinfo.profile']
});
