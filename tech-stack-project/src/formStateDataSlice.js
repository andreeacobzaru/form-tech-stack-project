import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {}
}

export const formStateDataSlice = createSlice({
  name: 'formStateData', 
  initialState,
  reducers: {
    nextReducer: (state, action) => {
      // console.log("in nextReducer")
      const newState = { ...state.data, ...action.payload};
      state.data = newState;
    },
    prevReducer: (state, action) => {
      // console.log("in prevReducer")
      const newState = { ...state.data, ...action.payload};
      state.data = newState;
    },
    submitReducer: (state, action) => {
      // console.log("in submitReducer")
      const newState = { ...state.data, ...action.payload};
      if (!newState.isminprem) {
        delete newState.minprem;
      }
      delete newState.isminprem;
      state.data = newState;
    },
    changeReducer: (state, action) => {
      // console.log("in changeReducer")
      const newState = { ...state.data, ...action.payload};
      state.data = newState;
    },
    nameChangeReducer: (state, action) => {
      // console.log("In nameChangeReducer", action.payload);
      if (action.payload.formdataByName != null) {
        const { __typename, id, ...rest } = action.payload.formdataByName;
        const newState = { ...state.data, ...rest};
        if (newState.minprem !== null) {
          newState.isminprem = true;
        } else {
          newState.isminprem = false;
        }
        state.data = newState;
      } 
    },
    resetReducer: (state, action) => {
      // console.log("In resetReducer", action.payload);
      const newState = {"name":action.payload};
      state.data = newState;
    }
  },
})

export const { nextReducer, prevReducer, submitReducer, changeReducer, nameChangeReducer, resetReducer} = formStateDataSlice.actions

export default formStateDataSlice.reducer