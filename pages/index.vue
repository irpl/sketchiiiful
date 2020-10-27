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
        rowHeight: 350,
        lastRow: "nojustify",
        margins: 20,
        cssAnimation: false
      });
    });
  }
};
</script>
