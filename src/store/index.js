import Vue from "vue";
import Vuex from "vuex";
import * as types from "./type";
import { storeUser } from "@/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  // 以下初始数据最好不要用{}, [],形式声明, 否者出现数据出现__observer__形式, 影响getters数据判断;
  state: {
    isLogin: false,
    token: "",
    roles: null,
    userInfo: null,
    routers: null,
  },
  getters: {
    userInfo: ({ userInfo }) => userInfo || storeUser.get("userInfo"),
    roles: ({ roles }) => roles || storeUser.get("roles"),
    routers: ({ routers }) => routers || storeUser.get("routers"),
    token: ({ token }) => token || storeUser.get("token"),
  },
  mutations: {
    [types.SET_USERINFO]: (state, userInfo) => {
      state.userInfo = userInfo;
      storeUser.set("userInfo", userInfo);
    },
    [types.SET_ROUTERS]: (state, routers) => {
      state.routers = routers;
      storeUser.set("routers", routers);
    },
    [types.SET_ROLES]: (state, roles) => {
      state.roles = roles;
      storeUser.set("roles", roles);
    },
    [types.SET_TOKEN]: (state, token) => {
      state.token = token;
      storeUser.set("token", token);
    },
    [types.LOGOUT]: (state) => {
      state.token = "";
      state.userInfo = null;
      state.routers = null;
    },
  },
  actions: {
    [types.LOGOUT]({ commit }) {
      commit(types.SET_TOKEN, "");
      commit(types.SET_ROUTERS, null);
      commit(types.SET_USERINFO, null);
      commit(types.SET_ROLES, null);
    },
    login: ({ commit }, user) => {
      commit(types.SET_TOKEN, user?.token);
      commit(types.SET_USERINFO, user);
      commit(types.SET_ROLES, user?.roles);
    },
  },
  modules: {},
});
