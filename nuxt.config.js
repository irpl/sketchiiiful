import pkg from "./package";

export default {
  mode: "universal",
  server: {
    host: "0.0.0.0" // default: localhost
  },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "/css/justifiedGallery.min.css"
      }
    ],
    script: [
      {
        src: "/js/jquery-3.5.1.min.js",
        type: "text/javascript"
      },
      { src: "/js/jquery.justifiedGallery.min.js", type: "text/javascript" }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/strapi"],
  strapi: {
    entities: ["boards", "about"],
    url: process.env.API_BASE_URL
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
