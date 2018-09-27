import {mapState} from 'vuex';

export const MixinStoreUser = {
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    }   
};
