<template>
  <Panel
    title="Informasi Kepesertaan"
    subtitle="Isi form dibawah ini untuk mengubah"
  >
    <template v-slot:toolbar>
      <button class="btn btn-sm btn-success font-weight-bolder">
        <i class="fa fa-save"></i>
        Simpan perubahan
      </button>
    </template>
    <template v-slot:body>
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Cabang utama</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Cabang</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Wilayah</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">NIP</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Username</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Email</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Password</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">
              Status Aktivasi
            </label>
            <select class="form-control form-control-solid">
              <option value="">Yes</option>
              <option value="">No</option>
            </select>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">
              Status Akun
            </label>
            <select class="form-control form-control-solid">
              <option value="">Approval</option>
              <option value="">Pending</option>
              <option value="">Inactive</option>
            </select>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">
              Status Pasif
            </label>
            <select class="form-control form-control-solid">
              <option value="">Yes</option>
              <option value="">No</option>
            </select>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">
              Status Pengurus
            </label>
            <select class="form-control form-control-solid">
              <option value="">U</option>
              <option value="">P</option>
            </select>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group mb-0">
            <label class="font-weight-bolder" for="">
              Status Update
            </label>
            <select class="form-control form-control-solid">
              <option value="">Yes</option>
              <option value="">No</option>
            </select>
          </div>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Panel from '@/components/panel/Panel.vue';
@Component({
  components: { Panel }
})
export default class InformasiKepesertaan extends Vue {}
</script>
