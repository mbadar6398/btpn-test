<template>
  <div class="card">
    <div class="card-header d-flex align-items-start py-6">
      <div>
        <h4 class="card-label text-dark mb-0">Ticket by handler</h4>
        <p class="text-dark-50 mt-1 mb-0">Period : 24 Jan 2020 - 24 Feb 2020</p>
      </div>
      <div class="ml-auto d-flex align-items-center">
        <b-dropdown id="dropdown-1" text="Daily" variant="primary">
          <b-dropdown-item>Daily</b-dropdown-item>
          <b-dropdown-item>Weekly</b-dropdown-item>
          <b-dropdown-item>Monthly</b-dropdown-item>
          <b-dropdown-item>Yearly</b-dropdown-item>
        </b-dropdown>
        <button class="btn btn-success ml-4 font-weight-bold">
          <i class="far fa-calendar-alt"></i>
          Select Date
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="tab-content">
        <div class="tab-pane fade show active">
          <apexchart
            ref="chartTitit"
            width="100%"
            height="320"
            type="line"
            :options="options"
            :series="data.series"
          ></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class LineChart extends Vue {
  @Prop() data!: any;
  options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: this.data.label
    },
    stroke: {
      width: 4,
      curve: 'smooth',
      dashArray: [5, 5]
    }
  };
  series = this.data.series;
}
</script>
