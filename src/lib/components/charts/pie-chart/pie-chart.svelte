<script lang="ts">
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
  fcRoot(FusionCharts, Charts, FusionTheme);

  let dataSource = {
      chart: {
        showValues: '0',
        showLabels: '0',
        showPercentInTooltip: '0',
        theme: 'fusion',
        legendPosition: 'right',
        legendItemFontSize: '16',
        legendNumColumns: '3'
      },
      data: [
        {
          label: 'Equity',
          value: '300000'
        },
        {
          label: 'Debt',
          value: '230000'
        },
        {
          label: 'Bullion',
          value: '180000'
        },
        {
          label: 'Real-estate',
          value: '270000'
        },
        {
          label: 'Insurance',
          value: '20000'
        }
      ]
    },
    chartConfig = {
      type: 'pie2d',
      renderAt: 'chart-container',
      height: '35%',
      width: '80%',
      dataSource
    };
</script>

<div id="chart-container">
  <SvelteFC {...chartConfig} />
</div>
