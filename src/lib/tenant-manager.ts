export type TenantType = 'trading' | 'psg' | 'lazio';

export const TENANTS: TenantType[] = ['trading', 'psg', 'lazio'];

const getTenants = () => {
  return TENANTS;
};

export const isTenantUrl = (url: URL, tenant: TenantType) => {
  const tenantSubdomain = getTenantSubdomain(tenant);
  return url.hostname.startsWith(tenantSubdomain);
};

export const getTenantUrl = (url: URL, tenant: TenantType) => {
  const tenantSubdomain = getTenantSubdomain(tenant);
  return new URL(`${tenantSubdomain}${url.pathname}${url.search}${url.hash}`, url.origin);
};

export const isHostNameInTenants = (hostname: TenantType) => getTenants().includes(hostname);

export const getTenant = (url: URL, locals: App.Locals): TenantType => {
  const hostname = url.hostname;
  if (locals.tenant?.id) {
    return locals.tenant.id;
  }

  const tenantHostName = hostname.split('.')[0] as TenantType;
  if (tenantHostName && isHostNameInTenants(tenantHostName)) {
    return tenantHostName;
  }

  return 'trading';
};

export const getCurrentTenant = (locals: App.Locals) => {
  return locals.tenant;
};

export const setCurrentTenant = (locals: App.Locals, tenant: TenantType) => {
  locals.tenant = {
    id: tenant
  };
};

export const getTenantSubdomain = (tenant: TenantType) => {
  return `${tenant}.`;
};
