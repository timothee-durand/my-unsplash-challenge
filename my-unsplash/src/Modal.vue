<template>
  <transition name="modal">
    <div class="modal-backdrop flex center items-center" v-if="showModal">
      <div class="modal">
       <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    showModal: {}
  }
}
</script>
<style>

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.25);
}

.modal {
  width: 50%;
  min-width: max-content;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 2.4rem 3.2rem;
  transition: transform 0.5s ease;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: translateX(-50px);
}
</style>
