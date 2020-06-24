export const state = () => ({
  csrf: undefined,
  user: {
    uid: undefined,
  },
});
export const mutations = {
  SET_CSRF(state, csrf) {
    state.csrf = csrf;
  },
  SET_USER(state, { uid, isAdmin }) {
    state.user = {
      uid: uid,
      custom_claim: isAdmin,
    };
  },
};
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const csrf = req.csrfToken();
    commit("SET_CSRF", csrf);
    commit("SET_USER", {
      uid: null,
      isAdmin: null,
    });
  },
  onAuthStateChanged({ commit }, { authUser, claims }) {
    if (authUser) {
      commit("SET_USER", {
        uid: authUser.uid,
        isAdmin: claims.custom_claim,
      });
    } else {
      commit("SET_USER", {
        uid: null,
        isAdmin: null,
      });
    }
  },
};
export const getters = {
  csrf(state) {
    return state.csrf;
  },
  uid(state) {
    return state.user.uid;
  },
};
