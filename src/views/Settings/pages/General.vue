<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card card-custom">
          <div class="card-header align-items-center border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label font-weight-bolder text-primary">
                {{ loading ? 'Loading...' : 'GENERAL SETTINGS' }}
              </span>
              <span class="text-dark-50 mt-2 font-weight-bold font-size-sm">
                {{
                  loading
                    ? 'Fetching data...'
                    : 'Fill form below to update general settings'
                }}
              </span>
            </h3>
            <div>
              <button
                @click="submit"
                type="button"
                :disabled="loading_submit"
                class="btn btn-success btn-sm font-weight-bolder"
              >
                <div v-if="!loading_submit">
                  <i class="la la-save"></i>
                  Save changes
                </div>

                <div
                  class="d-flex align-items-center justify-content-center"
                  v-else
                >
                  <span
                    class="spinner spinner-track spinner-success spinner-sm mr-6"
                  ></span>
                  <span class="ml-2">Loading...</span>
                </div>
              </button>
            </div>
          </div>
          <div class="card-body">
            <form action="" v-if="!loading">
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="" class="font-weight-bolder">
                      Company name
                    </label>
                    <input
                      v-model="dataToPost.company_name"
                      type="text"
                      class="form-control form-control-solid"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label for="" class="font-weight-bolder">
                      Company Description
                    </label>
                    <textarea
                      class="form-control form-control-solid"
                      v-model="dataToPost.company_description"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="" class="font-weight-bolder">Email</label>
                    <input
                      v-model="dataToPost.email"
                      type="text"
                      class="form-control form-control-solid"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="" class="font-weight-bolder">Fax</label>
                    <input
                      v-model="dataToPost.fax"
                      type="text"
                      class="form-control form-control-solid"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="" class="font-weight-bolder">Phone</label>
                    <input
                      v-model="dataToPost.phone"
                      type="text"
                      class="form-control form-control-solid"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="" class="font-weight-bolder">Whatsapp</label>
                    <input
                      v-model="dataToPost.whatsapp"
                      type="text"
                      class="form-control form-control-solid"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label for="" class="font-weight-bolder">Address</label>
                    <textarea
                      v-model="dataToPost.address"
                      rows="3"
                      class="form-control form-control-solid"
                    ></textarea>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-4">
                    <label class="font-weight-bolder" for="">
                      Logo white
                    </label>
                    <UploadInput
                      directory="data"
                      name="Logo white"
                      :encrypt="true"
                      :overwrite="false"
                      v-model="dataToPost.logo_white"
                      accept="image/*"
                    />
                    <img
                      v-if="dataToPost.logo_white"
                      class="img-fluid"
                      :src="dataToPost.logo_white"
                      style="max-height: 240px;"
                      alt=""
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-4">
                    <label class="font-weight-bolder" for="">
                      Logo dark
                    </label>
                    <UploadInput
                      directory="data"
                      name="Logo dark"
                      :encrypt="true"
                      :overwrite="false"
                      v-model="dataToPost.logo_dark"
                      accept="image/*"
                    />
                    <img
                      v-if="dataToPost.logo_dark"
                      class="img-fluid"
                      :src="dataToPost.logo_dark"
                      style="max-height: 240px;"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UploadInput from '@/components/UploadInput/UploadInput.vue';
import axios from 'axios';
@Component({
  components: { UploadInput },
  computed: {}
})
export default class GeneralSettings extends Vue {
  loading = false;
  loading_submit = false;
  dataToPost = {};

  async mounted() {
    this.loading = true;
    const { data } = await axios.get('/settings/general');
    this.dataToPost = data.data;
    this.loading = false;
  }

  async submit() {
    try {
      this.loading_submit = true;
      const { data } = await axios.put('/settings/update', this.dataToPost);
      this.$store.commit('user/UPDATE_SETTINGS', data.data);
      this.loading_submit = false;
    } catch (error) {
      this.loading_submit = false;
    }
  }
}
</script>
