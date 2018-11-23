const markdown = {
    namespaced: true,
    state: {
        isInited: false,
        isShow: false,
        relativedEvent: null,
        preview: {
            isShow: false,
            isInited: false,
            relativedEvent: null
        }
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
        },
        SHOW_PREVIEW(state, relativedEvent) {
            if (!state.preview.isInited) {
                state.preview.isInited = true;
            }

            state.preview.relativedEvent = relativedEvent;
            state.preview.isShow = true;
        },
        HIDE_PREVIEW(state) {
            state.preview.isShow = false;
            state.preview.relativedEvent = null;
        }
    },
    actions: {
        Show({state, commit}, relativedEvent) {
            commit("SHOW", relativedEvent);
        },
        Hide({state, commit}) {
            commit("HIDE");
        },
        ShowPreview({state, commit}, relativedEvent) {
            commit("SHOW_PREVIEW", relativedEvent);
        },
        HidePreview({state, commit}) {
            commit("HIDE_PREVIEW");
        }
    }
};

export default markdown;
