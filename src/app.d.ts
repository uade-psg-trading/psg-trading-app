// See https://kit.svelte.dev/docs/types#app

import type { TenantType } from '$lib/tenant-manager';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      session?: Session;
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
