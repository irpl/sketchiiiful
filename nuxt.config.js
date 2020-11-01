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
    // title: pkg.name,
    title: "SRhoden Portfolio",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        // content: pkg.description
        content:
          "As a visual storyteller with a background in sequential art, Sean Rhoden's pre-production storyboards lay the groundwork to make it easier for any production crew to deliver captivating creative content. Check out the portfolio."
      }
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
      { src: "/js/jquery.justifiedGallery.min.js", type: "text/javascript" },
      {
        src: "https://kit.fontawesome.com/f0f1d79673.js",
        crossorigin: "anonymous"
      }
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
    entities: ["stories", "comics", "about"],
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
  },
  buildModules: ["@nuxtjs/netlify-files"],
  netlifyFiles: {
    netlifyToml: {
      redirects: [
        {
          from: "/*",
          to: "/index.html",
          status: 200
        }
      ]
    }
  }
};
