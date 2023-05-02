import { createTenantUrl } from '$lib/tenant-manager';
import type { RequestHandler } from './$types';

export const GET = (({ url }) => {
  const params = url.searchParams;
  let tenantParam = params.get('tenant');
  if (!tenantParam || tenantParam === 'undefined') {
    tenantParam = '';
  }

  return new Response('redirect', {
    status: 302,
    headers: {
      location: createTenantUrl(url, tenantParam, 'portfolio')
    }
  });
}) satisfies RequestHandler;
