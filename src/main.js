import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Input, Radio, RadioGroup, RadioButton, Button, Loading, MessageBox, Message, MenuItem, Menu,
    Table, TableColumn, ButtonGroup, Row, Form, FormItem, Checkbox, Dropdown, DropdownItem, DropdownMenu} from 'element-ui';
import "./assets/less/reset.less";
import "./assets/less/common.less";
import 'element-ui/lib/theme-chalk/index.css'
import SvgIcon from './components/SvgIcon';
import {UserManagerPageRoleKey} from "./config";

Vue.config.productionTip = false

Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(RadioButton);
Vue.use(SvgIcon);
Vue.use(MenuItem);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Checkbox);
Vue.use(FormItem);
Vue.use(TableColumn);
Vue.use(Table);
Vue.use(Row);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Loading.install(Vue);

router.beforeEach(async (to ,from,  next)=> {
    let toPath = to.fullPath;
    if(toPath != "/" && toPath != "/login" && toPath != "/register" && toPath != "/init") { // 检查权限
        let user = await store.dispatch("GetUserInfo").catch((result)=> {
            Message.error("系统内部错误");
        });

        if(!user) {
            Message.error("未登录");
            next({
                path: '/login',
            });
            return;
        }

        if(toPath.indexOf("/manager") > -1 && UserManagerPageRoleKey[user.type].indexOf(toPath) < 0) {
            Message.error("无权限");
            return;
        }
    }

    next();
});

new Vue({
    el: '#app',
    store,
    router,
    components: {App},
    template: '<App/>'
})
