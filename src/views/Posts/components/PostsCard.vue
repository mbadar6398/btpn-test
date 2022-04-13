<template>
  <div class="posts-list">
    <div class="posts-list__header">
      <router-link :to="'posts/get/' + data.id">
        <img
          v-show="isImageLoaded"
          @load="loadContent"
          class="posts-list__image"
          :src="imageUrl"
          alt=""
        />
        <content-placeholders v-show="!isImageLoaded" :rounded="true">
          <content-placeholders-img style="height: 280px;" />
        </content-placeholders>
      </router-link>
      <div class="posts-list__buttons">
        <div class="posts-list__label bg-primary mr-2" v-html="categoryName" />
        <div
          href="#"
          class="posts-list__label bg-success"
          v-text="data.status"
        />
      </div>
    </div>
    <div class="posts-list__body">
      <router-link :to="'posts/get/' + data.id">
        <h4 class="posts-list__title" v-text="data.title" />
      </router-link>
      <p class="posts-list__content" v-text="data.title" />
      <div class="posts-list__tags" v-if="data.tags.length > 0">
        <span
          class="posts-list__tags__label"
          v-for="(item, index) in data.tags"
          :key="index"
          v-text="item"
        />
      </div>
    </div>
    <div class="posts-list__footer">
      <span class="posts-list__info">
        <i class="la la-user posts-list__info__icon mr-1"></i>
        <span class="posts-list__info__text">Administrator</span>
      </span>
      <span class="posts-list__info">
        <i class="la la-calendar posts-list__info__icon mr-1"></i>
        <span class="posts-list__info__text" v-text="data.created_date" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { PostTypes } from '../../../interfaces/posts';
@Component({
  components: {},
  computed: {}
})
export default class PostsCard extends Vue {
  @Prop(Object) readonly data: PostTypes | undefined;
  isImageLoaded = false;

  get imageUrl() {
    return this.data?.featured_img
      ? this.data.featured_img
      : 'https://via.placeholder.com/1200x628.png';
  }

  get categoryName() {
    return this.data?.category !== null
      ? this.data?.category.name
      : 'Uncategorized';
  }

  loadContent() {
    this.isImageLoaded = true;
  }
}
</script>
