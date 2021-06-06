


const initialState=[]

const usersReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'INITIALIZE_USERS':{
            return action.data
        }
        case 'UPDATE_USERS':{
            return action.data
        }
        default:
            return state;
    }
}


export const initializeUsers = (users) =>{
    return{
        type:'INITIALIZE_USERS',
        data:users
    }
}

export const updateUsers = (users)=>{
    return{
        type:'UPDATE_USERS',
        data:users
    }
}

export default usersReducer