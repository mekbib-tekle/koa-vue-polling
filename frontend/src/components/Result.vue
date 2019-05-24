<template>
  <div>
    <h3><router-link to="/host">Post a New Question</router-link></h3>
    <h4 v-if="question"> {{question.title}}</h4>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'

export default {
  name: 'Result',
  components: {
    highcharts: Chart 
  },
  computed: {
    chartData() {
        return this.getChartData();
    }
  },
  sockets: {
    pollAnswered(answer) {
        if (!this.initialised) {
            this.chartOptions.series[0].data = answer.question.options.map(op => 0);
            this.initialised = true;
        }
        this.getChartData(answer);
    }
  },
  data() {
    return {
        initialised: false,
        question: null,
        chartOptions: {
            inteval: null,
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Poll Results'
            },
            xAxis: {
                categories: ['Option 1', 'Option 2', 'Option 3']
            },
            yAxis: {
                title: {
                    text: 'Answers'
                }
            },
            series: [{
                name: 'Number of Participants',
                data: [0, 0, 0]
            },]
        },
      title: ''
    }  
  },
  computed: {
  },
  methods: {
    getChartData(result) {
        if (!result) {
            return this.chartOptions;
        }
        //const result = this.$store.state.result;
        let categories = [1,2,3];

        this.question = result.question;

        let answers = this.chartOptions.series[0].data;
        if ( result && result.question) {
            categories = result.question.options;
        }
        if ( result && result.option != null) {
            answers[result.option] += 1;
        }
        this.chartOptions.xAxis = {categories};
        this.chartOptions.series[0].data = answers;
        return this.chartOptions;
    }
  },
  destroyed(){
  }
}
</script>

<style scoped>
h3 {
    text-align: right;
}

</style>
