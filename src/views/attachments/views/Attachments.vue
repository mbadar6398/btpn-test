<template>
  <div class="card">
    <div class="card-body px-8">
      <div>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h4 class="mb-0 font-weight-bolder text-primary">
              Attachments
            </h4>
            <p class="mb-0">
              List of attachments
            </p>
          </div>
          <button
            v-b-modal.modal-upload
            class="btn btn-primary btn-sm font-weight-bolder"
          >
            <i class="la la-upload"></i>
            Upload file
          </button>
        </div>
        <table class="table table-striped mt-4">
          <thead class="bg-dark text-white">
            <tr>
              <th>Name</th>
              <th>Visibility</th>
              <th class="text-center" width="30%">Actions</th>
            </tr>
          </thead>
          <tbody v-if="!fetchLoading">
            <tr v-for="item in data" :key="item.id">
              <td>{{ item.file_name }}</td>
              <td>
                <span
                  v-if="item.visibility === 'Public'"
                  class="badge badge-success"
                >
                  {{ item.visibility }}
                </span>
                <span
                  v-else-if="item.visibility === 'Private'"
                  class="badge badge-primary"
                >
                  {{ item.visibility }}
                </span>
                <span v-else class="badge badge-danger">
                  {{ item.visibility }}
                </span>
              </td>
              <td class="text-center">
                <button
                  @click="selected_attachment = item.id"
                  v-b-modal.modal-update
                  class="btn btn-sm btn-transparent p-0 mr-4"
                >
                  <i class="fa fa-pencil-alt text-success"></i>
                </button>
                <button
                  :disabled="actionLoading"
                  @click="deleteAttachments(item.id)"
                  class="btn btn-sm btn-transparent p-0 mr-4"
                >
                  <i class="fa fa-trash-alt text-danger"></i>
                </button>
                <button
                  @click="decreaseOrder(item.id)"
                  :disabled="
                    actionLoading || Number(item.order_seq) === data.length
                  "
                  class="btn btn-sm btn-transparent p-0 mr-4"
                >
                  <i class="fa fa-chevron-up text-primary"></i>
                </button>
                <button
                  @click="increaseOrder(item.id)"
                  :disabled="actionLoading || Number(item.order_seq) === 1"
                  class="btn btn-sm btn-transparent p-0"
                >
                  <i class="fa fa-chevron-down text-primary"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td class="text-center" colspan="3">Loading...</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <b-pagination
          @change="onPageChange"
          :total-rows="total_rows"
          :per-page="6"
          v-model="page"
          aria-controls="itemList"
          align="center"
        ></b-pagination>
      </div>
    </div>
    <AddAttachmentModal
      @refresh="fetchAttachments"
      :type="type"
      :parent_id="parent_id"
    />
    <UpdateAttachmentModal
      @refresh="fetchAttachments"
      :type="type"
      :parent_id="parent_id"
      :selected_attachment="selected_attachment"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import AddAttachmentModal from '../components/AddAttachmentModal.vue';
import UpdateAttachmentModal from '../components/UpdateAttachmentModal.vue';
import axios from 'axios';

@Component({
  components: { AddAttachmentModal, UpdateAttachmentModal }
})
export default class AddInformasiModal extends Vue {
  @Prop(String) readonly type: string;
  @Prop(String) readonly parent_id: string;

  data = [];
  total_rows = 0;
  page = 1;
  limit = 10;
  selected_attachment = null;

  fetchLoading = false;
  actionLoading = false;

  mounted() {
    this.fetchAttachments();
  }

  async fetchAttachments() {
    this.fetchLoading = true;
    const { data } = await axios.get(
      'attachments/get?limit=' +
        this.limit +
        '&page=' +
        this.page +
        '&parent_id=' +
        this.parent_id
    );
    this.data = data.data.data;
    this.total_rows = data.data.pagination.total_rows;
    this.fetchLoading = false;
  }

  onPageChange(selectedPage: number) {
    this.page = selectedPage;
    this.fetchAttachments();
  }

  async deleteAttachments(id: string) {
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
          this.actionLoading = true;
          await axios.delete('/attachments/delete/' + id);
          this.fetchAttachments();
          this.actionLoading = false;
        } catch (error) {
          this.actionLoading = false;
        }
      }
    });
  }
  async increaseOrder(id: string) {
    this.actionLoading = true;
    await axios.put('attachments/increase-order/' + id);
    this.fetchAttachments();
    this.actionLoading = false;
  }

  async decreaseOrder(id: string) {
    this.actionLoading = true;
    await axios.put('attachments/decrease-order/' + id);
    this.fetchAttachments();
    this.actionLoading = false;
  }
}
</script>
