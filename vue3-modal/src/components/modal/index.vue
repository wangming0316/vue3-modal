<template>
    <Teleport to="body" :disabled='isMobile'>
        <modal 
            v-if="cancelElement"          
            :visible="props.visible" 
            :afterClose="props.afterClos" 
            :bodyStyle="props.bodyStyle"  
            :ok-button-props="props.okButtonProps"
            :cancel-button-props="props.cancelButtonProps"
            :title="props.title"
            :ok-text="props.okText"
            :cancel-text="props.cancelText"
            @visible="getVisible"
            :centered="'centered' in useAttrs()"
            :closable="'closable' in useAttrs()"      
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
import { ref,reactive,watch,useAttrs, nextTick } from 'vue' 
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
        'destroyOnClose'
    ]
)
const isMobile = ref(false);//是否禁用传送门
const cancelElement = ref(true);
watch(()=>props.visible,(e)=>{   
  if(props.destroyOnClose && e===false){
    cancelElement.value = e;
  } else{
    //这里出现了 props.visible  cancelElement.value 为true 但是 modal组件重新挂在以后 导致 display：none 
    cancelElement.value = e;      
  }
})
const emit = defineEmits(['ok','update:visible']);

const getVisible =(e)=>{    
    emit('update:visible', e)//通知已经关闭Modal
}
</script>
