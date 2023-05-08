<script lang="ts">
  import { Pie } from 'svelte-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

  export let labels: string[] = [];
  export let data: number[] = [];

  let dataset = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#AC64AD'],
        hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#DA92DB']
      }
    ]
  };
</script>

<div id="chart-container">
  <Pie
    data={dataset}
    options={{
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        }
      }
    }}
    width={192}
    height={192}
  />
</div>
