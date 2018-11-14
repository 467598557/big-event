import {mapState} from 'vuex';

export const MixinStoreUser = {
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    }   
};

export const MixinStoreMarkdown = {
    computed: {
        ...mapState({
            isMarkdownShow: state => state.markdown.isShow,
            isMarkdownInited: state => state.markdown.isInited
        })
    }
};
