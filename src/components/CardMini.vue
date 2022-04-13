<template>
  <div class="card card-custom bg-white h-100">
    <!--begin::Body-->
    <div class="card-body d-flex align-items-center px-8">
      <slot name="icon"></slot>
      <div v-if="!isFailed" class="ml-4">
        <span
          :class="
            `card-title font-weight-boldest text-${color} font-size-h4 mb-0 d-block`
          "
        >
          {{ total == -1 ? loader : total }}
        </span>
        <span :class="`font-weight-boldest text-${color} font-size-sm`">
          {{ total == -1 ? 'Calculating...' : label }}
        </span>
      </div>
      <div v-else class="ml-4">
        <h5 :class="`font-weight-boldest mb-0 text-${color}`">
          Failed
        </h5>
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
    <!--end::Body-->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({
  components: {}
})
export default class CardMini extends Vue {
  @Prop(String) readonly color!: string;
  @Prop([String, Number]) readonly total!: string | number;
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
