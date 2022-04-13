<template>
  <span :class="`svg-icon svg-icon-${color} svg-icon-${size}x`">
    <!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-02-01-052524/theme/html/demo1/dist/../src/media/svg/icons/Navigation/Close.svg-->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
    >
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g
          transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)"
          fill="#000000"
        >
          <rect x="0" y="7" width="16" height="2" rx="1" />
          <rect
            opacity="0.3"
            transform="translate(8.000000, 8.000000) rotate(-270.000000) translate(-8.000000, -8.000000) "
            x="0"
            y="7"
            width="16"
            height="2"
            rx="1"
          />
        </g>
      </g>
    </svg>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class IconClose extends Vue {
  @Prop({ default: 'primary' }) readonly color!: string;
  @Prop({ default: '2' }) readonly size!: number;
}
</script>
