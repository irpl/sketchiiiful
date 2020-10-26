<template>
  <section class="container">
    <div class="stories-container">
      <div
        class="stories-thumbs"
        v-for="collection in collection"
        :key="collection.id"
      >
        <nuxt-link :to="api + '/' + collection.id">
          <img
            :src="
              baseUrl +
                collection.images[parseInt(collection.thumb) - 1 || 0].formats
                  .medium.url
            "
            alt=""
          />
          <div class="overlay">
            <span>{{ collection.title }}</span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["collection", "api"],
  data() {
    return {
      baseUrl: this.$strapi.$http._defaults.prefixUrl
    };
  },
  created() {
    console.log(this.$props.api);
  }
};
</script>
