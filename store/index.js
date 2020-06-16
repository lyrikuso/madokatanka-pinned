export const state = () => {
  csrf: undefined;
};
export const mutations = {
  SET_CSRF(state, csrf) {
    state.csrf = csrf;
  },
};
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const csrf = req.csrfToken();
    commit("SET_CSRF", csrf);
  },
};
export const getters = {
  csrf(state) {
    return state.csrf;
  },
};
