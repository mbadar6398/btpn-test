<template>
  <div class="input-icon">
    <v-select
      :class="
        `${
          styleModel === 'default'
            ? 'form-control-solid form-control-solid--white'
            : 'form-control-solid'
        } ${multiple ? 'multi-select' : ''}`
      "
      :value="defaultValue"
      :multiple="multiple"
      :options="options"
      :placeholder="placeholder"
      :reduce="(option) => option.value"
      @input="onChange"
    >
      <template #spinner>
        <div
          v-show="loading && async && !failed"
          class="spinner spinner-primary spinner-sm mr-7"
        ></div>
        <div
          v-show="!loading && async && failed"
          class="mr-2 cursor-pointer"
          @click="retry"
        >
          <i
            class="ki ki-refresh font-weight-bolder font-size-xl text-warning"
          ></i>
        </div>
      </template>

      <template #option="option">
        <SelectOption :option="option" />
      </template>

      <template #selected-option="option">
        <SelectedOption :option="option" />
      </template>

      <template #open-indicator="{ attributes }">
        <IconAngleDown
          v-show="!loading && !failed"
          v-bind="attributes"
          class="ml-auto"
          color="success"
        />
      </template>

      <template #no-options>
        <span v-show="options.length === 0 && !loading">
          Data tidak ditemukan
        </span>
      </template>
    </v-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import IconAngleDown from '@/components/Icons/IconAngleDown.vue';
import SelectOption from './SelectOption.vue';
import SelectedOption from './SelectedOption.vue';

interface OptionType {
  value: string;
  label: string;
  code: string;
  type: string;
  color: string;
  icon: string;
}
interface OptionArrayType {
  [index: number]: {
    value: string;
    label: string;
    code: string;
    type: string;
    color: string;
    icon: string;
  };
}

const Options = Vue.extend({
  props: {
    styleModel: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: (): object[] => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    failed: {
      type: Boolean,
      default: false
    },
    async: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Select options below'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  }
});

@Component({
  components: {
    IconAngleDown,
    SelectOption,
    SelectedOption
  }
})
export default class Select extends Options {
  onChange(value: string[]): void {
    if (value && this.multiple) {
      if (typeof value[0] === 'undefined') {
        value.shift();
      }
      this.$emit('input', value.join(','));
      this.$emit('change');
    } else if (value && !this.multiple) {
      this.$emit('input', value);
      this.$emit('change');
    } else {
      this.$emit('input', '');
      this.$emit('change');
    }
  }
  retry(): void {
    this.$emit('retry');
  }
  get defaultValue(): string | string[] {
    if (this.multiple && this.value !== '') {
      return this.value.split(',');
    } else {
      return this.value;
    }
  }
}
</script>
