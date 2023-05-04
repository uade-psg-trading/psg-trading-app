import type { TenantType } from '$lib/tenant-manager';
import type { User as UserData } from '$lib/api';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      session?: Session;
      UserData?: UserData;
      tenant: Tenant;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

interface Session {
  jwt: string;
}

interface Tenant {
  id: TenantType;
}

export {};
