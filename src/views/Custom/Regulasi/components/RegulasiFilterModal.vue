<template>
  <b-modal id="modal-filter" hide-footer title="Add new informasi">
    <div class="form-group">
      <label class="font-weight-bolder" for="">Name</label>
      <input
        class="form-control form-control-solid"
        v-model="dataToPost.name"
        type="text"
      />
    </div>
    <div class="form-group">
      <label class="font-weight-bolder" for="">Visibility</label>
      <select
        class="form-control form-control-solid"
        v-model="dataToPost.visibility"
        name=""
        id=""
      >
        <option value="">Select all</option>
        <option value="Public">Public</option>
        <option value="Private">Private</option>
        <option value="Hidden">Hidden</option>
      </select>
    </div>
    <div class="d-flex justify-content-center">
      <button @click="submit" class="btn btn-primary btn-block">
        <div>
          <i class="fa fa-filter"></i>
          Filter Data
        </div>
      </button>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import axios from 'axios';

@Component({
  components: {}
})
export default class RegulasiFilterModal extends Vue {
  dataToPost = {
    name: '',
    visibility: ''
  };

  submit() {
    this.$emit('filterData', this.dataToPost);
    this.$root.$emit('bv::hide::modal', 'modal-filter');
  }
}
</script>
