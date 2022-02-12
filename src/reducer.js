export const initialState = {
    user : null
}

const reducer = (state,action) =>{
    switch(action.type){
        case 'SET_USER' :
            return {
                ...state,
                user : action.user
            }
        case 'SET_CURRUSER' :
            return {
                ...state,
                currUser : action.currUser
            }
        default :
            return state;
    }
}
export default reducer;