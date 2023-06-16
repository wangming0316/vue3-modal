<template>
    <Teleport :to="'getContainer' in useAttrs() ? useAttrs().getContainer() : 'body'" :disabled='isMobile'>
        <modal 
            v-if="cancelElement"          
            :visible="props.visible" 
            :on-cancel="props.onCancel" 
            :body-style="props.bodyStyle"  
            :ok-button-props="props.okButtonProps"
            :cancel-button-props="props.cancelButtonProps"
            :title="props.title"
            :ok-text="props.okText"
            :cancel-text="props.cancelText"
            :dialog-style="props.dialogStyle"
            :class="props.class"
            :footer="props.footer"
            :mask="props.mask"
            :mask-closable="props.maskClosable"
            :mask-style="props.maskStyle"
            :key-board="props.keyboard"
            :width="props.width"
            :centered="props.centered"
            :closable="props.closable"
            :wrap-className="props.wrapClassName" 
            :z-index="props.zIndex"
            :close-icon="props.closeIcon"
            :on-ok="props.onOk" 
            :message = "props.message"  
            :confirm-body-title = "props.confirmBodyTitle"
        >
        <!-- 中间body部分-->
        <template #default>
          <renderContent/>
        </template>
        <!-- footer按钮部分-->
        <template #footer v-if="$slots.footer">
            <slot name="footer" ></slot>
        </template>
       </modal>
    </Teleport>
</template>
<script setup>
import { ref,watch,useAttrs,render } from 'vue' 
import modal from './confirmModal.vue'
const props = defineProps(
    [
        'visible',
        'title',
        'content',
        'okText',
        'cancelText',
        'onCancel',
        'bodyStyle',
        'okButtonProps',
        'cancelButtonProps',
        'destroyOnClose',//关闭时销毁 Modal 里的子元素
        'dialogStyle',
        'footer',
        'class',
        'mask',
        'maskClosable',
        'keyboard',
        'maskStyle',
        'width',
        'wrapClassName',
        'zIndex',
        'closeIcon',
        'onOk',
        'message',
        'confirmBodyTitle',
        'closable',
        'centered'
    ]
)
const renderContent = {
    render(){
        return props.content
    }
}
const isMobile = ref(false);//是否禁用传送门
const cancelElement = ref(true);// 是否销毁 Modal 里的子元素
watch(()=>props.visible,(e)=>{   
  if(props.destroyOnClose && e===false){
    cancelElement.value = e;
  } else if(e){
    cancelElement.value = e;      
  }
})
</script>
