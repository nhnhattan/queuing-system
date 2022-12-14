import { createStore, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import thunk from "redux-thunk"

import reducers from "./reducers/index"

const middleware = [ thunk ];


export const store = createStore(
    reducers,
    applyMiddleware(...middleware)
  )
