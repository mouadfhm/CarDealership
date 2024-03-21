import axios from 'axios';

const state = {
  users: []
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  }
};

const actions = {
  async fetchUsers({ commit }) {
    try {
      const response = await axios.get('/users');
      commit('SET_USERS', response.data);
    } catch (error) {
      console.error(error);
    }
  }
};

const getters = {
  getUsers: state => state.users
};

export default {
  state,
  mutations,
  actions,
  getters
};
  
