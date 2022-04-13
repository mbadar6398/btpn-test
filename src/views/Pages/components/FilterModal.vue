<template>
  <b-modal id="modal-filter" hide-footer title="Filter page">
    <div class="form-group">
      <label class="font-weight-bolder" for="">Name</label>
      <input
        v-model="filter.name"
        class="form-control form-control-solid"
        type="text"
      />
    </div>
    <div class="form-group">
      <label class="font-weight-bolder" for="">Type</label>
      <select v-model="filter.type" class="form-control form-control-solid">
        <option value="">Select all</option>
        <option value="Template">Template</option>
        <option value="Custom">Custom</option>
      </select>
    </div>
    <div class="form-group">
      <label class="font-weight-bolder" for="">Visibility</label>
      <select
        v-model="filter.visibility"
        class="form-control form-control-solid"
      >
        <option value="">Select all</option>
        <option value="Public">Public</option>
        <option value="Private">Private</option>
        <option value="Hidden">Hidden</option>
      </select>
    </div>
    <div class="form-group d-flex justify-content-center">
      <button
        @click="resetFilter"
        class="btn btn-warning text-dark font-weight-bolder mr-4"
      >
        <i class="fa fa-trash-alt text-dark"></i>
        Reset
      </button>
      <button @click="submit" class="btn btn-primary font-weight-bolder">
        <i class="fa fa-filter"></i>
        Filter Data
      </button>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
  computed: {}
})
export default class FilterModel extends Vue {
  loading = false;
  filter = {
    name: '',
    type: '',
    visibility: ''
  };

  resetFilter() {
    this.filter = {
      name: '',
      type: '',
      visibility: ''
    };
    this.$emit('filter', this.filter);
    this.$root.$emit('bv::hide::modal', 'modal-filter');
  }

  submit() {
    this.$emit('filter', this.filter);
    this.$root.$emit('bv::hide::modal', 'modal-filter');
  }
}
</script>
