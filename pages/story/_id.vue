<template>
  <div v-if="story">
    <div class="story-container">
      <div class="the-idea">
        <div class="the-idea-image">
          <img src="/image/The_Idea.png" alt="" />
        </div>
        <div class="the-idea-body" v-html="mark(story.idea)"></div>
      </div>

      <div class="story-boards">
        <div class="story-focus">
          <div class="board-nav board-back" @click="() => boardNav(37)">
            &lt;
          </div>
          <div class="board-nav board-forward" @click="() => boardNav(39)">
            &gt;
          </div>
          <img
            ref="focused"
            class="lazyload lazy-blur"
            :data-src="baseUrl + story.images[boardIndex].url"
            :src="baseUrl + story.images[boardIndex].formats.thumbnail.url"
            alt=""
          />

          <div class="story-progress" :style="'width:' + progress + '%'"></div>
        </div>

        <div class="story-thumbs">
          <div
            class="story-thumb"
            v-for="(thumb, index) in story.images"
            :key="index"
          >
            <img
              v-if="thumb.mime.split('/')[0] == 'image'"
              :class="{
                'story-thumb-focused': index == boardIndex
              }"
              :id="index"
              @click="focus"
              :src="baseUrl + thumb.formats.thumbnail.url"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import "lazysizes";

export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  data() {
    return {
      baseUrl: this.$strapi.$http._defaults.prefixUrl,
      story: null,
      boardLen: 0,
      boardIndex: 0
    };
  },
  methods: {
    mark(md) {
      return md ? marked(md) : "";
    },
    focus(e) {
      this.boardIndex = e.target.id;
      this.lload();
    },
    lload() {
      this.$refs.focused.classList.remove("lazyloaded");
      this.$refs.focused.classList.add("lazyload");
    },
    boardNav(dir) {
      switch (dir) {
        case 39:
          this.boardIndex =
            this.boardIndex == this.boardLen - 1 ? 0 : this.boardIndex + 1;
          break;

        case 37:
          this.boardIndex =
            this.boardIndex == 0 ? this.boardLen - 1 : this.boardIndex - 1;
          break;
        default:
          break;
      }
      this.lload();
    }
  },
  computed: {
    progress() {
      return 100 * ((parseInt(this.boardIndex) + 1) / this.boardLen);
    }
  },
  created() {
    // lazySizesConfig.preloadAfterLoad = true;
  },
  async mounted() {
    window.addEventListener("keydown", e => this.boardNav(e.keyCode));
    try {
      this.story = await this.$strapi.$stories.findOne(this.$route.params.id);
      this.boardLen = await this.story.images.length;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style lang="scss">
.story-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.story-focus {
  // -webkit-transition: 2s ease-in-out;
  // transition: 2s ease-in-out;
  // height: 600px;
  // width: 600px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  > img {
    // height: 100%;
    width: 100%;
  }
}
.the-idea {
  width: 40%;
  // max-width: 90%;
  // min-width: 600px;
  order: 1;
}
.the-idea-image {
  height: 60px;
  // height: 100%;
  display: flex;
  justify-content: center;
  > img {
    height: 100%;
  }
}
.story-thumbs {
  display: flex;

  // flex: 1;
  flex-wrap: wrap;
  // height: 400px;
  width: 100%;
  // flex-basis: 400px;
}
.story-thumb {
  // background-color: grey;
  // max-height: 100px;
  // max-width: 100px;
  margin: 5px;
  // flex-shrink: 2;
  flex-shrink: 1;
  flex-basis: 8%;
  flex-grow: 0;
  > img {
    width: 100%;
    height: auto;
  }
}
.story-thumb-focused {
  // border: 2px solid whitesmoke;
  outline: 2px solid rgb(253, 198, 137);
}
.story-progress {
  height: 3px;
  width: 0;
  background-color: rgb(253, 198, 137);
  transition: width 0.2s ease-in-out;
  z-index: 1;
}
.story-boards {
  width: 40%;
  order: 0;
}
@media only screen and (max-width: 768px) {
  .story-boards {
    width: 100%;
    margin-bottom: 100px;

    order: 1;
  }
  .the-idea {
    width: 90%;
    margin-bottom: 20px;
    order: 0;
  }
}
.the-idea-body h1 {
  font-size: 48px;
}
p {
  font-size: 1.2em;
}
.board-nav {
  cursor: pointer;
  width: 80px;
  height: 100%;
  opacity: 0;
  color: rgb(253, 198, 137);
  font-size: 48px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  transition: opacity 0.3s ease-in-out;
}
.board-back {
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0)
  );
}
.board-forward {
  right: 0;
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0)
  );
}
.story-focus:hover .board-nav {
  opacity: 1;
}
</style>
