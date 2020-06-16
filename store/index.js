

export const state = () => ({
    clickedLat:'',
    clickedLng:''
})

export const mutations = {
    changeLat(state, data) {
      state.clickedLat = data;
    },
    changeLng(state,data){
      state.clickedLng = data;
    },
}