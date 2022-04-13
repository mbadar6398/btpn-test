<template>
  <div :class="`card card-custom bg-${bg}`">
    <div class="card-body px-6">
      <div class="d-flex flex-column flex-row align-items-center">
        <slot name="icon"></slot>
        <div v-if="!isFailed" class="mt-2 text-center">
          <h4 :class="`font-weight-boldest mb-0 text-${color}`">
            {{ total == -1 ? loader : total }}
          </h4>
          <p
            :class="`mb-0 font-weight-boldest font-size-sm text-${color}`"
            style="max-height: 1.5rem;"
          >
            {{ total == -1 ? 'Calculating...' : label }}
          </p>
        </div>
        <div v-else class="mt-2 text-center">
          <h4 :class="`font-weight-boldest mb-0 text-${color}`">
            Failed
          </h4>
          <span
            @click="fallbackError"
            :class="
              `mb-0 font-weight-boldest font-size-sm cursor-pointer text-${color}`
            "
            style="max-height: 1.5rem;"
          >
            Try Again
          </span>
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
export default class CardInfo extends Vue {
  @Prop(String) readonly bg!: string;
  @Prop(String) readonly color!: string;
  @Prop([Number, String]) readonly total!: number | string;
  @Prop(String) readonly label!: string;
  @Prop(Boolean) readonly isFailed!: boolean;

  loader = 0;
  loading = true;

  mounted() {
    setInterval(() => {
      this.random();
    }, 100);
  }

  random(): void {
    this.loader = Math.floor(1000 + Math.random() * 9000);
  }

  fallbackError(): void {
    this.$emit('fallbackError');
  }
}
</script>
