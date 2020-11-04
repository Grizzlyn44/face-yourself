export interface dashboardReducerType {
    tasks: any[];
}

export const TASKS_LOAD_INIT = "TASKS_LOAD_INIT"

const tasksLoadInit = () => {
    console.log("reducer", TASKS_LOAD_INIT)
}

const defaultState = {
    tasks: []
}

const dashboardReducer = (state = defaultState, action) => {

    switch(action.type) {
        case TASKS_LOAD_INIT: 
            tasksLoadInit()
            break
        default:
            return state
            break
    }

}

export default dashboardReducer;