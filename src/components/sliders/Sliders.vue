<template>
  <div class="card card-custom ">
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-primary">
          Sliders
        </span>
        <span class="text-muted mt-1 font-weight-bold font-size-sm">
          Fill form below to update section information
        </span>
      </h3>
      <div class="card-toolbar">
        <ul class="nav nav-pills nav-pills-sm nav-dark-75">
          <li class="nav-item mr-4" v-if="!edit_mode" @click="add">
            <button
              class="btn btn-success btn-block btn-sm font-weight-bolder"
              :disabled="loading_process"
            >
              <div v-if="!loading_process">
                <i class="la la-save"></i>
                Save Changes
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
          </li>
          <li class="nav-item mr-4" v-else>
            <button
              class="btn btn-success btn-block btn-sm font-weight-bolder"
              @click="update"
              :disabled="loading_process"
            >
              <div v-if="!loading_process">
                <i class="la la-save"></i>
                Save Changes
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
          </li>
          <li class="nav-item" v-if="edit_mode">
            <button
              @click="deleteSlider"
              class="btn btn-danger btn-block btn-sm font-weight-bolder"
              :disabled="loading_process"
            >
              <div v-if="!loading_process">
                <i class="fa fa-trash"></i>
                Delete Slider
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
          </li>
        </ul>
      </div>
    </div>
    <div class="card-body border-0 pt-0">
      <div class="form-group">
        <label class="font-weight-bolder" for="">Select slider</label>
        <SelectData
          :loading="loading_get_sliders"
          :data="sliders"
          :select_all="true"
          select_all_name="Add New slider"
          :blank="false"
          @changed="onSliderSelected"
          v-model="selected_slider"
          required
        />
      </div>
      <div class="row mt-8">
        <div class="col-12">
          <div class="position-relative">
            <img
              :src="
                dataToPost.background
                  ? dataToPost.background
                  : 'https://via.placeholder.com/1400x768'
              "
              class="img-fluid"
              alt=""
            />
            <div
              class="d-flex align-items-center"
              style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; width: 100%;"
            >
              <div class="container">
                <div class="row">
                  <div class="col-6">
                    <div class="text-white" v-html="dataToPost.content"></div>
                    <a
                      href="#"
                      style="background-color: #ffde00; color: #000000; padding: 1rem 1.25rem; border-radius: 5px;"
                      v-if="dataToPost.url"
                      class="d-inline-block btn-outline mt-3"
                    >
                      {{ dataToPost.button_label }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-8">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Slider name</label>
            <input
              class="form-control form-control-solid"
              v-model="dataToPost.name"
              type="text"
            />
          </div>
        </div>
        <!-- Description Content -->
        <div class="col-12">
          <div class="form-group">
            <label class="font-weight-bolder" for="">
              <span class="text-danger mr-1">*</span>
              Content
            </label>
            <Editor
              api-key="quq8vd89bv5ivyw082b8g49x7iuu6uh0h85p8deb4mdplqpa"
              v-model="dataToPost.content"
              :init="{
                height: 360,
                menubar: false,
                plugins: [
                  'textcolor advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'forecolor backcolor | undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
              }"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Action Url</label>
            <input
              class="form-control form-control-solid"
              v-model="dataToPost.url"
              type="text"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Button Label</label>
            <input
              class="form-control form-control-solid"
              v-model="dataToPost.button_label"
              type="text"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Background</label>
            <UploadInput
              directory="sliders"
              :encrypt="true"
              :overwrite="false"
              v-model="dataToPost.background"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import UploadInput from '@/components/UploadInput/UploadInput.vue';
import SelectData from '@/components/SelectData.vue';
import MainConfig from '@/config/config';
import Editor from '@tinymce/tinymce-vue';
import axios from 'axios';
@Component({
  components: { UploadInput, SelectData, Editor },
  computed: {}
})
export default class Sliders extends Vue {
  @Prop(Object) selected_section: any;
  mainconfig = MainConfig;
  sliders = [];
  loading_get_sliders = false;
  loading_process = false;
  edit_mode = false;
  is_mobile = false;
  content = false;
  selected_slider = '';
  dataToPost = {
    id: '',
    section_id: '',
    name: '',
    url: '',
    button_label: '',
    content: '',
    background: '',
    background_mobile: ''
  };

  mounted() {
    this.getSliders();
  }

  async getSliders() {
    this.loading_get_sliders = true;
    const { data } = await axios.get(
      '/sliders/get?section_id=' + this.selected_section.id
    );
    this.sliders = data.data;
    this.dataToPost.section_id = this.selected_section.id;
    this.loading_get_sliders = false;
  }

  resetData() {
    this.dataToPost.id = '';
    this.dataToPost.section_id = this.selected_section.id;
    this.dataToPost.name = '';
    this.dataToPost.url = '';
    this.dataToPost.button_label = '';
    this.dataToPost.content = '';
    this.dataToPost.background = '';
    this.dataToPost.background_mobile = '';
    this.edit_mode = false;
  }

  onSliderSelected(value: string) {
    if (value) {
      const filteredSlider: any = this.sliders.find(
        (item: any) => item.id === value
      );
      this.dataToPost.id = filteredSlider.id;
      this.dataToPost.section_id = this.selected_section.id;
      this.dataToPost.name = filteredSlider.name;
      this.dataToPost.url = filteredSlider.url;
      this.dataToPost.button_label = filteredSlider.button_label;
      this.dataToPost.content = filteredSlider.content;
      this.dataToPost.background = filteredSlider.background;
      this.dataToPost.background_mobile = filteredSlider.background_mobile;
      this.edit_mode = true;
    } else {
      this.resetData();
    }
  }

  async add() {
    this.loading_process = true;
    await axios.post('/sliders/add', this.dataToPost);
    this.loading_process = false;
    this.resetData();
    await this.getSliders();
  }

  async update() {
    this.loading_process = true;
    await axios.put('/sliders/update/' + this.dataToPost.id, this.dataToPost);
    this.loading_process = false;
    await this.getSliders();
  }

  async deleteSlider() {
    this.$swal({
      title: 'Are you sure want to delete this slider?',
      text: "Your action couldn't be reverted",
      showCancelButton: true,
      icon: 'info',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#03BBB2',
      denyButtonText: `Cancel`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          this.sliders = [];
          this.loading_process = true;
          await axios.delete('/sliders/delete/' + this.dataToPost.id);
          this.loading_process = false;
          this.getSliders();
          this.resetData();
        } catch (error) {
          this.loading_process = false;
          this.getSliders();
          this.resetData();
        }
      }
    });
  }
}
</script>
