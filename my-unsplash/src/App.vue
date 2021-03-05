<template>
  <div>
    <header class="flex between">
      <div class="flex">
        <img src="./assets/my_unsplash_logo.svg" alt="Logo my unsplash"/>

        <form class="search flex items-center" @submit.prevent="searchImage">
          <button type="submit" class="icon-button">
          <span class="material-icons">
          search
          </span>
          </button>
          <input type="search" v-model="query" placeholder="Search"/>

        </form>
      </div>


      <button type="button" class="button-green" @click="openAddModal">Add a photo</button>
    </header>
    <div class="masonry">
      <ImageUnsplash v-for="image in images" :key="image._id" :src="image.url" :label="image.label" class="item"/>
    </div>

    <div class="modal-backdrop">
      <div class="modal">
        <h2>Add a new photo</h2>
        <form @submit="addPhoto">
          <div class="input-group">
            <label for="label">Label</label>
            <input type="text" id="label" placeholder="A person walk near the water"/>
          </div>

          <div class="input-group">
            <label for="url">Photo URL</label>
            <input type="url" id="url" placeholder="https://images.unsplash.com/photo-65rem8rt"/>
          </div>

          <div class="flex end">
            <button class="button-gey" type="button">Cancel</button>
            <button class="button-green" type="submit">Submit</button>

          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>

import axios from "axios";
import params from "./params/params.js";
import ImageUnsplash from "./components/ImageUnsplash.vue";

export default {
  name: "App",
  components: {ImageUnsplash},
  data() {
    return {
      images: [],
      query: "",
    }
  },
  mounted() {
    axios.get(params.routes.images)
        .then(data => {
          console.log("images", data.data)
          this.images = data.data
        })
    console.log("hey")
  },
  methods: {
    async deleteAllImg() {
      for (let i = 0; i < this.images.length; i++) {
        await axios.delete(params.routes.images + "/" + this.images[i]._id)
      }
    },
    openAddModal() {

    },
    searchImage(){

    },
    addPhoto(){

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
  outline:none;
}

form.search > input {
  border: none;
  filter:none;
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
}

.button-green {
  background: #3DB46D;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  color:white;
  border:none;
  padding: 1.6rem 2rem;
  transition: color ease 200ms, background-color ease 200ms, box-shadow ease 200ms;
  will-change: auto;
}

.button-green:hover, .button-green:focus {
  background-color: #fff;
  color:#3DB46D;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  outline:none;
}

</style>
