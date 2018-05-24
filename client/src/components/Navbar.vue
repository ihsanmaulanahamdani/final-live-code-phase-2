<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info d-flex justify-content-between">
    <div v-if="token">
      <a class="remove-underline text-white" data-toggle="modal" data-target="#modalPostArticle"><i class="fas fa-book"></i> POST</a>
    </div>
        <div class="modal fade" id="modalPostArticle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-book"></i> Add Book</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="inputEmail">Title</label>
                  <input type="text" class="form-control" v-model="title" placeholder="Enter title">
                </div>
                <div class="form-group">
                  <label for="inputPublisher">Publisher</label>
                  <input type="text" class="form-control" v-model="publisher" placeholder="Publisher">
                </div>
                <div class="form-group">
                  <label for="inputBookImage">Book Image</label>
                  <input type="file" class="form-control" @change="uploadHandler">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-success" @click="addBook" data-dismiss="modal">POST</button>
            </div>
          </div>
        </div>
      </div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
      </ul>
      <div v-if="isLogin">
        <Logout/>
      </div>
      <div v-else>
        <Login/>
      </div>
    </div>
  </nav>
</template>

<script>
import Login from '@/components/Login.vue'
import Logout from '@/components/Logout.vue'
import axios from 'axios'
import swal from 'sweetalert2'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      token: localStorage.getItem('token'),
      isLogin: false,
      title: '',
      publisher: '',
      image: ''
    }
  },
  components: {
    Login,
    Logout
  },
  methods: {
    ...mapActions([
      'getAllBooks'
    ]),
    addBook () {
      let self = this
      let formData = new FormData()

      formData.append('title', this.title)
      formData.append('publisher', this.publisher)
      formData.append('image', this.image)

      axios
        .post('http://localhost:3000/books/create', formData, {
          headers: {
            token: self.token
          }
        })
        .then(response => {
          swal({
            position: 'center',
            type: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.getAllBooks()
        })
        .catch(({ errors }) => {
          swal({
            position: 'center',
            type: 'warning',
            title: errors[0].message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    uploadHandler (event) {
      this.image = event.target.files[0]
    }
  },
  created () {
    if (this.token) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
}
</script>
