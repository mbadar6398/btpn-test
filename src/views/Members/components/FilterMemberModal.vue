<template>
  <b-modal id="modal-filter" hide-footer title="Filter member">
    <form action="">
      <div class="form-group">
        <label class="font-weight-bolder" for="">Username</label>
        <input class="form-control form-control-solid" type="text" />
      </div>
      <div class="form-group">
        <label class="font-weight-bolder" for="">Nama</label>
        <input class="form-control form-control-solid" type="text" />
      </div>
      <div class="form-group">
        <label class="font-weight-bolder" for="">Wilayah</label>
        <input class="form-control form-control-solid" type="text" />
      </div>
      <div class="form-group">
        <label class="font-weight-bolder" for="">Active</label>
        <input class="form-control form-control-solid" type="text" />
      </div>
      <div class="form-group">
        <label class="font-weight-bolder" for="">Status</label>
        <input class="form-control form-control-solid" type="text" />
      </div>
      <div class="form-group d-flex justify-content-end">
        <button class="btn btn-secondary font-weight-bolder mr-4">
          Reset
        </button>
        <button class="btn btn-success font-weight-bolder">
          Filter data
        </button>
      </div>
    </form>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {}
})
export default class FilterMemberModal extends Vue {}
</script>
