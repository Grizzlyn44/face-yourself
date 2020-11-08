import {FetchedUserDataType, FetchedSignInDataType} from "types/fetchedTypes"

export interface authReducerType {
    isSignedIn: boolean;
    email: string;
    id: string;
    sessionExpire: number;
    authLoading: boolean;
    authError: string;
    authProcessLoading: boolean;
}

export const AUTH_INIT = "AUTH_INIT";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";

export const SIGN_IN_INIT = "SIGN_IN_INIT";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAIL = "SIGN_IN_FAIL";

const defaultState = {
    isSignedIn: false,
    email: null,
    id: null,
    sessionExpire: null,
    authLoading: true,
    authError: null,
    authProcessLoading: false
}

type ActionType = {
    type: string;
    payload: any;
}

const authReducer = (state:authReducerType = defaultState, action:ActionType) => {

    const authInit = () => {
        const newState: authReducerType = {
            ...state,
            authLoading: true
        }
        return newState;
    }
    
    const authSuccess = () => {
        const payloadData : FetchedUserDataType = action.payload;
        const data = payloadData.data

        let newState: authReducerType = {...state};

        console.log("payload", payloadData);

        if(data) {
            const {userId : id, email} = data
            newState = {
                ...newState,
                email,
                id,
                isSignedIn: true
            }
        }
        
        newState = {
            ...newState,
            authLoading: false
        }

        return newState;
    }
    
    const authFail = () => {
        //TODO - this should never be called
        return state;
    }

    const signInInit = () => {
        const newState: authReducerType = {
            ...state,
            authProcessLoading: true
        }
        return newState;
    }

    const signInSuccess = () => {
        const payloadData : FetchedSignInDataType = action.payload;
        const data = payloadData.data;
        
        console.log("payload",payloadData);

        let newState: authReducerType = {...state};

        if(data) {
            const { email, userId, exp } = data
            newState = {
                ...newState,
                email: email,
                id: userId,
                sessionExpire: exp,
                isSignedIn: true
            }
        }

        newState = {
            ...newState,
            authProcessLoading: false
        }

        return newState;
    }

    const signInFail = () => {
        console.log("payload", action.payload);
        const newState: authReducerType = {
            ...state,
            authProcessLoading: false
        }
        return newState;
    }

    switch(action.type) {
        //auth basic
        case AUTH_INIT: 
            return authInit();
        case AUTH_SUCCESS: 
            return authSuccess();
        case AUTH_FAIL: 
            return authFail();
        //auth process
        case SIGN_IN_INIT:
            return signInInit();
        case SIGN_IN_SUCCESS:
            return signInSuccess();
        case SIGN_IN_FAIL:
            return signInFail();
        default:
            return state;
    }

}

export default authReducer;