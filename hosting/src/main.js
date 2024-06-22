import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";

const customTheme = {
  dark: false,
  colors: {
    primary: "#CC0C0C",
    secondary: "#FFC832",
  },
};

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme,
    },
  },
});

createApp(App).use(router).use(vuetify).mount("#app");
