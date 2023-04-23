<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    appendScript(initWidget);
  });
  function initWidget() {
    if (typeof TradingView !== 'undefined') {
      new window.TradingView.widget({
        autosize: true,
        symbol: 'SKILLING:PSGUSD',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: 'tradingview-widget'
      });
    }
  }

  function appendScript(onload) {
    const script = document.createElement('script');
    script.id = 'tradingview-widget-script';
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/tv.js';
    script.onload = onload;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
</script>

<div id="tradingview-widget" class="h-96" />
