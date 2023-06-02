import { createApp } from 'vue'
import { Modal } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './style.css'
import App from './App.vue'
const app = createApp(App);
console.log(app)
/* 会自动注册 Button 下的子组件, 例如 Button.Group */
app.use(Modal).mount('#app');
