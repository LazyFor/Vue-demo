const module = {
  namespaced: true, // 命名空间
  state: {
    cityId: '110100',
    cityName: '北京'
  },
  mutations: {
    changeCityName (state, name) {
      state.cityName = name
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    }
  },
  actions: {

  }
}

export default module
