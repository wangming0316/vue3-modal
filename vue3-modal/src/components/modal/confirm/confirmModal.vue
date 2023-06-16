<template>
    <div :style="styleObj">
        <div class="ant-modal-mask" v-if="props.mask" :style="props.maskStyle"></div> 
        <div :class="['ant-modal-wrap',props.wrapClassName]" :style="{'z-index':props.zIndex}" tabindex="-1" aria-labelledby="vcDialogTitle0" @click.self="closeModal"> 
            <div :class="['ant-modal',props.centered && 'ant-modal-centered']" :style="[{width:props.width+'px'},props.dialogStyle]">             
                <div :class="[props.class,'ant-modal-content']">                                    
                        <button type="button" class="ant-modal-close" v-if= "props.closable">
                            <span class="ant-modal-close-x">                               
                                <span v-html="props.closeIcon" @click="closeModal" v-if="props.closeIcon"></span>                             
                                <span role="img" aria-label="close" class="anticon anticon-close ant-modal-close-icon" @click="closeModal" v-else>                                
                                    <svg  focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896">
                                        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                                    </svg>
                                </span>                            
                            </span>
                        </button>                
                    <div class="ant-modal-header" v-if="!props.message">
                        <div class="ant-modal-title" id="vcDialogTitle0">
                            {{ modalTitle }}
                        </div>
                    </div>
                    <div class="ant-modal-confirm" :style="bodyStyles" v-if=" props.confirmBodyTitle">
                        <div class="anticon-info-box"> 
                            <div v-for="item in iconList">              
                                <span role="img" aria-label="info-circle" :class="item.className"  v-if="props.message === item.message"> 
                                    <svg focusable="false"  data-icon="info-circle" width="1em" height="1em" :fill=item.fill aria-hidden="true" :viewBox=item.viewBox>
                                        <path :d=item.pathOneD></path>
                                        <path :d=item.pathTowD></path>
                                    </svg>
                                </span>
                            </div>   
                            <p class="ant-modal-confirm-title">{{ props.confirmBodyTitle }}</p>
                        </div> 
                        <div class="ant-modal-confirm-body">
                            <slot></slot>
                        </div>                                                                                                    
                    </div>
                    <div class="ant-modal-body" :style="bodyStyles" v-else>
                        <slot></slot>                     
                    </div>
                    <div class="ant-modal-confirm-message" v-if="props.message">                                             
                        <button class="ant-btn ant-btn-primary" :style="okButtonStyle" @click="closeModal">
                            <span>{{ props.okText  }}</span>
                        </button>
                    </div>   
                    <div class="ant-modal-footer" v-else>
                        <button class="ant-btn ant-btn-close" @click="closeModal" :style="cancelButtonStyle">
                            <span>{{ props.cancelText }}</span>
                        </button>
                        <button class="ant-btn ant-btn-primary" :style="okButtonStyle" @click="okCloseModal"><span>{{ props.okText }}</span>
                        </button>                
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>
<script>
</script>
<script setup>
import { ref,watch,onMounted,watchEffect,onBeforeUpdate} from 'vue';
import iconList from './assets/icon';
const props = defineProps({
    visible:{//是否打开modal
        type:Boolean,
        default: false
    },
    title:{//标题
        type:String,
        default: ''
    },
    okText:{//确认 按钮文案
        type:String,
        default: '确认'
    },
    cancelText:{//取消 按钮文案
        type:String,
        default: '取消'
    },
    onCancel:{//完全关闭后的回调函数
        type:Function,
        default:()=>{}
    },
    bodyStyle:{//自定义  class = "ant-modal-body" 标签的样式  例如： { 'color':'red','background-color':'antiquewhite' }
        type:Object,
    },
    okButtonProps:{//确认按钮样式  暂时没封装button这里只是更改button的样式
        type:Object,
        default:{}
    },
    cancelButtonProps:{//取消按钮样式  暂时没封装button这里只是更改button的样式
        type:Object,
        default:{}
    },
    centered:{ // modal是否居中显示
        type:[String,Boolean],
        default:false
    },
    closable:{//是否显示 右上角关闭  x  按钮
        type:[String,Boolean],
        default:false
    },
    dialogStyle:{//可用于设置浮层的样式，调整浮层位置等  top  left  bottom  right
        type:Object,
    },
    class:{// 容器类名
        type:String,
        default:""
    },
    footer:{//底部内容，当不需要默认底部按钮时，可以设为 :footer="null"  	确定取消按钮
        type:Object,   // null
        default:{}
    },
    mask:{//是否显示遮罩层 默认true 打开
        type:Boolean,
        default:true
    },
    maskClosable:{// 点击蒙层是否允许关闭
        type:Boolean,
        default:true
    },
    maskStyle:{
        type:[String,Object],
        default:""
    },
    keyBoard:{//是否支持键盘 esc 关闭
        type:Boolean,
        default:true
    },
    width:{//modal 宽度
        type:[String,Number],
        default:'420'
    },
    wrapClassName:{ //对话框外层容器的类名  
        type:String,
        default:''
    },
    zIndex:{//设置 Modal 的 z-index
        type:[String,Number],
        default:1000
    },
    closeIcon:{//自定义关闭图标  HTMLElement  
        type:String,     
    },
    onOk:{ //
        type:Function, 
        default:()=>{}
    },
    message:{ // 调用 Modal.info Modal.success Modal.error Modal.warning Modal.confirm 函数的标识 
        type:String,
        default:''
    },
    confirmBodyTitle:{//调用Modalmethod()时 title处于class=ant-modal-confirm中
        type:String,
        default:''
    }
});
const styleObj= ref({display:props.visible ? 'block':'none'});//控制display：none
const emit = defineEmits(['visible']);
const modalTitle = ref('');//标题
const bodyStyles = ref({})//body样式
const okButtonStyle = ref({})//确认按钮的样式
const cancelButtonStyle = ref({})//删除按钮的样式
watchEffect(()=>{
    if(props.bodyStyle){
        bodyStyles.value = props.bodyStyle;
    };
    if(props.okButtonProps){      
        okButtonStyle.value = props.okButtonProps;
    }
    if(props.cancelButtonProps){    
        cancelButtonStyle.value = props.cancelButtonProps;
    }
    if(props.visible){
        styleObj.value= { display:'block' };
    }else{
        styleObj.value= { display:'none' };
    }
    modalTitle.value = props.title;
})
onBeforeUpdate(()=>{
    if(props.cancelButtonProps){    
        cancelButtonStyle.value = props.cancelButtonProps;
    }
})
onMounted(()=>{ 
    //esc 关闭modal 默认开启
    window.addEventListener('keydown', (e) => {
        if(props.keyBoard && e.key === 'Escape'){
            closeModal()
        }       
    });  
})
const okCloseModal = async ()=>{
    if(props.onOk()){
        await props.onOk();
        closeModal()
    }
}
//关闭Modal时触发
const closeModal = (e)=>{ 
    if(!props.maskClosable && e.target.attributes[1].nodeValue.indexOf('ant-modal-wrap') !==-1){
        return false
    }
    styleObj.value = {display:'none'}
    props.onCancel();//完全关闭后触发 对应=> onCancel API   
}
</script>
<style src="./assets/css/confirm.css" scoped></style>