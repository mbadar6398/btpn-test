<template>
  <b-modal
    id="modal-add-table"
    size="xl"
    hide-footer
    title="Add Datatable"
    @shown="onModalShown"
    @hide="onModalHide"
  >
    <div>
      <form @submit.prevent="onSubmit()" action="">
        <div class="form-group">
          <label for="">Upload CSV (Comma Delimeted)</label>
          <div class=" d-flex align-items-center">
            <input
              ref="fileInput"
              class="form-control form-control-solid"
              type="file"
              accept=".csv"
              @change="uploadCSV"
            />
          </div>
        </div>
      </form>
      <div
        v-if="loading"
        class="w-100 d-flex justify-content-center align-items-center"
      >
        <span>Loading...</span>
      </div>
      <div v-if="shortcode">
        <label class="font-weight-bolder" for="">Shortcode</label>
        <small class="ml-2">
          Put this shortcode on Editor (File > Source Code)
        </small>
        <prism-editor
          class="my-editor height-60"
          v-model="code"
          :highlight="highlighter"
          line-numbers
          :readonly="true"
        ></prism-editor>
      </div>
      <div class="table-responsive" v-if="shortcode">
        <!-- <table class="table">
          <thead class="bg-primary">
            <tr>
              <th
                v-for="(items, index) in headers"
                :key="index"
                class="text-white"
              >
                {{ items }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(items, index) in data" :key="index">
              <td v-for="(items2, index2) in headers" :key="index2">
                {{ items[items2] }}
              </td>
            </tr>
          </tbody>
        </table> -->

        <vue-good-table
          :columns="headers"
          :rows="data"
          ref="tableData"
          class="mt-8"
          :search-options="{
            enabled: true
          }"
          :pagination-options="paginationOption"
        />
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import { uuid } from 'vue-uuid';
import axios from 'axios';
@Component({
  components: { PrismEditor },
  computed: {}
})
export default class GeneralSettings extends Vue {
  code = '';
  id = '';
  data: any = [];
  headers: any = [];
  shortcode = false;
  loading = false;
  paginationOption = {
    enabled: true,
    mode: 'records',
    setCurrentPage: 5
  };
  async onSubmit() {
    if (this.data.length > 0) {
      try {
        this.loading = true;
        const dataToPost = {
          data: JSON.stringify(this.data),
          id: this.id
        };
        await axios.post('datatable/insert', dataToPost);
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    }
  }
  highlighter(code: any) {
    return highlight(code, languages.js);
  }
  //   onModalShown() {}
  onModalHide() {
    this.data = [];
    this.headers = [];
    this.code = '';
    this.id = '';
    this.shortcode = false;
  }
  async uploadCSV() {
    if (this.shortcode) {
      (this.$refs['tableData'] as any).reset();
    }

    const code = uuid.v4();
    this.id = code;
    this.code =
      '<div class="customTable" data-id="' +
      code +
      '"> Table # ' +
      code +
      '</div>';

    const vm = this;
    this.data = [];
    this.headers = [];
    const elem: HTMLFormElement = this.$refs.fileInput as HTMLFormElement;
    const file = elem.files[0];
    const reader = new FileReader();
    reader.onload = async function() {
      vm.data = vm.csvJSON(reader.result);
      vm.shortcode = true;
      vm.loading = true;
      const dataToPost = {
        data: JSON.stringify(vm.data),
        id: vm.id
      };
      await axios.post('datatable/insert', dataToPost);
      vm.loading = false;
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(file);
  }

  csvJSON(csv: any) {
    const lines = csv.split('\n');

    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const obj: any = {};
      const currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      for (let j = 0; j < headers.length; j++) {
        obj[
          headers[j]
            .split('\r')
            .join('')
            .split('"')
            .join('')
        ] = currentline[j]
          .split('\r')
          .join('')
          .split('"')
          .join('');
      }
      result.push(obj);
    }

    for (let j = 0; j < headers.length; j++) {
      const name = headers[j]
        .split('\r')
        .join('')
        .split('"')
        .join('');

      this.headers.push({ label: name, field: name });
    }

    //return result; //JavaScript object
    this.paginationOption.setCurrentPage = 1;
    return result; //JSON
  }
}
</script>

<style>
.height-60 {
  height: 120px;
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

.table-responsive td {
  font-size: 14px !important;
  padding-top: 0.45rem !important;
  padding-bottom: 0.45rem !important;
}
</style>
