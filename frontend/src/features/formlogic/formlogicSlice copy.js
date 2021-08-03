import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { client_copy } from './client_copy'


// state holds everytab's copy of logic from "nocode" json exported from smartsheetdoc
const initialState = {
    // {tabId: 0, uniqueId: 0, formId: 0, division:  "DIVISION 03 - Concrete", costCode: "03 30 00- Cast-In-Place Concrete", costHeader: null, costItem: "Cast-In-Place Concrete", type:"HEADER", costComponents: null, value: null, unit:null},
    // {tabId: 1, uniqueId: 1, formId: 1, division:  "DIVISION 03 - Concrete", costCode: "03 30 00- Cast-In-Place Concrete", costHeader: "Cast-In-Place Concrete", costItem: "Foundation Footings", type:"Text Box", costComponents:  "Pour Volume", value: undefined, unit:"EA"}
    noCodeJson: [],
    status: 'idle',
    error: null
}
// tabId corresponds with which tab you are in
// uniqueId corresponds with the unique row of the state
// formId corresponds with the id number on the form on smartsheet (so each tab will have a copy of data with same sets of form ids)

export const fetchFormLogic= createAsyncThunk('formLogic/fetchFormLogic', async () => {
    const response = await client_copy.get('http://localhost:8000/data')
    return response
})

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
        [fetchFormLogic.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchFormLogic.fulfilled]: (state, action) => {
          state.status = 'succeeded'
          // Add any fetched posts to the array
          state.noCodeJson = state.noCodeJson.concat(action.payload)
        },
        [fetchFormLogic.rejected]: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        },
        [asyncPost.fulfilled]: (state, action) => {
            //   We can directly add the new post object to our posts array
              state.noCodeJson.push(action.payload)
              

            }
    },
  });

  export default formLogicSlice.reducer;

