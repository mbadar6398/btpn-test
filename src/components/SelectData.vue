<template>
  <ValidationProvider
    v-slot="{ errors, classes }"
    :name="name ? name : ''"
    :rules="{ required }"
  >
    <select
      refs="input"
      :style="failed ? 'border-color: red;' : ''"
      :class="classes"
      :disabled="loading"
      class="form-control form-control-solid"
      @change="selectData"
      required
    >
      <option v-if="loading" value="">Memuat....</option>
      <option v-if="!loading && blank" value="null">Uncategorized</option>
      <option v-if="!loading && select_all" value="">
        {{ select_all_name ? select_all_name : 'Select all' }}
      </option>
      <option v-for="item in data" :key="item.id" :value="item.id">
        {{ item.name }}
      </option>
    </select>
    <div v-if="failed" class="mt-2 mb-4">
      Gagal memuat data,
      <span @click="retry" class="text-danger font-weight-bold cursor-pointer">
        Coba lagi
      </span>
    </div>
    <span class="form-error-message">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {},
  computed: {}
})
export default class SelectData extends Vue {
  @Prop(Array) data: any[];
  @Prop(Boolean) loading: boolean;
  @Prop(String) name: string;
  @Prop(String) blank_name: string;
  @Prop(Boolean) required: boolean;
  @Prop(Boolean) failed: boolean;
  @Prop(Boolean) blank: boolean;
  @Prop(Boolean) select_all: boolean;
  @Prop(String) select_all_name: string;

  selectData(event: any) {
    const value = event.target.value;
    this.$emit('input', value);
    this.$emit('changed', value);
  }

  retry() {
    this.$emit('retry');
  }
}
</script>
