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
<style lang="scss">
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
