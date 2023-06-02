import { createApp} from 'vue';
import ConfirmModal from "./index.vue";
export default function confirm (props){ 
   const modal = createApp(ConfirmModal, {visible:true,...props});
   console.log('modal==========',modal)
   modal.mount('#app'); 
}