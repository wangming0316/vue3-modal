<script setup>
import confirmModal from './components/modal/confirm/confirmModal'
import mymodal from './components/modal/index.vue'
import modal from './components/index.vue'
import {ref,h,render} from 'vue'
const visible = ref(false);
const close = ()=>{
  console.log('关闭后的回调函数触发了')
}
const showModal = () => {
  visible.value = true;
};
confirmModal.confirm({
  content:'啊大苏打是大哥999',
  afterClose:close,
  bodyStyle:{ color:'green',"background-color":'antiquewhite' },
  okButtonProps:{'border-color': 'red'},
  cancelButtonProps:{ width: '100px'},
  title:'Modal Title Namesa'
});
const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};

const getContainer =()=>document.getElementsByClassName('fatherClassName')[0];
const closeIcon ="<span>x<span>"
</script>

<template>
  <div class="fatherClassName"></div>
  <modal/>
  <!-- bodyStyle  ok-button-props  cancel-button-props dialogStyle属性遵循 vue 动态 :style 的写法 -->
  <mymodal 
    v-model:visible="visible" 
    :afterClose="close" 
    :bodyStyle="{ 'color':'red','background-color':'antiquewhite' }"  
    :ok-button-props="{ 'border-color': 'red' }"
    :cancel-button-props="{ 'width': '100px' }"
    title="Modal"
    ok-text="确认1"
    cancel-text="取消1"
    centered
    :destroyOnClose= true
    :dialogStyle="{'width': '600px','background-color': 'red'}"
    dialogClass="dialog-name"
    :footer="null"
    :getContainer='getContainer'
    :mask=true 
    :maskClosable=false
    :maskStyle="{}"
    :keyboard=false
    :width=520
    wrapClassName="wrap"
    zIndex="1000" 
    :closeIcon="closeIcon"
  >
    <!-- footer插槽 -->
    <!-- <template #footer>
      <button class="ant-btn ant-btn-close" type="button" ant-click-animating-without-extra-node="false">
        <span>delete</span>
      </button>
      <button class="ant-btn ant-btn-primary" type="button"><span>ok</span>
      </button>
    </template>   -->
    <input type="text"/>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </mymodal>
  <button type="button" @click="showModal">modal</button>
</template>

<style scoped>
  .ant-btn {
    line-height: 1.5715;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    box-shadow: 0 2px #00000004;
    cursor: pointer;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    touch-action: manipulation;
    height: 32px;
    padding: 4px 15px;
    font-size: 14px;
    border-radius: 2px;
    color: #000000d9;
    border-color: #d9d9d9;
    background: #fff;
}
.ant-btn-close:hover{
    color:#40a9ff;
}
.ant-btn,.ant-btn:active,.ant-btn:focus {
    outline: 0;   
}
.ant-btn:hover{
    border-color: #40a9ff;
    overflow: visible
}   
.ant-btn-primary {
    color: #fff;
    border-color: var(--ant-primary-color);
    background: var(--ant-primary-color);
    text-shadow: 0 -1px 0 rgba(0,0,0,.12);
    box-shadow: 0 2px #0000000b;
    margin-bottom: 0;
    margin-left: 8px;
    background-color:  #1890ff;
}
.ant-btn-primary:hover{
    color:#fff;
    background-color:#40a9ff;
}
.ant-btn>span {
    display: inline-block;
}
</style>
