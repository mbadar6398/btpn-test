<template>
  <div class="container" style="min-height: 620px;">
    <div class="row" style="min-height: 620px;">
      <div class="col-12" style="min-height: 620px;">
        <div
          class="error error-5 d-flex flex-row-fluid bgi-size-cover bgi-position-center"
          style="background-image: url(/media/error/bg5.jpg); height: 100%;"
        >
          <!--begin::Content-->
          <div
            class="container d-flex flex-row-fluid flex-column justify-content-md-center p-12"
          >
            <div class="row">
              <div class="col-7">
                <h1
                  class="error-title font-weight-boldest display-4 text-primary mt-10 mt-md-0 mb-2"
                >
                  Error 404!
                </h1>
                <p class="font-weight-boldest text-dark-70 display-3">
                  Page is not found
                </p>
                <p class="font-size-h3">
                  Sorry, page you requested is not found. Please make sure you
                  request the right url. You can also contact developer to help
                  you
                </p>
              </div>
            </div>
          </div>
          <!--end::Content-->
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
export default class NotFound extends Vue {}
</script>
