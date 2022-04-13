<template>
  <!-- If option type is channel -->
  <div v-if="option.type === 'channel'" class="d-flex align-items-center">
    <i
      :class="
        `${option.icon} d-flex align-items-center font-size-xl text-${option.color}`
      "
    ></i>
    <span class="ml-2">{{ option.label }}</span>
  </div>

  <!-- If option type is badge -->
  <div
    v-else-if="option.type === 'badge'"
    :class="`d-flex align-items-center vs__badge bg-light-${option.color}`"
  >
    <span :class="`font-weight-bolder font-size-sm text-${option.color}`">
      {{ option.label }}
    </span>
  </div>

  <!-- If option type is only text -->
  <div v-else>
    <span>{{ option.label }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AngleDownIcon from '@/components/Icons/IconAngleDown.vue';

const Option = Vue.extend({
  props: {
    option: {
      type: Object,
      default: (): object | null => null
    }
  }
});

@Component({
  components: {
    AngleDownIcon
  }
})
export default class SelectedOption extends Option {}
</script>
