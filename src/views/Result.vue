<template>
  <Layout page-title="あんか結果">
    <pie-chart :chart-data="chartData" :chart-options="chartOption"></pie-chart>
    <v-subheader>コメント</v-subheader>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';
import PieChart from '@/components/PieChart.vue';
import Chart from 'chart.js';
import { draw } from 'patternomaly';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.plugins.register(ChartDataLabels);

@Component({
  components: {
    Layout,
    PieChart,
  },
})
export default class Result extends Vue {
  private chartData: Chart.ChartData = {
    labels: ['海', '山'],
    datasets: [{
      data: [30, 20],
      backgroundColor: [
        draw('diagonal', 'lightblue'),
        draw('diagonal', 'lightgreen'),
        draw('diagonal', 'lightyellow'),
        draw('diagonal', 'lightpink'),
        draw('diagonal', 'lightgray'),
      ],
    }],
  };

  private chartOption: Chart.ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontSize: 10,
      },
    },
    plugins: {
      datalabels: {
        color: 'black',
        labels: {
          title: {
            font: {
              weight: 'bold',
              size: 30,
            },
          },
        },
      },
    },
  };
}
</script>

