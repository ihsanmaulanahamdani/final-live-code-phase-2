import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list_books: [],
    list_reviews: []
  },
  mutations: {
    getBooks (state, payload) {
      state.list_books = payload
    },
    getReviews (state, payload) {
      state.list_reviews = payload
    }
  },
  actions: {
    getAllBooks ({ commit }) {
      axios
        .get('http://localhost:3000/books')
        .then(response => {
          commit('getBooks', response.data.books)
        })
        .catch(errors => {
          console.log(errors)
        })
    },
    getAllReviews ({ commit }) {
      axios
        .get('http://localhost:3000/reviews')
        .then(response => {
          commit('getReviews', response.data.reviews)
        })
        .catch(errors => {
          console.log(errors)
        })
    }
  }
})
