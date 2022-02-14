export const initialState = {
    user : null,
    booking : null,
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
        case 'SET_BOOK' : 
            return {
                ...state,
                booking : action.booking,
                
            }
        default :
            return state;
    }
}
export default reducer;