import defaultLogo from '$lib/images/logo/logo.svg';
import psgLogo from '$lib/images/logo/psg-logo.svg';
import lazioLogo from '$lib/images/logo/lazio-logo.svg';
import type { TenantType } from '$lib/tenant-manager';

export const getTenantLogo = (tenant: TenantType) => {
  switch (tenant) {
    case 'lazio':
      return lazioLogo;
    case 'psg':
      return psgLogo;
    default:
      return defaultLogo;
  }
};
