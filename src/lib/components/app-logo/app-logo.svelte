<script lang="ts">
  import type { TenantType } from '$lib/tenant-manager';
  import { getTenantLogo } from '$lib/utils/tenant-logo';

  export let tenant: TenantType;
  export let customClasses = '';
  const classes = `mx-auto ${customClasses}`;
</script>

<img class={classes} src={getTenantLogo(tenant)} alt={`${tenant} logo`} />
