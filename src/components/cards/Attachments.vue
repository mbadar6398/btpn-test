<template>
  <div class="attachments">
    <div class="d-flex justify-content-between">
      <div>
        <h4 class="text-success">Attachments</h4>
        <p>You can attach multiple files on cards</p>
      </div>
      <div>
        <button class="btn btn-sm btn-success font-weight-bolder">
          <i class="fa fa-plus"></i>
          Add attachment
        </button>
      </div>
    </div>
    <table class="table table-striped">
      <thead class="bg-dark text-white">
        <tr>
          <th>File name</th>
          <th style="width: 30%;" class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in 10" :key="item">
          <td>Tester bla bla</td>
          <td class="text-center">
            <button class="btn btn-sm p-0 btn-transparent mr-4">
              <i class="fa fa-download text-success"></i>
            </button>
            <button class="btn btn-sm p-0 btn-transparent mr-4">
              <i class="fa fa-chevron-up text-primary"></i>
            </button>
            <button class="btn btn-sm p-0 btn-transparent mr-4">
              <i class="fa fa-chevron-down text-primary"></i>
            </button>
            <button class="btn btn-sm p-0 btn-transparent">
              <i class="fa fa-trash-alt text-danger"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
