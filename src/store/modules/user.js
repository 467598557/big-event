import * as UserApi from 'src/api/user'

function processUserRequest(commit, result, resolve, reject) {
    if(!result || result.retCode !== "0000") {
        reject(result);
        return;
    }

    let user = result.retData;
    commit('SET_USER', user);
    resolve(user);
}
const user = {
    state: {
        user: null
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        }
    },
    actions: {
        async Login({ commit }, userInfo) {
            return new Promise(async (resolve, reject)=> {
                UserApi.login(userInfo).then((result)=> {
                    processUserRequest(commit, result, resolve, reject);
                }, (err)=> {
                    reject(err);
                });
            });
        },
        async GetUserInfo({ state, commit }) {
            if(state.user) {
                return state.user;
            }

            return new Promise(async (resolve, reject)=>{
                UserApi.getUserInfo().then((result)=> {
                    processUserRequest(commit, result, resolve, reject);
                }, (err)=> {
                    reject(err);
                });
            });
        }
    }
};

export default user
