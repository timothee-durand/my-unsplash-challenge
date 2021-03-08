<template>
  <div>
    <header class="flex between">
      <div class="flex">
        <img src="./assets/my_unsplash_logo.svg" alt="Logo my unsplash"/>

        <form class="search flex items-center" @submit.prevent="searchImage">
          <span class="material-icons icon-search">
          search
          </span>

          <input type="search" v-model="query" placeholder="Search"/>

        </form>
      </div>


      <button type="button" class="button-green" @click="openAddModal">Add a photo</button>
    </header>
    <div class="masonry">
      <ImageUnsplash v-for="image in images" :id="image.id" :key="image.id" :src="image.url" :label="image.label"
                     class="item" @delPhoto="openDelModal"/>
    </div>

    <Modal :show-modal="showModal">
      <h2>Add a new photo</h2>
      <form @submit.prevent="addPhoto">
        <div class="input-group mt-2">
          <label for="label">Label</label>
          <input type="text" id="label" required placeholder="A person walk near the water"
                 v-model="imageToAdd.label"/>
        </div>

        <div class="input-group mt-2">
          <label for="url">Photo URL</label>
          <input type="url" id="url" required placeholder="https://images.unsplash.com/photo-65rem8rt"
                 v-model="imageToAdd.url"/>
        </div>

        <div class="flex end mt-2">
          <button class="button-gey" type="button" @click="showModal = false">Cancel</button>
          <button class="button-green" type="submit">Submit</button>

        </div>
      </form>
    </Modal>

    <Modal :show-modal="showDelete">
      <h2>Are you sure ?</h2>
      <form @submit.prevent="delPhoto" ref="delete">

        <div class="input-group mt-2">
          <label for="pswd">Password</label>
          <input type="password" id="pswd" required placeholder="password" v-model="imageToDel.password"/>
        </div>

        <p class="wrong-password-message" v-if="wrongPassword">Wrong password</p>


        <div class="flex end mt-2">
          <button class="button-gey" type="button" @click="closeDelModal">Cancel</button>
          <button class="button-green" type="submit">Submit</button>
        </div>


      </form>
    </Modal>

  </div>
</template>

<script>

import axios from "axios";
import params from "./params/params.js";
import ImageUnsplash from "./components/ImageUnsplash.vue";
import qs from "qs";
import Modal from "./Modal.vue";

export default {
  name: "App",
  components: {Modal, ImageUnsplash},
  data() {
    return {
      imagesApi: [],
      query: "",
      imageToAdd: {
        label: "",
        url: ""
      },
      imageToDel: {
        id: "",
        password: ""
      },
      showModal: false,
      showDelete: false,
      wrongPassword: false,
    }
  },
  computed: {
    images() {
      let images = this.imagesApi;
      images = images.filter((img) => {
        if (this.query === "") return true;
        //console.log(img.label, this.query, img.label.toLowerCase().includes(this.query.toLowerCase()))
        return img.label.toLowerCase().includes(this.query.toLowerCase());
      })
      //console.log(images)
      return images.reverse();
    }
  },
  mounted() {
    this.getPhoto();
    console.log("hey")
  },
  methods: {
    async deleteAllImg() {
      for (let i = 0; i < this.images.length; i++) {
        await axios.delete(params.routes.images + "/" + this.images[i]._id)
      }
    },
    openAddModal() {
      this.showModal = true;
    },
    searchImage() {

    },
    closeDelModal() {
      this.showDelete = false;
      this.wrongPassword = false;
      this.imageToDel.password = "";
    },
    openDelModal(payload) {
      console.log(payload)
      this.showDelete = true;
      this.imageToDel.id = payload;
      console.log(this.imageToDel)
    },
    async addPhoto() {
      this.imageToDel.password = "";
      await axios({
        method: 'post',
        url: params.routes.images,
        data: qs.stringify(this.imageToAdd),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      this.showModal = false;
      await this.getPhoto()

    },
    async getPhoto() {
      let result = await axios.get(params.routes.images)
      console.log("images", result.data)
      this.imagesApi = result.data
    },
    async delPhoto() {
      console.log("heyyy")
      let result;
      try {
        result = await axios({
          method: 'delete',
          url: params.routes.images + "/" + this.imageToDel.id,
          data: qs.stringify(this.imageToDel),
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        })

        await this.getPhoto()
        this.showDelete = false;
      } catch (e) {
        if (e.response.status === 401) {
          this.wrongPassword = true;
        } else {
          this.wrongPassword = false;
          await this.getPhoto()
          this.showDelete = false;
        }
      }


    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

html, body {
  margin: 0;
  padding: 0;
}

html {
  font-size: 62.5%;
}

#app {
  font-family: 'Noto Sans', sans-serif;
  font-size: 1.4rem;
  padding: 3rem 9rem;
}

* {
  box-sizing: border-box;
}

.masonry { /* Masonry container */
  column-count: 3;
  column-gap: 2rem;
}

.item { /* Masonry bricks or child elements */
  background-color: #eee;
  display: inline-block;
  margin: 0 0 1em;
  width: 100%;
}

.flex {
  display: flex;
}

.between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.center {
  justify-content: center;
}

.mt-2 {
  margin-top: 2rem;
}

.end {
  justify-content: flex-end;
}


form.search, input {
  width: 100%;
  border: 1px solid #4F4F4F;
  box-sizing: border-box;
  filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));
  border-radius: 12px;
}

input {
  padding: 1.8rem;
}

input::placeholder {
  color: #BDBDBD;
}

input:focus {
  outline: none;
}

form.search > input {
  border: none;
  filter: none;
  background: none;
}

header {
  margin-bottom: 7rem;
}


.icon-button {
  background-color: transparent;
  border: none;
  color: #BDBDBD;
}

button {
  cursor: pointer;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  border: none;
  padding: 1.6rem 2rem;
  transition: color ease 200ms, background-color ease 200ms, box-shadow ease 200ms;
  will-change: auto;
}

.button-green {
  background: #3DB46D;
  color: white;
  margin-left: 10px;
}

.mt-4 {
  margin-top: 4rem;
}

button:hover, button:focus {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  outline: none;
}

.button-green:hover, .button-green:focus {
  background-color: #fff;
  color: #3DB46D;
}

.icon-search {
  color: #BDBDBD;
  display: block;
  padding: 0 1rem;
}

.wrong-password-message {
  color: #EB5757;
}


</style>
