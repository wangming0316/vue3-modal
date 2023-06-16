import { createVNode, render as VueRender } from 'vue';
import ConfirmModal from "./modalBridge.vue";

function render(props){
   const vm = createVNode(ConfirmModal,{visible:true,...props});
   VueRender(vm,document.createDocumentFragment());
   return vm
}

export default function confirm (props){ 
   const modal = render(props);
   return {
      update(nextProps){       
         Reflect.set(nextProps,'confirmBodyTitle',nextProps?.title);       
         Object.assign(modal.component.props,nextProps);
         modal.component.update();
      }
   }
}
