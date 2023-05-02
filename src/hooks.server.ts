import { apiEndpoints } from '$lib/api';
import { getCurrentSession } from '$lib/server/cookie-manager';
import { getTenant, isTenantUrl, setCurrentTenant, type TenantType } from '$lib/tenant-manager';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
  const { cookies, locals, url } = event;
  const jwt = getCurrentSession(cookies, locals);
  if (jwt) {
    const currentUserData = await apiEndpoints.user.me(jwt);
    const tenant = currentUserData.success
      ? ((currentUserData.data?.tenantId === 'default'
          ? 'trading'
          : currentUserData.data?.tenantId ?? 'trading') as TenantType)
      : getTenant(url, locals);
    setCurrentTenant(locals, tenant);
    if (!isTenantUrl(url, tenant)) {
      const tenantUrl = `${url.protocol}//${tenant}.${url.hostname}:${url.port}${url.pathname}`;
      console.log('tenantUrl', tenantUrl);
      throw redirect(307, tenantUrl);
    }
  } else {
    setCurrentTenant(locals, getTenant(url, locals));
  }

  return await resolve(event);
}) satisfies Handle;
