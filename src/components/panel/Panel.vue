<template>
  <div class="panel">
    <!-- :Header -->
    <div class="panel__header align-items-center">
      <!-- ::Information -->
      <div class="panel__information">
        <div class="panel__title text-primary" v-text="title" />
        <div class="panel__subtitle" v-text="subtitle" />
      </div>

      <!-- ::Toolbar -->
      <div class="panel__toolbar">
        <slot name="toolbar"></slot>
      </div>
    </div>

    <!-- :Body -->
    <div class="panel__body">
      <slot name="body"></slot>
    </div>

    <!-- Footer -->

    <div class="panel__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  background: #ffffff;
  border-radius: 8px;

  &__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 30px 30px 15px 30px;
  }

  &__body {
    padding: 15px 30px 30px 30px;
    // margin-top: 10px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px 30px 30px;
    width: 100%;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: #131628;
    letter-spacing: 0.5px;
  }

  &__subtitle {
    margin-top: 2px;
    color: #9f9fac;
    font-weight: 500;
    font-size: 12px;
    letter-spacing: 0.5px;
    margin-bottom: 0;
  }
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {},
  computed: {}
})
export default class Panel extends Vue {
  @Prop(String) readonly title: string;
  @Prop(String) readonly subtitle: string;
}
</script>
