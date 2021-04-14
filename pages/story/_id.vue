<template>
  <div v-if="story">
    <div class="story-container">
      <div class="the-idea">
        <div class="the-idea-image">
          <img src="/image/The_Idea.png" alt="" />
        </div>
        <div class="the-idea-body">
          <SanityContent :blocks="story.idea" />
        </div>
      </div>

      <div class="story-boards">
        <div class="story-focus">
          <div class="board-nav board-back" @click="() => boardNav(37)">
            <i class="fas fa-chevron-left"></i>
          </div>
          <div class="board-nav board-forward" @click="() => boardNav(39)">
            <i class="fas fa-chevron-right"></i>
          </div>
          <SanityImage
            class="text"
            ref="focused"
            :asset-id="story.imagesGallery[boardIndex].asset._ref"
            auto="format"
          />
          <SanityContent :blocks="story.imagesGallery[boardIndex].caption" />
          <!-- <span class="text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </span> -->
        </div>
        <div class="story-progress" :style="'width:' + progress + '%'"></div>

        <div class="story-thumbs">
          <div
            class="story-thumb"
            v-for="(thumb, index) in story.imagesGallery"
            :key="index"
          >
            <SanityImage
              :asset-id="thumb.asset._ref"
              auto="format"
              :class="{
                'story-thumb-focused': index == boardIndex
              }"
              :id="index"
              @click="focus"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
// import SanityContent from "@nuxtjs/sanity";
// import marked from "marked";
// import "lazysizes";

export default {
  // validate({ params }) {
  //   // Must be a number
  //   return /^\d+$/.test(params.id);
  // },
  data() {
    return {
      // baseUrl: this.$strapi.$http._defaults.prefixUrl,
      story: null,
      boardLen: 0,
      boardIndex: 0
    };
  },
  methods: {
    // mark(md) {
    //   return md ? marked(md) : "";
    // },
    focus(e) {
      this.boardIndex = e.target.id;
      // this.lload();
    },
    // lload() {
    //   this.$refs.focused.classList.remove("lazyloaded");
    //   this.$refs.focused.classList.add("lazyload");
    // },
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
      // this.lload();
    }
  },
  computed: {
    progress() {
      return 100 * ((parseInt(this.boardIndex) + 1) / this.boardLen);
    }
  },
  created() {
    //// lazySizesConfig.preloadAfterLoad = true;
    // console.log(this.$route.params.id);
  },
  async mounted() {
    window.addEventListener("keydown", e => this.boardNav(e.keyCode));
    try {
      this.story = await this.$sanity.fetch(
        groq`*[_type == "story" && slug.current == "${this.$route.params.id}"][0]`
      );
      this.boardLen = await this.story.imagesGallery.length;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style lang="scss">
.text {
  // position: absolute;
  // top: 0;
  // left: 0;
  // bottom: 0;
  // right: 0;
}
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
  // padding-bottom: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  > img {
    // height: 100%;
    margin: auto;
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
  justify-content: space-between;
  align-items: center;

  // flex: 1;
  flex-wrap: wrap;
  // height: 400px;
  width: 100%;
  // flex-basis: 400px;

  // &:after {
  //   content: "";
  //   flex: auto;
  // }
}
.story-thumb {
  // background-color: grey;
  // max-height: 100px;
  // max-width: 100px;
  margin: 5px 5px 0 0;
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
