<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card card-custom">
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label font-weight-bolder text-primary">
                {{ loading ? 'Loading Data...' : 'TEMPLATE SETTINGS' }}
              </span>
              <!-- <span class="text-dark-50 mt-2 font-weight-bold font-size-sm">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Distinctio, nulla?
              </span> -->
            </h3>
          </div>
          <div class="card-body" v-if="!loading">
            <form action="">
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label
                      style="font-weight: 700; font-size: 16px; margin-bottom: 1rem;"
                      for=""
                    >
                      Header
                    </label>
                    <prism-editor
                      class="my-editor height-500"
                      v-model="header"
                      :highlight="highlighter"
                      line-numbers
                    ></prism-editor>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label
                      style="font-weight: 700; font-size: 16px; margin-bottom: 1rem;"
                      for=""
                    >
                      Footer
                    </label>
                    <prism-editor
                      class="my-editor height-500"
                      v-model="footer"
                      :highlight="highlighter"
                      line-numbers
                    ></prism-editor>
                  </div>
                </div>
                <div class="col-12 mt-8">
                  <div class="form-group d-flex justify-content-center">
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
import axios from 'axios'; // import Prism Editor
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles
@Component({
  components: { PrismEditor },
  computed: {}
})
export default class GeneralSettings extends Vue {
  loading = false;
  loading_submit = false;
  header = '';
  footer = '';

  async mounted() {
    this.loading = true;
    const { data } = await axios.get('/settings/general');
    this.header = data.data[0]['header'];
    this.footer = data.data[0]['footer'];
    this.loading = false;
  }

  async submit() {
    this.loading_submit = true;
    await axios.put('/settings/template/update', {
      header: this.header,
      footer: this.footer
    });
    this.loading_submit = false;
  }
  highlighter(code: any) {
    return highlight(code, languages.js);
  }
}
</script>

<style>
.height-500 {
  height: 500px;
  width: 100%;
}

.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #eeeeee;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example:*/
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
