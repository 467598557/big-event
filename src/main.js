import Vue from 'vue'
import App from './App'
import router from './router'
import {Input, Radio, RadioGroup, RadioButton, Button, Loading, MessageBox, Message} from 'element-ui';
import "./assets/less/reset.less";
import "./assets/less/common.less";
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Button);
Vue.use(RadioButton);
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Loading.install(Vue);
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
