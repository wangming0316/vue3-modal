import { createApp} from 'vue';
import ConfirmModal from "./index.vue";
export default function confirm (props){ 
   const modal = createApp(ConfirmModal, props);
   modal.mount('#app'); 
}
