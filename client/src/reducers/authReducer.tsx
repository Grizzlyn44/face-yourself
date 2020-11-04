import axios from "axios/axios"

export interface authReducerType {
    isSignedIn: boolean;
    email: string;
    id: string;
    sessionExpire: string;
    authLoading: boolean;
    authError: string;
}

export const AUTH_INIT = "AUTH_INIT"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_FAIL = "AUTH_FAIL"

const defaultState = {
    isSignedIn: false,
    email: null,
    id: null,
    sessionExpire: null,
    authLoading: false,
    authError: null
}

const authReducer = (state:authReducerType = defaultState, action) => {

    const authInit = () => {
        console.log("reducer", AUTH_INIT);
        const newState = {...state};
        newState.authLoading = true;
        signIn();
        return newState;
    }

    const signIn = async () => {
        axios.post("/api/signin", {
            email: "grizzlyn44@gmail.com",
            password: "123x"
        }).then(res => {
            console.log("res", res);
        }).catch(err => {
            console.log("err", err);
        })

    }
    
    const authSuccess = () => {
        console.log("reducer", AUTH_SUCCESS);
    }
    
    const authFail = () => {
        console.log("reducer", AUTH_FAIL)
    }

    switch(action.type) {
        case AUTH_INIT: 
            return authInit();
        case AUTH_SUCCESS: 
            return authSuccess();
        case AUTH_FAIL: 
            return authFail();
        default:
            return state;
    }

}

export default authReducer;