import Vue from 'vue'
import App from './App'
import router from './router'
import {Input, Radio, RadioGroup, RadioButton, Button, Loading, MessageBox, Message, MenuItem, Menu} from 'element-ui';
import "./assets/less/reset.less";
import "./assets/less/common.less";
import 'element-ui/lib/theme-chalk/index.css'
import SvgIcon from './components/SvgIcon';

Vue.config.productionTip = false

Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Button);
Vue.use(RadioButton);
Vue.use(SvgIcon);
Vue.use(MenuItem);
Vue.use(Menu);
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Loading.install(Vue);
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
