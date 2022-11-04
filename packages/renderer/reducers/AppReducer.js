import { produce } from 'immer'

//must be a pure function
const AppReducer = (state, action) => {
   switch (action.type) {
      case 'SET_ACCESS_TOKEN':
         return produce(state, draft => {
            draft.accessToken = action.payload
         })
      default:
         return state
   }
}

export default AppReducer
