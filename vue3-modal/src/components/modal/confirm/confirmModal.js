import confirmModal from './modalBridge.vue'
import confirm from './confirm'
import {withInfo,withSuccess,withError,withWarning} from './handleProps'
confirmModal.confirm=function confirmFn(props){
   return confirm(props)
}

confirmModal.info = function infoFn(props){
  return confirm(withInfo(props))
}

confirmModal.success = function successFn(props){
  return confirm(withSuccess(props))
}

confirmModal.error = function errorFn(props){
  return confirm(withError(props))
}

confirmModal.warning = function warningFn(props){
  return confirm(withWarning(props))
}

export default confirmModal

