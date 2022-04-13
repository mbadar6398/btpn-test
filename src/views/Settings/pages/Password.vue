<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card card-custom">
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label font-weight-bolder text-primary">
                Password
              </span>
              <span class="text-dark-50 mt-2 font-weight-bold font-size-sm">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Distinctio, nulla?
              </span>
            </h3>
          </div>
          <div class="card-body">
            <form action="">
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label class="font-weight-bold" for="">
                      New Password
                    </label>
                    <input
                      type="password"
                      class="form-control form-control-solid"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label class="font-weight-bold" for="">
                      Password confirmation
                    </label>
                    <input
                      type="password"
                      class="form-control form-control-solid"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group d-flex justify-content-end">
                    <button
                      class="btn font-weight-bold btn-primary d-flex align-items-center"
                    >
                      <i class="la la-save icon-lg mr-1"></i>
                      Save changes
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
@Component({
  components: {},
  computed: {}
})
export default class PasswordSettings extends Vue {}
</script>
