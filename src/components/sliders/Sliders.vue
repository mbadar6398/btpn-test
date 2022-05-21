<template>
  <div class="card card-custom ">
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-primary">
          Sliders
        </span>
        <span class="text-muted mt-1 font-weight-bold font-size-sm">
          Anda dapat menambahkan, mengubah, dan menghapus slider
        </span>
      </h3>
      <div class="card-toolbar">
        <ul class="nav nav-pills nav-pills-sm nav-dark-75">
          <li
            class="nav-item"
            :class="!edit_mode ? '' : 'mr-4'"
            v-if="!edit_mode"
            @click="add"
          >
            <button
              class="btn btn-success btn-block btn-sm font-weight-bolder"
              :disabled="loading_process"
            >
              <div v-if="!loading_process">
                <i class="la la-save"></i>
                Simpan Perubahan
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
                Simpan Perubahan
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
                Hapus Slider
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
      <div class="d-flex align-items-center ">
        <div class="form-group" style="width: 100%;">
          <label class="font-weight-bolder" for="">Pilih slider</label>
          <SelectData
            :loading="loading_get_sliders"
            :data="sliders"
            :select_all="true"
            select_all_name="Buat slider baru"
            :blank="false"
            @changed="onSliderSelected"
            v-model="selected_slider"
            required
          />
        </div>
        <button
          :disabled="loading_reorder || Number(dataToPost.order_seq) === 1"
          @click="decreaseOrder(dataToPost.id)"
          class="btn btn-primary ml-4"
          v-if="selected_slider"
        >
          <i class="fa fa-chevron-up p-0"></i>
        </button>
        <button
          :disabled="
            loading_reorder || sliders.length === Number(dataToPost.order_seq)
          "
          @click="increaseOrder(dataToPost.id)"
          class="btn btn-primary ml-4"
          v-if="selected_slider"
        >
          <i class="fa fa-chevron-down p-0"></i>
        </button>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Nama slider</label>
            <input
              class="form-control form-control-solid"
              v-model="dataToPost.name"
              type="text"
            />
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="font-weight-bolder" for="">Action URL</label>
            <input
              class="form-control form-control-solid"
              v-model="dataToPost.url"
              type="text"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">
              Gambar (1200 x 443)
            </label>
            <UploadInput
              directory="sliders"
              :encrypt="true"
              :overwrite="false"
              v-model="dataToPost.background"
            />
            <a
              :href="dataToPost.background"
              class="d-block text-center"
              target="_blank"
            >
              <img class="img-fluid mt-4" :src="dataToPost.background" />
            </a>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="font-weight-bolder" for="">
              Gambar Mobile(500 x 650)
            </label>
            <UploadInput
              directory="sliders"
              :encrypt="true"
              :overwrite="false"
              v-model="dataToPost.background_mobile"
            />
            <a :href="dataToPost.background" target="_blank">
              <img
                class="img-fluid mt-4"
                :src="dataToPost.background_mobile"
                style="max-height: 200px;"
              />
            </a>
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
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
@Component({
  components: { UploadInput, SelectData, Editor, VueSlickCarousel },
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
  loading_reorder = false;
  selected_slider = '';
  dataToPost = {
    id: '',
    section_id: '',
    name: '',
    url: '',
    button_label: '',
    content: '',
    background: '',
    background_mobile: '',
    order_seq: ''
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
    this.dataToPost.order_seq = '';
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
      this.dataToPost.order_seq = filteredSlider.order_seq;
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

  async decreaseOrder(id: string) {
    this.loading_get_sliders = true;
    this.loading_reorder = true;
    await axios.put('/sliders/increase-order/' + id);
    await this.getSliders();
    await this.onSliderSelected(this.selected_slider);
    this.loading_reorder = false;
    this.loading_get_sliders = false;
  }

  async increaseOrder(id: string) {
    this.loading_get_sliders = true;
    this.loading_reorder = true;
    await axios.put('/sliders/decrease-order/' + id);
    await this.getSliders();
    await this.onSliderSelected(this.selected_slider);
    this.loading_reorder = false;
    this.loading_get_sliders = false;
  }

  async deleteSlider() {
    this.$swal({
      title: 'Apakah anda yakin ingin menghapus?',
      text: 'Anda tidak dapat mengembalikan aksi ini',
      showCancelButton: true,
      icon: 'info',
      confirmButtonText: 'Saya mengerti',
      confirmButtonColor: '#03BBB2',
      denyButtonText: `Batalkan`
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
