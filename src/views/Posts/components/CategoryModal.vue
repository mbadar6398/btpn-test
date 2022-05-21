<template>
  <b-modal
    id="modal-post-category"
    hide-footer
    title="Kategori artikel"
    @hide="cancelEditing()"
    @shown="onModalShown"
  >
    <div class="row">
      <!-- Insert form -->
      <div class="col-12" v-show="!isEditing">
        <div class="form-group  d-flex align-items-end">
          <div style="flex: 1;">
            <label class="font-weight-bolder" for="">
              Buat kategori baru
            </label>
            <input
              v-model="insertValue"
              type="text"
              class="form-control form-control-solid"
            />
          </div>

          <button
            id="kt_login_signin_submit"
            class="btn btn-primary ml-4"
            @click="insertCategory"
            :disabled="insertLoading"
          >
            <div v-if="!insertLoading">
              <span class="font-weight-bolder">
                <i class="fa fa-plus"></i>
                Buat
              </span>
            </div>
            <div
              class="d-flex align-items-center justify-content-center"
              v-else
            >
              <span
                class="spinner spinner-track spinner-primary spinner-sm mr-8"
              ></span>
              Memuat...
            </div>
          </button>
        </div>
      </div>

      <!-- Update form -->
      <div class="col-12" v-show="isEditing">
        <div class="form-group  d-flex align-items-end">
          <div style="flex: 1;">
            <label class="font-weight-bolder" for="">Nama kategori</label>
            <input
              ref="updateInput"
              type="text"
              class="form-control form-control-solid"
              v-model="updateValue"
            />
          </div>
          <button
            @click="updateCategory"
            :disabled="updateLoading"
            class="btn btn-success ml-4"
          >
            <div v-if="updateLoading">
              <span
                class="spinner spinner-track spinner-success spinner-sm mr-8"
              ></span>
              Memuat...
            </div>
            <span v-else>
              Simpan
            </span>
          </button>
          <button
            @click="cancelEditing"
            type="button"
            class="btn btn-secondary ml-4"
          >
            Batalkan
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="col-12">
        <div
          class="d-flex align-items-center flex-column"
          style="max-height: 280px; overflow-y: auto;"
        >
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nama</th>
                <th class="text-right" scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody v-if="loading">
              <tr>
                <td colspan="2" class="text-center">Memuat...</td>
              </tr>
            </tbody>
            <tbody v-else-if="failed">
              <tr>
                <td colspan="2" class="text-center">
                  Gagal mendapatkan data,
                  <span
                    @click="getCategories"
                    class="text-danger font-weight-bolder cursor-pointer"
                  >
                    Coba lagi
                  </span>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td style="padding: 1.25rem .75rem">
                  <span>Uncategorized</span>
                </td>
                <td class="text-right"></td>
              </tr>
              <tr v-for="item in categories" :key="item.id">
                <td>
                  <span>{{ item.name }}</span>
                </td>
                <td class="text-right">
                  <button
                    style="border: 0;"
                    @click="selectCategory(item)"
                    class="btn btn-sm btn-success py-2 px-4 mr-4"
                  >
                    <span class="d-inline-block">
                      <i class="la la-pencil text-white m-0 p-0"></i>
                    </span>
                  </button>
                  <button
                    style="border: 0;"
                    :disabled="deleteLoading"
                    @click="deleteCategory(item.id)"
                    class="btn btn-sm btn-danger py-2 px-4"
                  >
                    <span class="d-inline-block">
                      <i class="la la-trash text-white m-0 p-0"></i>
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import axios from 'axios';

interface CategoryTypes {
  id: string;
  name: string;
}

@Component({
  components: {},
  computed: {}
})
export default class PostCategoryModal extends Vue {
  @Prop(String) readonly selectedCategoryId!: string;
  loading = true;
  failed = false;
  categories: any = [];
  isEditing = false;
  editedCategory: any = null;
  updateValue = '';
  insertValue = '';
  insertLoading = false;
  updateLoading = false;
  deleteLoading = false;

  onModalShown() {
    this.getCategories();
  }

  async getCategories() {
    try {
      this.loading = true;
      this.failed = false;
      const category = await axios.get('/posts/get-category');
      this.categories = category.data.data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.failed = true;
    }
  }

  selectCategory(item: CategoryTypes) {
    const elem: HTMLElement = this.$refs.updateInput as HTMLElement;
    this.isEditing = true;
    this.editedCategory = item.id;
    this.updateValue = item.name;
    setTimeout(() => {
      elem.focus();
    }, 500);
  }

  cancelEditing() {
    this.isEditing = false;
    this.editedCategory = null;
    this.insertValue = '';
  }

  async insertCategory() {
    if (this.insertValue !== '') {
      try {
        this.insertLoading = true;
        await axios.post('/posts/insert-category', {
          name: this.insertValue
        });
        this.getCategories();
        this.insertLoading = false;
        this.insertValue = '';
      } catch (error) {
        this.insertLoading = false;
      }
    }
  }
  deleteCategory(id: string) {
    this.cancelEditing();
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
        if (this.selectedCategoryId !== id) {
          try {
            this.deleteLoading = true;
            await axios.delete('/posts/delete-category/' + id);
            this.deleteLoading = false;
            this.getCategories();
          } catch (error) {
            this.deleteLoading = false;
          }
        } else {
          this.$swal(
            'Failed',
            'Category is selected on current article',
            'error'
          );
        }
      }
    });
  }
  async updateCategory() {
    if (this.updateValue !== '') {
      try {
        this.updateLoading = true;
        await axios.put('/posts/update-category/' + this.editedCategory, {
          id: this.editedCategory,
          name: this.updateValue
        });
        this.updateLoading = false;
        this.getCategories();
      } catch (error) {
        this.updateLoading = false;
      }
    }
  }
}
</script>
