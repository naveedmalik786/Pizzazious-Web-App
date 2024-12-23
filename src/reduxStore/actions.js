import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value : [],
  },
  reducers: {
    add: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value.push(action.payload)
    },
    remove: (state, action) => {

      state.value = state.value.filter(item => item.id !== action.payload)
    },
    increaseItem: (state, action) => {

        state.value = state.value.map(item => {
            if (item.id === action.payload) {
              // Create a *new* object with changes
              return { ...item, items: item.items+1 };
            } else {
              // No changes
              return item;
            }
          })
    },
    decreaseItem: (state, action) => {

        state.value = state.value.map(item => {
            if (item.id === action.payload) {
              // Create a *new* object with changes
              return { ...item, items: item.items-1 };
            } else {
              // No changes
              return item;
            }
          })
    },
    emptyCard: (state, action) => {
      
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove, increaseItem, decreaseItem, emptyCard } = cartSlice.actions

export default cartSlice.reducer