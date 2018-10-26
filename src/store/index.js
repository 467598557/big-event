import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import markdown from './modules/markdown';

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        user,
        markdown
    }
})

export default store;
