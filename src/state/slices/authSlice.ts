import { createSlice } from '@reduxjs/toolkit';
import { AuthModel } from '../../common/models/authModel';


const initialState: AuthModel = {
 isUserLoggedIn:false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsUserLogin:(state,action)=>{
        state.isUserLoggedIn  = action.payload 
    }
  },

});


export const { setIsUserLogin } = authSlice.actions;

export default authSlice.reducer;
