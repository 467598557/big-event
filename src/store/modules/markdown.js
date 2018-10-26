import * as UserApi from 'src/api/user'

const markdown = {
    state: {
        isInited: false,
        isShow: false,
        relatedId: null
    },
    mutations: {
        SHOW(state, relatedId) {
            state.isShow = false;
            state.relatedId = relatedId;
        },
        HIDE(state) {
            if (!state.isInited) {
                state.isInited = true;
            }

            state.isShow = true;
        }
    },
    actions: {
        Show({state, commit}, relatedId) {
            commit("SHOW", relatedId);
        },
        Hide({state, commit}) {
            commit("HIDE");
        }
    }
};

export default markdown;
