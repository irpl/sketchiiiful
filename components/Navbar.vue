<template>
  <header class="navbar">
    <div class="content-wrapper">
      <nuxt-link to="/">
        <div class="nav-logo">
          <img src="/image/Signature.png" alt="" />
          <!-- <div class="nav-title">sketchiiiful</div> -->
          <!-- <div class="nav-subtitle">Sean Rhoden</div> -->
        </div>
      </nuxt-link>
      <div class="navs">
        <div
          class="nav-btn"
          :class="{ 'nav-active': currentRoute === 'index' }"
        >
          <nuxt-link to="/">
            Home
          </nuxt-link>
        </div>

        <div
          class="nav-btn"
          :class="{
            'nav-active':
              currentRoute === 'comics' || currentRoute === 'comics-id'
          }"
        >
          <nuxt-link to="/comics">
            Comics & Illustrations
          </nuxt-link>
        </div>
        <div
          class="nav-btn"
          :class="{ 'nav-active': currentRoute === 'about' }"
        >
          <nuxt-link to="/about">
            About
          </nuxt-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  // created() {
  //   console.log(this.$route.name);
  // },
  computed: {
    currentRoute() {
      return this.$route.name;
    }
  }
};
</script>

<style lang="scss">
.nav-logo {
  display: flex;
  justify-content: center;
  > img {
    height: 100px;
  }
}
a {
  text-decoration: none;
}
.navbar {
  padding: 2rem 20px;
  /* max-width: 630px; */
  color: floralwhite;
  margin: 0 auto;
}
.navs {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.nav-btn {
  height: 80%;
  margin: 0 1.5rem;
  padding: 0.5em;
  text-align: center;
  > a {
    color: whitesmoke;
  }
}
@media only screen and (max-width: 768px) {
  .nav-btn {
    // margin-left: unset;
    padding: 0.5em;
  }
  .navs {
    padding-top: 12px;
  }
}
.nav-active {
  background-color: whitesmoke;
  border-radius: 4px;
  > a {
    color: black;
  }
  /* text-decoration: underline; */
  /* font-weight: 700; */
  // padding: 0.5em;
}
.nav-title {
  display: block;
  font-weight: 300;
  font-size: 1.2rem;
  /* color: #35495e; */
  color: floralwhite;
  letter-spacing: 1px;
}
.nav-subtitle {
  font-weight: 300;
  font-size: 0.9rem;
  /* color: #526488; */
  color: floralwhite;
  word-spacing: 5px;
}
.content-wrapper {
  margin: 0 auto;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
@media only screen and (max-width: 600px) {
  .content-wrapper {
    display: block;
  }
}
</style>
