import CombinedReducer from './reducer/CombinedReducer'
import { createStore } from 'redux'

const initialState = createStore(CombinedReducer)

export default initialState
