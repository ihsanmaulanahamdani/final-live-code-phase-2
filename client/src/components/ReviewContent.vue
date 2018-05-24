<template>
  <div class="review container">
    <div class="row flexbox">
      <div v-for="(book, index) in list_books" :key="index">
        <div v-if="book._id === bookId">
          <div class="card col" style="width: 18rem;">
            <img class="card-img-top" :src="book.image" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">{{ book.title }}</h5>
              <p class="card-text">{{ book.publisher }}</p>
              <a @click="reviewBook(book._id)" class="btn btn-primary">Review</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div v-for="(review, index) in list_reviews" :key="index">
        <div class="card col">
          <div class="card-body">{{ review.opinion }}</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <textarea v-model="opinion"></textarea><br>
        <button @click="addReview">Review</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      token: localStorage.getItem('token'),
      bookId: '',
      opinion: ''
    }
  },
  computed: {
    ...mapState([
      'list_books',
      'list_reviews'
    ])
  },
  methods: {
    ...mapActions([
      'getAllBooks',
      'getAllReviews'
    ]),
    addReview () {
      let self = this

      axios
        .post('http://localhost:3000/reviews/create', {
          opinion: self.opinion,
          book: self.bookId
        }, {
          headers: {
            token: self.token
          }
        })
        .then(response => {
          this.getAllReviews()
        })
        .catch(errors => {
          console.log(errors)
        })
    }
  },
  mounted () {
    this.getAllBooks()
    this.getAllReviews()
  },
  created () {
    this.bookId = this.$route.query.id
  }
}
</script>
