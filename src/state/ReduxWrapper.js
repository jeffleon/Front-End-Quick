
import React from "react"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "."


const initialState = {}
const middleware = [thunk]
/* Redux wrapper its for redux work in Gatsby project */
const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
)

export default ({ element }) => <Provider store={store}>{element}</Provider>