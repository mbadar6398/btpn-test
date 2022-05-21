<template>
  <button
    @click="process()"
    :disabled="loading"
    :class="[
      variant ? `btn-${variant} ` : 'btn-primary ',
      size ? `btn-${size} ` : ''
    ]"
    class="btn btn-block font-weight-bolder"
  >
    <div v-if="!loading">
      <i :class="icon ? icon : 'la la-save'"></i>
      {{ label }}
    </div>

    <div class="d-flex align-items-center justify-content-center" v-else>
      <span
        class="spinner spinner-track spinner-primary spinner-sm mr-6"
      ></span>
      <span class="ml-2">Memuat...</span>
    </div>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Editor from '@tinymce/tinymce-vue';

@Component({
  components: { Editor },
  computed: {}
})
export default class ButtonProcess extends Vue {
  @Prop(Boolean) readonly loading: boolean;
  @Prop(String) readonly label: string;
  @Prop(String) readonly icon: string;
  @Prop(String) readonly size: string;
  @Prop(String) readonly variant: string;

  process() {
    this.$emit('process');
  }
}
</script>
