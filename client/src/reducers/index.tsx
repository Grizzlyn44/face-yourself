import { combineReducers } from "redux"
import authReducer, {authReducerType} from "reducers/authReducer"
import dashboardReducer, {dashboardReducerType} from "reducers/dashboardReducer"

export interface rootReducerType {
    authReducer: authReducerType,
    dashboardReducer: dashboardReducerType
}

const rootReducer = combineReducers({
    authReducer,
    dashboardReducer
})

export default rootReducer;