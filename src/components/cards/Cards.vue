<template>
  <div class="card card-custom ">
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-primary">
          Cards
        </span>
        <span class="text-muted mt-1 font-weight-bold font-size-sm">
          Fill form below to update section information
        </span>
      </h3>
      <div class="card-toolbar">
        <ul class="nav nav-pills nav-pills-sm nav-dark-75">
          <li class="nav-item mr-4">
            <button
              v-b-modal.modal-add-card
              class="btn btn-primary btn-block btn-sm font-weight-bolder"
            >
              <div>
                <i class="la la-plus"></i>
                New card
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="card-body border-0 pt-0">
      <div class="row mx-0" v-if="!loading_get_cards">
        <div class="col-4 mb-8" v-for="(item, index) in cards" :key="item.id">
          <div class="text-center">
            <img
              v-if="item.image"
              class="img-fluid"
              style="height: 180px; object-fit: cover;"
              :src="item.image"
              alt=""
            />
          </div>
          <div class="mt-4 text-center">
            <p
              class="font-weight-bolder font-size-h5 text-primary mb-2 elipsis-1"
            >
              {{ item.title }}
            </p>
            <p class="text-dark-50 elipsis-2">
              {{ item.description }}
            </p>
            <a
              :href="item.file"
              target="_blank"
              v-if="item.file"
              class="text-success d-block mb-8 font-weight-bold"
            >
              Download
            </a>
            <div class="d-flex justify-content-between">
              <button
                @click="decreaseOrder(item.id)"
                :disabled="index === 0"
                class="btn btn-icon btn-light-primary btn-circle mr-4"
              >
                <i class="fa fa-arrow-left"></i>
              </button>
              <button
                @click="selected_card = item.id"
                v-b-modal.modal-update-card
                class="btn btn-icon btn-light-success btn-circle mr-4"
              >
                <i class="flaticon2-pen"></i>
              </button>
              <button
                @click="deleteCard(item.id)"
                class="btn btn-icon btn-light-danger btn-circle mr-4"
              >
                <i class="flaticon2-trash"></i>
              </button>
              <button
                @click="increaseOrder(item.id)"
                :disabled="index === cards.length - 1"
                class="btn btn-icon btn-light-primary btn-circle mr-4"
              >
                <i class="fa fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div
          class="col-12 col-md-12 col-lg-6 col-xl-4 mb-8"
          v-for="index in 6"
          :key="index"
        >
          <content-placeholders :rounded="true">
            <content-placeholders-img style="height: 280px;" />
            <content-placeholders-heading />
            <content-placeholders-text :lines="2" />
          </content-placeholders>
        </div>
      </div>
    </div>
    <AddModal
      :configuration="configuration"
      :selected_section="selected_section"
      @refresh="getCards"
    />
    <UpdateModal
      :selected_section="selected_section"
      :selected_card="selected_card"
      @refresh="getCards"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import UploadInput from '@/components/UploadInput/UploadInput.vue';
import SelectData from '@/components/SelectData.vue';
import MainConfig from '@/config/config';
import axios from 'axios';
import AddModal from './AddModal.vue';
import UpdateModal from './UpdateModal.vue';
@Component({
  components: { UploadInput, SelectData, AddModal, UpdateModal },
  computed: {}
})
export default class Cards extends Vue {
  @Prop(Object) selected_section: any;
  @Prop(Object) configuration: any;
  mainconfig = MainConfig;
  loading_get_cards = false;
  loading_process = false;
  cards = [];
  selected_card = '';

  @Watch('selected_section', { immediate: false, deep: false })
  async onSelectedSectionChanged() {
    this.getCards();
  }

  mounted() {
    this.getCards();
  }

  async getCards() {
    this.loading_get_cards = true;
    const { data } = await axios.get(
      '/cards/get?section_id=' + this.selected_section.id
    );
    this.cards = data.data;
    this.loading_get_cards = false;
  }

  deleteCard(id: string) {
    this.$swal({
      title: 'Are you sure want to delete this card?',
      text: 'Your action could not be reverted',
      showCancelButton: true,
      icon: 'info',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#03BBB2',
      denyButtonText: `Cancel`
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.loading_get_cards = true;
        await axios.delete('/cards/delete/' + id);
        this.getCards();
      }
    });
  }

  async decreaseOrder(id: string) {
    this.loading_get_cards = true;
    await axios.put('/cards/increase-order/' + id);
    await this.getCards();
  }

  async increaseOrder(id: string) {
    this.loading_get_cards = true;
    await axios.put('/cards/decrease-order/' + id);
    await this.getCards();
  }
}
</script>
