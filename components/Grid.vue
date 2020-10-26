<template>
  <section class="container">
    <div class="stories-container">
      <div class="stories-thumbs" v-for="c in collection" :key="c.id">
        <nuxt-link :to="api + '/' + c.id">
          <img
            :src="
              baseUrl +
                c.images[parseInt(collection.thumb) - 1 || 0].formats.medium.url
            "
            alt=""
          />
          <div class="overlay">
            <span>{{ c.title }}</span>
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
  }
  // created() {
  //   console.log(this.$props.collection);
  // }
};
</script>
