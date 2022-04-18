import decode from 'jwt-decode'
import router from '../../router'

const state = {
    token: null,
    usuario: null
};
const getters = {
    isAuthenticated: (state) => !!state.user,
    StateUser: (state) => state.usuario,
};

const actions = {
    guardarToken({commit}, token){
        commit("setToken", token)
        commit("setUsuario", decode(token))
        localStorage.setItem("token", token)
    },
    autoLogin({commit}){
        let token = localStorage.getItem("token");
        if(token) {
            commit("setToken", token);
            commit("setUsuario", decode(token));
        }
    },
    salir({commit}){
        commit("setToken", null);
        commit("setUsuario", null);
        localStorage.removeItem("token");
        router.push({name: '/'});
    }
};

const mutations = {
    setToken(state,token){
        state.token=token;
    },
    setUsuario(state,usuario){
        state.usuario=usuario;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};
