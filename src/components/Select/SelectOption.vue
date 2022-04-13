<template>
  <!-- If option type is channel -->
  <div v-if="option.type === 'channel'" class="d-flex align-items-center">
    <i :class="`${option.icon} text-${option.color}`"></i>
    <span class="mb-1 ml-4 font-size-sm">{{ option.label }}</span>
  </div>

  <!-- If option type is badge -->
  <div
    v-else-if="option.type === 'badge'"
    class="d-flex align-items-center py-1"
  >
    <div
      :class="`label label-light-${option.color} label-inline contact__label`"
    >
      {{ option.label }}
    </div>
  </div>

  <!-- If option type is text only -->
  <div v-else>
    {{ option.label }}
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
export default class SelectOption extends Option {}
</script>
