import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name : 'user',
  initialState : 'kim'
})

let stock = createSlice({
  name : 'stock',
  initialState : 
  [

  ],
  reducers : {
    addCount(state, action){
      let num = state.findIndex((a)=>{ return a.id === action.payload })
      state[num].count++
    },
    addItem(state, action){
      state.push(action.payload)
    }
  }
})

export let {addCount, addItem} = stock.actions

export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
  }
}) 