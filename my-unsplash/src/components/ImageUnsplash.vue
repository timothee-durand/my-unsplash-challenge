<template>
  <div class="item">
    <button class="delete-button" @click="$emit('delPhoto', id)">delete</button>
    <img :src="src" :alt="label"  :style='"--label: \"" + label +"\""'/>
    <p class="label">{{ label }}</p>
  </div>

</template>

<script>
export default {
  name: "ImageUnsplash",
  props: {
    src: {
      type: String,
      default: "https://source.unsplash.com/random"
    },
    label: {
      type: String,
      default: "Label"
    },
    id:{
      required:true
    }
  },
}
</script>

<style scoped>
.item {
  position: relative;
  overflow: hidden;
  border-radius: 16px;

}

.item img {
  width: 100%;
  border-radius: 16px;
  transition: filter ease 200ms;
}

.label {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(1000px);
  transition: transform ease 200ms;
  color: white;
  font-style: normal;
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 2.2rem;
  padding: 3%;
}

.item:hover img{
  filter: brightness(60%) ;
}

.item:hover .label {
  transform: translateX(0);
}

.delete-button {
  border: 1px solid #EB5757;
  color: #EB5757;
  background-color: transparent;
  border-radius: 38px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem 1.5rem;
  margin: 1.8rem;
  z-index: 10;
  transform: translateY(-100px);
  transition: transform ease 200ms, background-color 200ms ease, color 200ms ease;
}

.delete-button:hover {
  background-color: #EB5757;
  color: white;
}

.item:hover .delete-button {
  transform: translateY(0);
}

</style>
