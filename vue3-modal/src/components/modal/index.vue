<template>
    <Teleport :to="'getContainer' in useAttrs() ? useAttrs().getContainer() : 'body'" :disabled='isMobile'>
        <modal 
            v-if="cancelElement"          
            :visible="props.visible" 
            :after-close="props.afterClose" 
            :body-style="props.bodyStyle"  
            :ok-button-props="props.okButtonProps"
            :cancel-button-props="props.cancelButtonProps"
            :title="props.title"
            :ok-text="props.okText"
            :cancel-text="props.cancelText"
            :dialog-style="props.dialogStyle"
            :dialog-class="props.dialogClass"
            :footer="props.footer"
            :mask="props.mask"
            :mask-closable="props.maskClosable"
            :mask-style="props.maskStyle"
            :key-board="props.keyboard"
            :width="props.width"
            @visible="getVisible"
            :centered="'centered' in useAttrs()"
            :closable="'closable' in useAttrs()"
            :wrap-className="props.wrapClassName" 
            :z-index="props.zIndex"
            :close-icon="closeIcon"     
        >
        <!-- 中间body部分-->
        <template #default>
            <slot></slot>
        </template>
        <!-- footer按钮部分-->
        <template #footer v-if="$slots.footer">
            <slot name="footer" ></slot>
        </template>
       </modal>
    </Teleport>
</template>
<script setup>
import { ref,watch,useAttrs, } from 'vue' 
import modal from './modal.vue'
const props = defineProps(
    [
        'visible',
        'title',
        'okText',
        'cancelText',
        'afterClose',
        'bodyStyle',
        'okButtonProps',
        'cancelButtonProps',
        'destroyOnClose',//关闭时销毁 Modal 里的子元素
        'dialogStyle',
        'footer',
        'dialogClass',
        'mask',
        'maskClosable',
        'keyboard',
        'maskStyle',
        'width',
        'wrapClassName',
        'zIndex',
        'closeIcon'
    ]
)
const emit = defineEmits(['ok','update:visible']);
console.log('modal',modal)
const isMobile = ref(false);//是否禁用传送门
const cancelElement = ref(true);// 是否隐藏 modal组件
watch(()=>props.visible,(e)=>{   
  if(props.destroyOnClose && e===false){
    cancelElement.value = e;
  } else if(e){
    cancelElement.value = e;      
  }
})
const getVisible =(e)=>{  
    emit('update:visible', e)//通知已经关闭Modal
}
</script>
