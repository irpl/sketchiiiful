<template>
  <div v-if="comic">
    <div class="comic-container">
      <div class="comic-focus">
        <img
          ref="focused"
          class="lazyload lazy-blur"
          :data-src="baseUrl + comic.images[comicIndex].url"
          :src="baseUrl + comic.images[comicIndex].formats.thumbnail.url"
          alt=""
        />
      </div>
      <div v-if="comicLen > 1" class="comic-thumbs">
        <div
          class="comic-thumb"
          v-for="(comic, index) in comic.images"
          :key="index"
        >
          <img
            :class="{ 'comic-thumb-focused': index == comicIndex }"
            v-if="comic.mime.split('/')[0] == 'image'"
            :id="index"
            @click="focus"
            :src="baseUrl + comic.formats.thumbnail.url"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "lazysizes";

export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  data() {
    return {
      baseUrl: this.$strapi.$http._defaults.prefixUrl,
      comic: null,
      comicLen: 0,
      comicIndex: 0
    };
  },
  methods: {
    focus(e) {
      this.comicIndex = e.target.id;
      this.lload();
    },
    lload() {
      this.$refs.focused.classList.remove("lazyloaded");
      this.$refs.focused.classList.add("lazyload");
    }
  },
  async mounted() {
    console.log(this.$route.params.id);
    window.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case 39:
          this.comicIndex =
            this.comicIndex == this.comicLen - 1 ? 0 : this.comicIndex + 1;
          this.lload();
          break;

        case 37:
          this.comicIndex =
            this.comicIndex == 0 ? this.comicLen - 1 : this.comicIndex - 1;
          this.lload();
          break;

        default:
          break;
      }
    });
    try {
      this.comic = await this.$strapi.$comics.findOne(this.$route.params.id);
      this.comicLen = await this.comic.images.length;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style lang="scss">
.comic-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  img {
    height: 80vh;
  }
}
.comic-thumb-focused {
  outline: 2px solid rgb(253, 198, 137);
}
.comic-thumbs {
  display: flex;
  flex-wrap: wrap;
  // width: 100%;
  // width: 300px;
}
.comic-thumb {
  margin: 5px;
  flex-shrink: 1;
  flex-basis: 10%;
  flex-grow: 0;
  img {
    // width: 100%;
    height: auto;
  }
}
</style>
