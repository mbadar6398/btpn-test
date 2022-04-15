<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card card-custom">
          <div class="card-header align-items-center border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label font-weight-bolder text-primary">
                {{ loading ? 'Loading...' : 'SMTP SETTINGS' }}
              </span>
              <span class="text-dark-50 mt-2 font-weight-bold font-size-sm">
                {{
                  loading
                    ? 'Fetching data...'
                    : 'Fill form below to update smpt settings'
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
                <div class="col-6">
                  <div class="form-group">
                    <label for="" class="font-weight-bolder">SMTP Host</label>
                    <input
                      v-model="dataToPost.smtp_host"
                      type="text"
                      class="form-control form-control-solid"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="" class="font-weight-bolder">SMTP Port</label>
                    <input
                      v-model="dataToPost.smtp_port"
                      type="text"
                      class="form-control form-control-solid"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="" class="font-weight-bolder">
                      SMTP Username
                    </label>
                    <input
                      v-model="dataToPost.smtp_user"
                      type="text"
                      class="form-control form-control-solid"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="" class="font-weight-bolder">
                      SMTP Password
                    </label>
                    <input
                      v-model="dataToPost.smtp_password"
                      type="text"
                      class="form-control form-control-solid"
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
      await axios.put('/settings/update', this.dataToPost);
      this.loading_submit = false;
    } catch (error) {
      this.loading_submit = false;
    }
  }
}
</script>
