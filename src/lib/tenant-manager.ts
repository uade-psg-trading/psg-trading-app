export type TenantType = 'default' | 'psg' | 'lazio';

export const TENANTS: TenantType[] = ['psg', 'lazio'];

const getTenants = () => {
  return TENANTS;
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

  return 'default';
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
  return tenant === 'default' || !tenant ? '' : `${tenant}.`;
};

export const createTenantUrl = (url: URL, tenant: string, appPath = '') => {
  const tenantSubdomain = getTenantSubdomain(tenant as TenantType);
  const hostName = url.hostname.includes('.') ? url.hostname.split('.')[1] : url.hostname;
  const tenantUrl = `${url.protocol}//${tenantSubdomain}${hostName}:${url.port}/${appPath}`;
  return tenantUrl;
};
