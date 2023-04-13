<script lang="ts">
  export let classes = '';
</script>

<div class={`bg-white shadow p-6 rounded ${classes}`}>
  <slot />
</div>
