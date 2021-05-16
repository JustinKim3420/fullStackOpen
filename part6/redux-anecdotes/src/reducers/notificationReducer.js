const initialState = ''

export const showNotification = (content)=>{
    return {
        type:'SHOW_NOTIFICATION',
        data:{
            content:`you voted '${content}'`
        }
    }
}

export const closeNotification = () => {
    return {
        type:'CLOSE_NOTIFICATION',
        data:{
            content:''
        }
    }
}

const notificationReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'SHOW_NOTIFICATION':{
            return action.data.content
        }
        case 'CLOSE_NOTIFICATION':{
            return action.data.content
        }
        default:{
            return state
        }
    }
}

export default notificationReducer