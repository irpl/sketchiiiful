<template>
  <section class="container">
    <div class="stories-container">
      <div class="stories-thumbs" v-for="comic in comics" :key="comic.id">
        <nuxt-link :to="'comics/' + comic.id">
          <img
            :src="
              baseUrl +
                comic.comic[parseInt(comic.thumb) - 1 || 0].formats.medium.url
            "
            alt=""
          />
          <div class="overlay">
            <span>{{ comic.title }}</span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: this.$strapi.$http._defaults.prefixUrl,
      comics: []
    };
  },
  async mounted() {
    // console.log(process.env.baseUrl);
    // console.log(this.$strapi.$http._defaults.prefixUrl);
    try {
      this.comics = await this.$strapi.find("comics");
    } catch (error) {
      console.error(error);
    }
    this.$nextTick(() => {
      $(".stories-container").justifiedGallery({
        rowHeight: 350,
        lastRow: "nojustify",
        margins: 20
      });
    });
  }
};
</script>
