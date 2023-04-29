export type TenantType = 'default' | 'psg' | 'lazio';

export const TENANTS: TenantType[] = ['psg', 'lazio'];

const getTenants = () => {
  return TENANTS;
};

export const getTenant = (url: URL): TenantType => {
  const hostname = url.hostname;
  const tenant = hostname.split('.')[0] as TenantType;
  if (tenant && getTenants().includes(tenant)) {
    return tenant;
  }

  return 'default';
};

export const getCurrentTenant = (locals: App.Locals) => {
  return locals.tenant;
};
