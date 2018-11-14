const markdown = {
    namespaced: true,
    state: {
        isInited: false,
        isShow: false,
        relativedEvent: null
    },
    mutations: {
        HIDE(state) {
            state.isShow = false;
            this.relativedEvent = null;
        },
        SHOW(state, relativedEvent) {
            if (!state.isInited) {
                state.isInited = true;
            }

            state.relativedEvent = relativedEvent;
            state.isShow = true;
        }
    },
    actions: {
        Show({state, commit}, relativedEvent) {
            commit("SHOW", relativedEvent);
        },
        Hide({state, commit}) {
            commit("HIDE");
        }
    }
};

export default markdown;
