import { VERCEL_ENV } from '$env/static/private';
import { PUBLIC_HOST_URL } from '$env/static/public';
import { apiEndpoints } from '$lib/api';
import { getCurrentSession, removeSession } from '$lib/server/cookie-manager';
import { getTenant, isTenantUrl, setCurrentTenant, type TenantType } from '$lib/tenant-manager';
import { redirect, type Handle, type Cookies } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
  const { cookies, locals, url } = event;
  const jwt = getCurrentSession(cookies, locals);
  await handleTenant(url, locals, cookies, jwt);

  return await resolve(event);
}) satisfies Handle;

async function handleTenant(url: URL, locals: App.Locals, cookies: Cookies, jwt: string | null) {
  if (jwt) {
    const meApi = await apiEndpoints.user.me(jwt);
    let currentTenantId = 'trading' as TenantType;
    let defaultUrl = PUBLIC_HOST_URL;
    if (meApi.success) {
      locals.UserData = meApi.data;
      currentTenantId = (meApi.data?.tenant?.tenantId || 'trading') as TenantType;
      defaultUrl = meApi.data?.tenant?.domain || PUBLIC_HOST_URL;
      setCurrentTenant(locals, currentTenantId);
    } else {
      removeSession(cookies, locals);
      setCurrentTenant(locals, getTenant(url, locals));
    }

    if (VERCEL_ENV === 'production') {
      if (!isTenantUrl(url, currentTenantId)) {
        if (!defaultUrl.startsWith('https://')) {
          defaultUrl = `https://${defaultUrl}`;
        }

        throw redirect(307, defaultUrl);
      }
    }
  } else {
    setCurrentTenant(locals, getTenant(url, locals));
  }
}
