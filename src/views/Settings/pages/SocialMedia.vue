<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card card-custom">
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label font-weight-bolder text-primary">
                {{ loading_get ? 'Loading...' : 'SOCIAL MEDIA' }}
              </span>
            </h3>
          </div>
          <div class="card-body pt-0">
            <div class="row" v-for="(item, index) in socmed" :key="index">
              <div class="col-12">
                <div class="form-group d-flex align-items-end">
                  <div class="flex-1 w-100">
                    <label class="font-weight-bold" for="">
                      {{ item.name }}
                    </label>
                    <input
                      type="text"
                      v-model="socmed[index]['url']"
                      class="form-control form-control-solid"
                    />
                  </div>
                  <button
                    @click="update(index)"
                    class="btn btn-success btn-sm ml-8 d-flex align-items-center"
                    style="height: 38px;"
                    :disabled="loading"
                  >
                    <span class="mr-2"><i class="fa fa-save"></i></span>
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
@Component({
  components: {},
  computed: {}
})
export default class SocialMediaSettings extends Vue {
  socmed = [];
  loading_get = false;
  loading = false;
  async mounted() {
    this.loading_get = true;
    const { data } = await axios.get('/settings/socmed');
    this.socmed = data.data;
    this.loading_get = false;
  }

  async update(index: number) {
    this.loading = true;
    const value = this.socmed[index];
    await axios.put('/settings/socmed/update', value);
    this.loading = false;
  }
}
</script>
