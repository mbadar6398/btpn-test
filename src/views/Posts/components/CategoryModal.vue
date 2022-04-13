<template>
  <b-modal
    id="modal-post-category"
    hide-footer
    title="Post category"
    @hide="cancelEditing()"
  >
    <div class="row">
      <!-- Insert form -->
      <div class="col-12" v-show="!isEditing">
        <div class="form-group  d-flex align-items-end">
          <div style="flex: 1;">
            <label class="font-weight-bolder" for="">
              Create new category
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
              <span>
                Add
              </span>
            </div>
            <div
              class="d-flex align-items-center justify-content-center"
              v-else
            >
              <span
                class="spinner spinner-track spinner-primary spinner-sm mr-8"
              ></span>
              Loading...
            </div>
          </button>
        </div>
      </div>

      <!-- Update form -->
      <div class="col-12" v-show="isEditing">
        <div class="form-group  d-flex align-items-end">
          <div style="flex: 1;">
            <label class="font-weight-bolder" for="">Update category</label>
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
              Loading...
            </div>
            <span v-else>
              Save
            </span>
          </button>
          <button
            @click="cancelEditing"
            type="button"
            class="btn btn-secondary ml-4"
          >
            Cancel
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
                <th scope="col">Name</th>
                <th class="text-right" scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
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
  get categories() {
    return this.$store.getters['posts/CATEGORIES'];
  }
  isEditing = false;
  editedCategory: any = null;
  updateValue = '';
  insertValue = '';
  insertLoading = false;
  updateLoading = false;
  deleteLoading = false;

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

  insertCategory() {
    if (this.insertValue !== '') {
      this.insertLoading = true;
      this.$store
        .dispatch('posts/INSERT_NEW_CATEGORY', {
          name: this.insertValue
        })
        .finally(() => {
          this.insertLoading = false;
          this.insertValue = '';
        });
    }
  }
  deleteCategory(id: string) {
    this.cancelEditing();
    this.$swal({
      title: 'Are you sure want to delete this category?',
      text: 'Every posts using this category would be uncategorized',
      showCancelButton: true,
      icon: 'info',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#03BBB2',
      denyButtonText: `Cancel`
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.selectedCategoryId !== id) {
          this.deleteLoading = true;
          this.$store.dispatch('posts/DELETE_CATEGORY', id).finally(() => {
            this.deleteLoading = false;
          });
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
  updateCategory() {
    if (this.updateValue !== '') {
      this.updateLoading = true;
      setTimeout(() => {
        this.$store
          .dispatch('posts/UPDATE_CATEGORY', {
            id: this.editedCategory,
            name: this.updateValue
          })
          .finally(() => {
            this.updateLoading = false;
          });
      }, 2000);
    }
  }
}
</script>
