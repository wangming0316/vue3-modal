<template>
    <div :style="styleObj">
        <div class="ant-modal-mask" ></div>   
        <div :class="['ant-modal',props.centered && 'ant-modal-centered']">             
            <div class="ant-modal-content">
                
                <button type="button" class="ant-modal-close" v-if= "!props.closable">
                    <span class="ant-modal-close-x">
                        <span role="img" aria-label="close" class="anticon anticon-close ant-modal-close-icon" @click="closeModal">                                
                            <svg  focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896">
                                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                            </svg>
                        </span>
                    </span>
                </button>

                <div class="ant-modal-header">
                    <div class="ant-modal-title" id="vcDialogTitle0">
                        {{ props.title }}
                    </div>
                </div>

                <div class="ant-modal-body" :style="bodyStyles">
                    <slot></slot>                    
                </div>

                <div class="ant-modal-footer">
                    <slot name="footer" v-if="$slots.footer"></slot>
                    <div v-else>
                        <button class="ant-btn ant-btn-close" @click="closeModal" :style="cancelButtonStyle">
                            <!----><span>{{ props.cancelText }}</span>
                        </button>
                        <button class="ant-btn ant-btn-primary" :style="okButtonStyle"><span>{{ props.okText }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref,reactive,watch,watchEffect,useAttrs } from 'vue'
const props = defineProps({
    visible:{//是否打开modal
        type:Boolean,
        default: false
    },
    title:{//标题
        type:String,
        default: 'Basic Modal Title'
    },
    okText:{//确认 按钮文案
        type:String,
        default: '确认'
    },
    cancelText:{//取消 按钮文案
        type:String,
        default: '取消'
    },
    afterClose:{//完全关闭后的回调函数
        type:Function,
        default:()=>{}
    },
    bodyStyle:{//自定义  class = "ant-modal-body" 标签的样式  例如： { 'color':'red','background-color':'antiquewhite' }
        type:Object,
    },
    okButtonProps:{//确认按钮样式  暂时没封装button这里只是更改button的样式
        type:Object,
    },
    cancelButtonProps:{//取消按钮样式  暂时没封装button这里只是更改button的样式
        type:Object,
    },
    centered:{ // modal是否居中显示
        type:[String,Boolean],
        default:false
    },
    closable:{//是否显示 右上角关闭  x  按钮
        type:[String,Boolean],
        default:false
    },
    // closeIcon:{
    //     type:Object
    // }
});

 
const styleObj= ref({display:'none'});//控制display：none
const emit = defineEmits(['ok','visible']);
watch(()=>props.visible,(e)=>{
    if(e){
        styleObj.value= { display:'block' };
    }else{
        styleObj.value= { display:'none' };
        props.afterClose();//完全关闭后触发 对应=> afterClose API
    }
});
const bodyStyles = ref({})//body样式
const okButtonStyle = ref({})//确认按钮的样式
const cancelButtonStyle = ref({})//删除按钮的样式
watch(()=>[props.bodyStyle,props.okButtonProps,props.cancelButtonProps],([bodyStyle,okButtonProps,cancelButtonProps])=>{
    if(bodyStyle){
        bodyStyles.value = bodyStyle;
    };
    if(okButtonProps){      
        okButtonStyle.value = okButtonProps;
        console.log('okButtonStyle',okButtonStyle.value)
    }
    if(cancelButtonProps){    
        cancelButtonStyle.value = cancelButtonProps;
        console.log('cancelButtonStyle',cancelButtonStyle.value)
    }
},{immediate:true})

//关闭Modal时触发
const closeModal = ()=>{    
    emit('visible', false)//通知已经关闭Modal
}

</script>
<style scoped>
.ant-modal-mask{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1000;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
}
.ant-modal{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum';
    pointer-events: none;
    position: relative;
    top: 100px;
    width: auto;
    max-width: calc(100vw - 800px);
    margin: 0 auto;
    padding-bottom: 24px;
    top:0px;
}
.ant-modal-content {
    position: relative;
    background-color: #fff;
    background-clip: padding-box;
    border: 0;
    border-radius: 2px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
    pointer-events: auto;
}
.ant-modal-close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    padding: 0;
    color: #00000073;
    font-weight: 700;
    line-height: 1;
    text-decoration: none;
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    transition: color .3s;
}
button{
    text-transform: none;
    overflow: visible;
}
.ant-modal-close-x {
    
    display: block;
    width: 56px;
    height: 56px;
    font-size: 16px;
    font-style: normal;
    line-height: 56px;
    text-align: center;
    text-transform: none;
    text-rendering: auto;
}
.anticon {
    display: inline-block;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.anticon svg {
    display: inline-block;
}
.anticon>* {
    line-height: 1;
}
.ant-modal-header {
    padding: 16px 24px;
    color: #000000d9;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 2px 2px 0 0;
}
.ant-modal-title {
    margin: 0;
    color: #000000d9;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    word-wrap: break-word;
}
.ant-modal-body {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
}
.ant-modal-footer {
    padding: 10px 16px;
    text-align: right;
    background: transparent;
    border-top: 1px solid #f0f0f0;
    border-radius: 0 0 2px 2px;
}
.ant-btn {
    line-height: 1.5715;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
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
.ant-modal-centered{
    top: 33vh !important;
}
</style>