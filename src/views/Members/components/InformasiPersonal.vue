<template>
  <Panel
    title="Informasi Personal"
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
            <label class="font-weight-bolder" for="">Nama lengkap</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">No KTP</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Alamat Sesuai KTP</label>
            <textarea
              rows="5"
              class="form-control form-control-solid"
            ></textarea>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">
              Alamat Sesuai Domisili
            </label>
            <textarea
              rows="5"
              class="form-control form-control-solid"
            ></textarea>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Kota Sesuai KTP</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Kota Domisili</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Kode pos sesuai KTP</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Kode pos domisili</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Tempat lahir</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Tanggal lahir</label>
            <input class="form-control form-control-solid" type="date" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">
              Jenis Kelamin
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
              Status
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
            <label class="font-weight-bolder" for="">NPWP</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Telpon Rumah</label>
            <input class="form-control form-control-solid" type="text" />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Nomor HP</label>
            <input class="form-control form-control-solid" type="text" />
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
export default class InformasiPersonal extends Vue {}
</script>
