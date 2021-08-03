import React from 'react';
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { client_copy } from './client_copy'
import axios from 'axios';

// state holds everytab's copy of logic from "nocode" json exported from smartsheetdoc
const initialState = {
  intakeData:{
    getReceived: [],
    status: 'idle',
    error: null
  },
  mainData: {
    getReceived: [],
    status: 'idle',
    error: null
  },
}
// tabId corresponds with which tab you are in
// uniqueId corresponds with the unique row of the state
// formId corresponds with the id number on the form on smartsheet (so each tab will have a copy of data with same sets of form ids)

  
export const transformerHook = createAsyncThunk(
  'formLogic/transformerHook ',
  async initialPost => {
    const response = await client_copy.post('https://estimating-database.dowbuilt.io/restapi/transformers', { formLogic: initialPost })
    return response.formLogic
  }
)

export const fetchIntakeData= createAsyncThunk(
'formLogic/fetchIntakeData', 
  async (payload, {dispatch, rejectWithValue}) => {
    try {
      const res = axios.get('https://estimating-database.dowbuilt.io/restapi/intakedata')
      console.log(res)
      return res
    } catch (err) {
      if (!err.res){
        throw err
      }
    return rejectWithValue(err.response)
    }
  }
)

//export const fetchIntakeData= createAsyncThunk('formLogic/fetchIntakeData', async () => {
//  const response = await client_copy.get('http://localhost:3000/Initals')
//  return response
//})

export const fetchMainData= createAsyncThunk('formLogic/fetchMainData', async () => {
  const response = await client_copy.get('http://localhost:8000/data')
  return response
})

//WHY this has formMemmory on it??
export const asyncPost = createAsyncThunk(
    'formLogic/asyncPost',
    // The payload creator receives the partial `{title, content, user}` object
    async initialPost => {
      // We send the initial data to the fake API server
      const response = await client_copy.post('http://localhost:9000/output', { formMemory: initialPost })
      // The response includes the complete post object, including unique ID
      return response
    //   return response.formMemory
    }
  )

export const formLogicSlice = createSlice({
    name: 'formLogic',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        multitabDataRestructure: (state) => {
            if (state.noCodeJson.Division !== undefined) {
                state.noCodeJson.Division = {0: state.noCodeJson.Division, 1: state.noCodeJson.Division, 2: state.noCodeJson.Division, 3: state.noCodeJson.Division, 4: state.noCodeJson.Division, 5: state.noCodeJson.Division, 6: state.noCodeJson.Division}
                console.log('resturcture SUCCESS')
            } else {
                console.log('restructure FAIL!!')
            }
        },
    },
    extraReducers: {
      // intakeData
      [fetchIntakeData.pending]: (state, action) => {
        state.intakeData.status = 'loading'
      },
      [fetchIntakeData.fulfilled]: (state, action) => {
       state.intakeData.status = 'succeeded'
       // Add any fetched posts to the array
       state.intakeData.getReceived = state.intakeData.getReceived.concat(action.payload)
      },
      [fetchIntakeData.rejected]: (state, action) => {
       state.intakeData.status = 'failed'
       state.intakeData.error = action.error.message
      },

      // mainData action builders
      [fetchMainData.pending]: (state, action) => {
        state.mainData.status = 'loading'
      },
      [fetchMainData.fulfilled]: (state, action) => {
        state.mainData.status = 'succeeded'
        // Add any fetched posts to the array
        state.mainData.getReceived = state.mainData.getReceived.concat(action.payload)
      },
      [fetchMainData.rejected]: (state, action) => {
        state.mainData.status = 'failed'
        state.mainData.error = action.error.message
      },
      [asyncPost.fulfilled]: (state, action) => {
        state.noCodeJson.push(action.payload)
      },
      //[transformerHook.fulfilled]: (state, action) => {
      //  state.formLogic.push(action.payload)
      //},
      }
  });

  export default formLogicSlice.reducer;

