<template>
  <div v-if="story">
    <div class="story-container">
      <div class="the-idea">
        <div class="the-idea-image">
          <img :src="baseUrl + '/uploads/The_Idea_bd2f4bbfc5.png'" alt="" />
        </div>
        <div class="the-idea-body" v-html="mark(story.idea)"></div>
      </div>

      <div class="story-boards">
        <div class="story-focus">
          <img
            ref="focused"
            class="lazyload lazy-blur"
            :data-src="baseUrl + story.boards[boardIndex].url"
            :src="baseUrl + story.boards[boardIndex].formats.thumbnail.url"
            alt=""
          />

          <div class="story-progress" :style="'width:' + progress + '%'"></div>
        </div>

        <div class="story-thumbs">
          <div
            class="story-thumb"
            v-for="(thumb, index) in story.boards"
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
    window.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case 39:
          this.boardIndex =
            this.boardIndex == this.boardLen - 1 ? 0 : this.boardIndex + 1;
          this.lload();
          break;

        case 37:
          this.boardIndex =
            this.boardIndex == 0 ? this.boardLen - 1 : this.boardIndex - 1;
          this.lload();
          break;

        default:
          break;
      }
    });
    try {
      this.story = await this.$strapi.findOne("boards", this.$route.params.id);
      this.boardLen = await this.story.boards.length;
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
  // height: 600px;
  // width: 600px;
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
.the-idea-body p {
  font-size: 1.2em;
}
</style>
