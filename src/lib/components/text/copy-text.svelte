<script lang="ts">
  import copyButton from '$lib/images/copy-button.svg';
  export let title: string;
  export let text: string;
  function handleCopy() {
    navigator.clipboard.writeText(text);
  }
</script>

<div class="flex items-center mt-4">
  <p>
    <span class="text-base text-gray-900">{title}:</span>
    <span class="text-sm text-gray-500 mr-1.5">{text}</span>
  </p>
  <button on:click={handleCopy}>
    <img class="w-4 h-4" src={copyButton} alt="Copy" />
  </button>
</div>
