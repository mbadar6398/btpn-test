<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <form
            refs="updateForm"
            novalidate
            @submit.prevent="handleSubmit(submit)"
          >
            <!-- Informasi Akun -->
            <Panel
              title="Informasi Akun"
              subtitle="Isi form dibawah ini dengan benar"
            >
              <template v-slot:toolbar></template>
              <template v-slot:body>
                <div class="row">
                  <div class="col-6">
                    <ValidationProvider
                      v-slot="{ errors, classes }"
                      name="Cabang utama"
                      rules="required"
                    >
                      <div class="form-group">
                        <label class="font-weight-bolder" for="">
                          Cabang utama
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          :class="classes"
                          v-model="dataToPost.cabang_utama"
                          class="form-control form-control-solid"
                          type="text"
                          required
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <ValidationProvider
                        v-slot="{ errors, classes }"
                        name="Cabang"
                        rules="required"
                      >
                        <div class="form-group">
                          <label class="font-weight-bolder" for="">
                            Cabang
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            v-model="dataToPost.cabang"
                            :class="classes"
                            class="form-control form-control-solid"
                            type="text"
                            required
                          />
                          <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="col-6">
                    <ValidationProvider
                      v-slot="{ errors, classes }"
                      name="Wilayah"
                      rules="required"
                    >
                      <div class="form-group">
                        <label class="font-weight-bolder" for="">
                          Wilayah
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          :class="classes"
                          v-model="dataToPost.wilayah"
                          class="form-control form-control-solid"
                          type="text"
                          required
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-6">
                    <ValidationProvider
                      v-slot="{ errors, classes }"
                      name="NIP"
                      rules="required"
                    >
                      <div class="form-group">
                        <label class="font-weight-bolder" for="">
                          NIP
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          v-model="dataToPost.nip"
                          :class="classes"
                          class="form-control form-control-solid"
                          type="text"
                          required
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-6">
                    <ValidationProvider
                      v-slot="{ errors, classes }"
                      name="Username"
                      rules="required"
                    >
                      <div class="form-group">
                        <label class="font-weight-bolder" for="">
                          Username
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          v-model="dataToPost.username"
                          :class="classes"
                          class="form-control form-control-solid"
                          type="text"
                          required
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-6">
                    <ValidationProvider
                      v-slot="{ errors, classes }"
                      name="Email"
                      rules="required"
                    >
                      <div class="form-group">
                        <label class="font-weight-bolder" for="">
                          Email
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          v-model="dataToPost.email"
                          :class="classes"
                          class="form-control form-control-solid"
                          type="text"
                          required
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-12">
                    <ValidationProvider
                      v-slot="{ errors, classes }"
                      name="Password"
                      rules="required"
                    >
                      <div class="form-group">
                        <label class="font-weight-bolder" for="">
                          Password
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          v-model="dataToPost.password"
                          :class="classes"
                          class="form-control form-control-solid"
                          type="text"
                          required
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Status
                      </label>
                      <select
                        v-model="dataToPost.status"
                        class="form-control form-control-solid"
                      >
                        <option value="0">Approval</option>
                        <option value="1">Pending</option>
                        <option value="2">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <!-- <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Status Pasif
                      </label>
                      <select class="form-control form-control-solid">
                        <option value="">Yes</option>
                        <option value="">No</option>
                      </select>
                    </div>
                  </div> -->
                  <!-- <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Status Pengurus
                      </label>
                      <select class="form-control form-control-solid">
                        <option value="">U</option>
                        <option value="">P</option>
                      </select>
                    </div>
                  </div> -->
                  <!-- <div class="col-6">
                    <div class="form-group mb-0">
                      <label class="font-weight-bolder" for="">
                        Status Update
                      </label>
                      <select class="form-control form-control-solid">
                        <option value="">Yes</option>
                        <option value="">No</option>
                      </select>
                    </div>
                  </div> -->
                </div>
              </template>
            </Panel>

            <!-- Informasi Personal -->
            <Panel
              class="mt-8"
              title="Informasi Personal"
              subtitle="Isi form dibawah ini dengan benar"
            >
              <template v-slot:toolbar></template>
              <template v-slot:body>
                <div class="row">
                  <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Nama lengkap
                      </label>
                      <input
                        v-model="dataToPost.name"
                        class="form-control form-control-solid"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">No KTP</label>
                      <input
                        v-model="dataToPost.ktp"
                        class="form-control form-control-solid"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Alamat Sesuai KTP
                      </label>
                      <textarea
                        v-model="dataToPost.alm_ktp"
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
                        v-model="dataToPost.address"
                        rows="5"
                        class="form-control form-control-solid"
                      ></textarea>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Kota Sesuai KTP
                      </label>
                      <input
                        v-model="dataToPost.kota_ktp"
                        class="form-control form-control-solid"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Kota Domisili
                      </label>
                      <input
                        v-model="dataToPost.kota_dom"
                        class="form-control form-control-solid"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Kode pos sesuai KTP
                      </label>
                      <input
                        v-model="dataToPost.pos_ktp"
                        class="form-control form-control-solid"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Kode pos domisili
                      </label>
                      <input
                        v-model="dataToPost.pos_dom"
                        class="form-control form-control-solid"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Tempat lahir
                      </label>
                      <input
                        v-model="dataToPost.tempat_lhr"
                        class="form-control form-control-solid"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Tanggal lahir
                      </label>
                      <input
                        v-model="dataToPost.tgl"
                        class="form-control form-control-solid"
                        type="date"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Jenis Kelamin
                      </label>
                      <select
                        v-model="dataToPost.kelamin"
                        class="form-control form-control-solid"
                      >
                        <option value="Pria">Pria</option>
                        <option value="Wanita">Wanita</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Status perinkahan
                      </label>
                      <select
                        v-model="dataToPost.status_perinkahan"
                        class="form-control form-control-solid"
                      >
                        <option value="Menikah">Menikah</option>
                        <option value="Single">Single</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">NPWP</label>
                      <input
                        v-model="dataToPost.npwp"
                        class="form-control form-control-solid"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Telpon Rumah
                      </label>
                      <input
                        v-model="dataToPost.phone"
                        class="form-control form-control-solid"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">Nomor HP</label>
                      <input
                        v-model="dataToPost.mobile"
                        class="form-control form-control-solid"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </Panel>

            <!-- Informasi Kepesertaan -->
            <Panel
              class="mt-8"
              title="Informasi Kepesertaan BCA"
              subtitle="Isi form dibawah ini dengan benar"
            >
              <template v-slot:toolbar></template>
              <template v-slot:body>
                <div class="row">
                  <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Tanggal masuk BCA
                      </label>
                      <input
                        v-model="dataToPost.tgl_awal"
                        class="form-control form-control-solid"
                        type="date"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label class="font-weight-bolder" for="">
                        Tanggal kepesertaan
                      </label>
                      <input
                        v-model="dataToPost.tgl_akhir"
                        class="form-control form-control-solid"
                        type="date"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <ValidationProvider
                      v-slot="{ errors, classes }"
                      name="Saldo periode"
                      rules="required"
                    >
                      <div class="form-group">
                        <label class="font-weight-bolder" for="">
                          Saldo periode
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          v-model="dataToPost.saldo_periode"
                          :class="classes"
                          class="form-control form-control-solid"
                          type="number"
                          required
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-6">
                    <ValidationProvider
                      v-slot="{ errors, classes }"
                      name="Saldo iuran peserta"
                      rules="required"
                    >
                      <div class="form-group">
                        <label class="font-weight-bolder" for="">
                          Saldo iuran peserta
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          v-model="dataToPost.saldo_peserta"
                          :class="classes"
                          class="form-control form-control-solid"
                          type="number"
                          required
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-6">
                    <ValidationProvider
                      v-slot="{ errors, classes }"
                      name="Saldo iuran pemberi kerja"
                      rules="required"
                    >
                      <div class="form-group">
                        <label class="font-weight-bolder" for="">
                          Saldo iuran pemberi kerja
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          v-model="dataToPost.saldo_pemberi_kerja"
                          :class="classes"
                          class="form-control form-control-solid"
                          type="number"
                          required
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-6">
                    <ValidationProvider
                      v-slot="{ errors, classes }"
                      name="Saldo hasil pengembangan"
                      rules="required"
                    >
                      <div class="form-group">
                        <label class="font-weight-bolder" for="">
                          Saldo hasil pengembangan
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          v-model="dataToPost.saldo_pengembang"
                          :class="classes"
                          class="form-control form-control-solid"
                          type="number"
                          required
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-6">
                    <ValidationProvider
                      v-slot="{ errors, classes }"
                      name="Saldo SPI"
                      rules="required"
                    >
                      <div class="form-group">
                        <label class="font-weight-bolder" for="">
                          Saldo SPI
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          v-model="dataToPost.saldo_spi"
                          :class="classes"
                          class="form-control form-control-solid"
                          type="number"
                          required
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-6">
                    <ValidationProvider
                      v-slot="{ errors, classes }"
                      name="Saldo iuran sukarela"
                      rules="required"
                    >
                      <div class="form-group">
                        <label class="font-weight-bolder" for="">
                          Saldo iuran sukarela
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          :class="classes"
                          v-model="dataToPost.saldo_sukarela"
                          class="form-control form-control-solid"
                          type="number"
                          required
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-6">
                    <ValidationProvider
                      v-slot="{ errors, classes }"
                      name="Saldo sukarela hasil pengembangan"
                      rules="required"
                    >
                      <div class="form-group">
                        <label class="font-weight-bolder" for="">
                          Saldo sukarela hasil pengembangan
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          v-model="dataToPost.saldo_pengembang_sukarela"
                          :class="classes"
                          class="form-control form-control-solid"
                          type="number"
                          required
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-6">
                    <ValidationProvider
                      v-slot="{ errors, classes }"
                      name="Saldo sukarela SPI"
                      rules="required"
                    >
                      <div class="form-group">
                        <label class="font-weight-bolder" for="">
                          Saldo sukarela SPI
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          v-model="dataToPost.saldo_spi_sukarela"
                          :class="classes"
                          class="form-control form-control-solid"
                          type="number"
                          required
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
              </template>
            </Panel>
            <div class="mt-8 d-flex justify-content-end">
              <router-link
                to="/informasi"
                class="btn btn-secondary font-weight-bolder mr-4"
              >
                <i class="fa fa-arrow-left"></i>
                Back
              </router-link>
              <button class="btn btn-success font-weight-bolder" type="submit">
                <i class="fa fa-save"></i>
                Simpan Perubahan
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Panel from '@/components/panel/Panel.vue';
import InformasiAkun from '../components/InformasiAkun.vue';
import InformasiPersonal from '../components/InformasiPersonal.vue';
import InformasiKepesertaan from '../components/InformasiKepesertaan.vue';
@Component({
  components: {
    Panel,
    InformasiAkun,
    InformasiPersonal,
    InformasiKepesertaan
  }
})
export default class MembersAdd extends Vue {
  dataToPost = {
    username: '',
    password: '',
    name: '',
    address: '',
    email: '',
    phone: '',
    mobile: '',
    ktp: '',
    alm_ktp: '',
    kota_ktp: '',
    pos_ktp: '',
    kota_dom: '',
    pos_dom: '',
    tempat_lhr: '',
    tgl: '',
    kelamin: '',
    npwp: '',
    tgl_awal: '',
    cabang: '',
    tgl_akhir: '',
    status_perinkahan: '',
    saldo_periode: '',
    saldo_peserta: '',
    saldo_pengembang: '',
    status: 0
  };
  submit() {
    this.dataToPost.status = Number(this.dataToPost.status);
    console.log(this.dataToPost);
  }
}
</script>
