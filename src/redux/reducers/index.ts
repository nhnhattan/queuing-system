import { combineReducers } from "redux"
import postReducers from "./postReducers"

const reducer = combineReducers({
    posts: postReducers
})

export default (state: any, action: any) => reducer(state, action)
