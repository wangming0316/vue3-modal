export function withConfirm (props){} 

export function withInfo(props){  
    if(props?.title){
       Reflect.set(props,'confirmBodyTitle',props.title)
    }
    Reflect.deleteProperty(props,'title')
    return {message:'info',...props}
}

export function withSuccess(props){
    if(props?.title){
        Reflect.set(props,'confirmBodyTitle',props.title)
     }
     Reflect.deleteProperty(props,'title')
     return {message:'success',...props}
}

export function withError(props){
    if(props?.title){
        Reflect.set(props,'confirmBodyTitle',props.title)
    }
    Reflect.deleteProperty(props,'title')
    return {message:'error',...props}
}

export function withWarning (props){
    if(props?.title){
        Reflect.set(props,'confirmBodyTitle',props.title)
     }
     Reflect.deleteProperty(props,'title')
     return {message:'warning',...props}
}