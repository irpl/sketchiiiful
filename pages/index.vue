<template>
  <section class="container">
    <div class="stories-container">
      <div class="stories-thumbs" v-for="story in stories" :key="story.id">
        <nuxt-link :to="'story/' + story.id">
          <img
            :src="
              baseUrl +
                story.boards[parseInt(story.thumb) - 1 || 0].formats.medium.url
            "
            alt=""
          />
          <div class="overlay">
            <span>{{ story.title }}</span>
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
      stories: []
    };
  },
  methods: {
    onclick() {}
  },
  // created() {},
  async mounted() {
    // console.log(process.env.baseUrl);
    // console.log(this.$strapi.$http._defaults.prefixUrl);
    try {
      this.stories = await this.$strapi.find("boards");
    } catch (error) {
      console.error(error);
    }
    this.$nextTick(() => {
      $(".stories-container").justifiedGallery({
        rowHeight: 250,
        lastRow: "nojustify",
        margins: 20
      });
    });
  }
};
</script>

<style lang="scss">
/* .stories-container { */
/* display: flex; */
/* flex-wrap: wrap; */
/* justify-content: center; */
/* } */
// .stories-thumbs {
//   margin: 15px;
//   height: 200px;
// }
.story-container > img {
  height: 400px;
}
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
  font-size: 2rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.2s ease;
  background-color: rgba(0, 0, 0, 0.5);
  &:hover {
    opacity: 1;
  }
}
</style>
