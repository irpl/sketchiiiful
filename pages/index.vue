<template>
  <grid :collection="stories" api="story" />
  <!-- <div></div> -->
</template>

<script>
// import Grid from "~/components/Grid.vue";
import { groq } from "@nuxtjs/sanity";

export default {
  // components: {
  // Grid
  // SanityContent
  // },
  data() {
    return { stories: [] };
  },
  // async fetch() {
  // this.stories = await this.$sanity.fetch(groq`*[_type == "story"]`);
  // },
  // data() {
  //   return {
  //     title: "",
  //     baseUrl: this.$strapi.$http._defaults.prefixUrl,
  //     stories: []
  //   };
  // },
  // methods: {
  //   onclick() {}
  // },
  // created() {},
  async mounted() {
    // console.log(process.env.baseUrl);
    // console.log(this.$strapi.$http._defaults.prefixUrl);
    // try {
    //   // this.stories = await this.$strapi.$stories.find();
    this.stories = await this.$sanity.fetch(groq`*[_type == "story"]`);
    // } catch (error) {
    //   console.error(error);
    // }
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
