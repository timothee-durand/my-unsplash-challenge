<template>
  <div class="item">
    <img :src="src" :alt="label" :style='"--label: \"" + label +"\""'/>
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

</style>
