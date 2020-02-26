<template>
  <Layout :page-title="title + '結果'">
    <pie ref="chart" slot="content"></pie>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getQuestion, getQuestionDocRef } from '@/firebase.ts';
import { Question } from '@/types';
import { Pie } from 'vue-chartjs';

Chart.plugins.register(ChartDataLabels);

const getData = (question: Question) =>
  question.selects.map((select) => question.answer.filter((id) => id === select.id).length);

@Component({
  components: {
    Layout,
    Pie,
  },
})
export default class Result extends Vue {

  @Prop()
  private id!: string;

  private title: string = '';

  private chartData: Chart.ChartData = {};

  private chartOption: Chart.ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontSize: 20,
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

  private async created() {
    const question = await getQuestion(this.id);

    this.title = question.content;
    this.chartData = {
      labels: question.selects.map((select) => select.value),
      datasets: [{
        data: getData(question),
        backgroundColor: question.selects.map((select) => select.color),
      }],
    };

    const that: Result = this;
    getQuestionDocRef(this.id)
      .onSnapshot((docSnap) => {
        const doc = docSnap.data() as Question;
        if (that.chartData.datasets) {
          that.chartData.datasets[0].data = getData(doc);
          if (that.$refs.chart && (that.$refs.chart as Pie).renderChart) {
            (that.$refs.chart as Pie).renderChart(that.chartData, that.chartOption);
          }
        }
      });
  }
}
</script>

