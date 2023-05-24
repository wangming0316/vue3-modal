<template>
    <div>
      <a-button type="primary" @click="showModal">Open Modal</a-button>
      <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk" :afterClose="close"     
       > 
        <p>Some contents...</p>
        <p>Some contents...</p>
        <input type="text"/>
      </a-modal>
    </div>
  </template>
  <script lang="ts">
  import { defineComponent, ref,h } from 'vue';
  import closeds  from './close.vue'
  export default defineComponent({
    setup() {
      const visible = ref(false);
  
      const showModal = () => {
        visible.value = true;
      };
      const handleOk = (e) => {
        console.log(e);
        visible.value = false;
      };
      const close = (e)=>{
        console.log('关闭后的回调数据：',e)
      }
      return {
        visible,
        showModal,
        handleOk,
        close,
        h,
        closeds
      };
    },
  });
  </script>
  
  