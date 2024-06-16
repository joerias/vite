import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { TUIComponents, TUIChatKit } from "./TUIKit";
const app = createApp(App);

// TUIChatKit add TUIComponents
TUIChatKit.components(TUIComponents, app);
// TUIChatKit init
TUIChatKit.init();
// TUICore login

app.mount("#app");
