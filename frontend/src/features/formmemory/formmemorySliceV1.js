import React from 'react';
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { isValidElement } from 'react';
import {client_copy} from '../formlogic/client_copy'

// state holds every tab's copy of form decisions that will be submitted into submit json into smartsheet database
const initialState = {
  intakeData: {
    entryType: '',
    projectEnumerator:'',
    subRVendor:'',
    newSubRVendor:'',
    newSubRVendorUrl:'',
    dateOfEntry:'',
    userCode:''
  },
  mainData:[
    {
      tabId: 0, 
      divisionChoice:'', 
      costCodeChoice:'', 
      costItemChoice:'', 
      costComponentItems:{}
    },
  ]
}

export const fetchFormMemory= createAsyncThunk('formMemory/fetchFormMemory', async () => {
    const response = await client_copy.get('http://localhost:9000/output')
    return response
})

// 'posts/addNewPost',
export const asyncPost = createAsyncThunk(
    'formMemory/asyncPost',
    // The payload creator receives the partial `{title, content, user}` object
    async initialPost => {
      // We send the initial data to the fake API server
      const response = await client_copy.post('http://localhost:9000/output', { formMemory: initialPost })
      // The response includes the complete post object, including unique ID
      return response.formMemory
    }
  )

export const formMemorySlice = createSlice({
    name: 'formMemory',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        divisionChoice: (state, action) => {
            const {tabId, divisionChoice} = action.payload
            state.mainData.map((mainData) => {
                if (mainData.tabId === tabId) {
                   mainData.divisionChoice = divisionChoice
                }
            })
        },
        costCodeChoice: (state, action) => {
            const {tabId, costCodeChoice} = action.payload
            state.mainData.map((mainData) => {
                if (mainData.tabId === tabId) {
                   mainData.costCodeChoice = costCodeChoice
                }
            })
        },
        costItemChoice: (state, action) => {
            const {tabId, costItemChoice} = action.payload
            state.mainData.map((mainData) => {
                if (mainData.tabId === tabId) {
                   mainData.costItemChoice = costItemChoice
                }
            })
        },
        costComponentConcat: (state, action) => {
          const {tabId, title, item} = action.payload
          state.mainData.map((mainData) => {
              if (mainData.tabId === tabId) {
                mainData.costComponentItems[title]=item
              }
          })
        },
        // costComponentCheckArray: (state, action) => {
        //   const {tabId, title, blank} = action.payload
        //   state.mainData.map((mainData) => {
        //       if (mainData.tabId === tabId) {
        //         mainData.costComponentItems[title]=blank
        //       }
        //   })
        // },
        // costComponentCheckArrayPush: (state, action) => {
        //   const {tabId, title, item} = action.payload
        //   state.mainData.map((mainData) => {
        //       if (mainData.tabId === tabId) {
        //         mainData.costComponentItems[title].push(item)
        //       }
        //   })
        // },
        costComponentReset: (state, action) => {
          state.mainData.map((mainData) => {
            const {tabId, blank} = action.payload
            if (mainData.tabId === tabId) {
              mainData.costComponentItems = blank
            }
          })
        },
        newTab: {
            reducer(state, action) {
              state.mainData.push(action.payload)
            },
            prepare(tabId, divisionChoice, costCodeChoice, costItemChoice, costComponentChoice) {
                return {
                  payload: {
                    tabId,
                    divisionChoice: "",
                    costCodeChoice: "",
                    costComponentItems: {},
                  }
                }
            }
        },
        deleteTab(state, action){
            state.filter((formMemory) => formMemory.tabId !== action.payload)
        },
        intakeDataSubmit(state, action){
          const {entryType,
          projectEnumerator,
          subRVendor,
          dateOfEntry,
          userCode} = action.payload
          state.intakeData.entryType = entryType
          state.intakeData.projectEnumerator = projectEnumerator
          state.intakeData.subRVendor = subRVendor 
          state.intakeData.dateOfEntry = dateOfEntry
          state.intakeData.userCode = userCode
        },
        intakeDataNewSubRVen(state, action){
          state.intakeData.newSubRVendor = action.payload
        },
        intakeDataNewSubRVenUrl(state, action){
          state.intakeData.newSubRVendorUrl = action.payload
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    // extraReducers: {
    //     [asyncPost.fulfilled]: (state, action) => {
    //     //   We can directly add the new post object to our posts array
    //       state.formMemory.push(action.payload)
    //     }
    // },
  });

  export default formMemorySlice.reducer;
