export const state = () => ({
  authenticated: false,
  
})

export const mutations = {
  changeAuthState(state, data) {
    state.authenticated = data;
  },
}


