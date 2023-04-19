<script lang="ts">
  import { Pie } from 'svelte-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

  const data = {
    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'],
    datasets: [
      {
        data: [300, 50, 100, 40, 120],
        backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#AC64AD'],
        hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#DA92DB']
      }
    ]
  };

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>

<div id="chart-container">
  <Pie
    {data}
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
