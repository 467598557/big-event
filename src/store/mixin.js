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
            isMarkdownPreviewShow: state => state.markdown.preview.isShow,
            isMarkdownInited: state => state.markdown.isInited,
            isMarkdownPreviewInited: state => state.markdown.preview.isInited
        })
    }
};
