import { PUBLIC_HOST_URL } from '$env/static/public';
import { GOOGLE_CLIENT_ID, GOOGLE_SECRET } from '$env/static/private';
import { google } from 'googleapis';

export const oauth2client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET,
  `${PUBLIC_HOST_URL}/api/callback/google`
);

export const authUrl = oauth2client.generateAuthUrl({
  scope: [
    'openid',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
});
