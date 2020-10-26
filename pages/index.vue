<template>
  <grid :collection="stories" api="story" />
</template>

<script>
import Grid from "~/components/Grid.vue";
export default {
  components: {
    Grid
  },
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
      this.stories = await this.$strapi.$stories.find();
    } catch (error) {
      console.error(error);
    }
    this.$nextTick(() => {
      $(".stories-container").justifiedGallery({
        rowHeight: 250,
        lastRow: "nojustify",
        margins: 20,
        cssAnimation: false
      });
    });
  }
};
</script>

<style lang="scss">
.story-container > img {
  // height: 400px;
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
