<template>
  <div>
    <div v-if="about" class="about-container">
      <div class="about-image">
        <img
          class="lazyload lazy-blur"
          :src="baseUrl + about.image.formats.thumbnail.url"
          :data-src="baseUrl + about.image.formats.large.url"
          alt=""
        />
      </div>

      <div class="about-body" v-html="mark(about.body)"></div>
    </div>
    <div class="about-form">
      <div>
        <h1>Contact Me</h1>
      </div>
      <div>
        <h4 style="text-align:center">Tell me something cool!</h4>
      </div>
      <div class="input-container">
        <!-- <div> -->
        <div class="styled-input wide">
          <input type="text" required />
          <label>Name</label>
          <!-- </div> -->
        </div>
        <div class="short-row">
          <div class="styled-input">
            <input type="text" required />
            <label>Email</label>
          </div>
          <!-- </div>
          <div> -->
          <div class="styled-input">
            <input type="text" required />
            <label>Phone Number</label>
          </div>
        </div>
        <div>
          <div class="styled-input wide">
            <textarea required></textarea>
            <label>Message</label>
          </div>
        </div>
        <div>
          <input
            type="submit"
            class="btn-lrg submit-btn"
            value="Send Message"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import "lazysizes";

export default {
  data() {
    return {
      baseUrl: this.$strapi.$http._defaults.prefixUrl,
      about: null
    };
  },
  methods: {
    mark(md) {
      return marked(md);
    }
  },
  async mounted() {
    try {
      this.about = await this.$strapi.find("about");
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss">
.about-container {
  margin: 50px 8rem;
  display: flex;
  flex-wrap: wrap;
  /* max-width: 960px; */
  justify-content: space-evenly;
}
/* .about-container > div { */
/* margin: 0 40px; */
/* } */
// .about-image {
//   /* max-width: 90%; */
// }
.about-form {
  width: 650px;
  margin: 0 auto;
}
.about-image {
  // width: 550px;
  // height: 700px;
  > img {
    height: 700px;
    /* max-width: 90%; */
  }
}
.about-body {
  vertical-align: middle;
  width: 650px;
}
h1 {
  font-family: "Poppins", sans-serif, "arial";
  font-weight: 600;
  font-size: 72px;
  color: whitesmoke;
  text-align: center;
}

h4 {
  font-family: "Roboto", sans-serif, "arial";
  font-weight: 400;
  font-size: 20px;
  color: #9b9b9b;
  line-height: 1.5;
}
@media only screen and (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }
  .about-form {
    width: 100%;
  }
  .about-image {
    // height: unset;
    // width: 90%;
    img {
      height: unset;
      width: 100%;
    }
  }
  .about-container {
    margin: 0 5%;
    > div {
      margin-bottom: 60px;
    }
    /* width: 95%; */
  }
}
/* form */
/* body {
  background-color: #444442;
  padding-top: 85px;
} */

.lazy-blur {
  -webkit-filter: blur(3px);
  filter: blur(3px);
  transition: filter 600ms, -webkit-filter 600ms;
}

.lazy-blur.lazyloaded {
  -webkit-filter: blur(0);
  filter: blur(0);
}

/* contact */
input:focus ~ label,
textarea:focus ~ label,
input:valid ~ label,
textarea:valid ~ label {
  font-size: 0.75em;
  color: #999;
  top: -5px;
  -webkit-transition: all 0.225s ease;
  transition: all 0.225s ease;
}

.styled-input {
  float: left;
  width: 100%;
  margin: 0.45rem 0;
  position: relative;
  border-radius: 4px;
}

.styled-input label {
  color: #999;
  padding: 1.1rem 0px 1rem 30px;
  position: absolute;
  top: 10px;
  left: 0;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
  pointer-events: none;
}

.short-row {
  display: flex;
  justify-content: space-between;
}
.short-row > .styled-input {
  width: 48%;
}
input,
textarea {
  padding: 30px;
  border: 0;
  width: 100%;
  font-size: 1rem;
  background-color: #2d2d2d;
  color: white;
  border-radius: 4px;
}

input:focus,
textarea:focus {
  outline: 0;
}

input:focus ~ span,
textarea:focus ~ span {
  width: 100%;
  -webkit-transition: all 0.075s ease;
  transition: all 0.075s ease;
}

textarea {
  width: 100%;
  min-height: 15em;
}

.input-container {
  /* width: 650px; */
  max-width: 100%;
  margin: 20px auto 25px auto;
  display: flex;
  flex-direction: column;
}

.submit-btn {
  // float: right;
  margin-top: 3px;
  padding: 7px 35px;
  border-radius: 4px;
  /* display: inline-block; */
  background-color: rgb(197, 177, 152);
  color: rgb(24, 24, 24);
  font-size: 18px;
  font-weight: 700;
  // cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.06), 0 2px 10px 0 rgba(0, 0, 0, 0.07);
  /* -webkit-transition: all 300ms ease; */
  /* transition: all 300ms ease; */
}

// .submit-btn:hover {
//   transform: translateY(1px);
//   box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.09);
// }

// @media (max-width: 768px) {
//   .submit-btn {
//     width: 100%;
//     float: none;
//     text-align: center;
//   }
// }

// input[type="checkbox"] + label {
//   color: #ccc;
//   font-style: italic;
// }

// input[type="checkbox"]:checked + label {
//   color: #f00;
//   font-style: normal;
// }
</style>
