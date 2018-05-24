<template>
  <div class="content flexbox">
    <div v-for="(book, index) in list_books" :key="index">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" :src="book.image" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{ book.title }}</h5>
          <p class="card-text">{{ book.publisher }}</p>
          <a @click="reviewBook(book._id)" class="btn btn-primary">Review</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'list_books'
    ])
  },
  methods: {
    ...mapActions([
      'getAllBooks'
    ]),
    reviewBook (bookId) {
      this.$router.push({ path: '/review', query: { id: bookId } })
    }
  },
  mounted () {
    this.getAllBooks()
  }
}
</script>
