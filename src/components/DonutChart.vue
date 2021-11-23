<template>
      <vc-donut :sections="sections" size="170"
                class="itemContainer">
        <p style="font-size: 2em; font-weight: 700">{{ this.valueOne }}%</p>{{this.chartInformation}}
      </vc-donut>
</template>

<script>

import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';
import Vue from "vue";

Vue.use(Donut);

export default {
  name: "DonutChart",
  props: ['valueOne', 'valueTwo', 'chartInformation'],
  data() {
    return {
      sections: []
    };
  },
  watch: {
    valueOne: function () {
      this.sections.push({label: 'Passed', value: this.valueOne, color: '#84c078'})
    },
    valueTwo: function () {
      this.sections.push({label: 'Not passed', value: this.valueTwo, color: '#ffa2a2'})
    }
  }
}
</script>

<style scoped>

</style>