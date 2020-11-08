import * as authReducer from "reducers/authReducer"
import {loadUserData, signIn} from "utils/requests"

export const authInitAction = () => {
    return { type: authReducer.AUTH_INIT }
}

const errHandler = (err) => {
    console.log("error", err);
}

export const authLoadUserDataAction = () => async (dispatch, getState) => {
    await loadUserData().then(userData => {
        return dispatch({ type: authReducer.AUTH_SUCCESS, payload: userData })
    }).catch(err => {
        errHandler(err);
        return dispatch({ type: authReducer.AUTH_FAIL })
    })
}

export const authProcessInitAction = () => {
    return { type: authReducer.SIGN_IN_INIT }
}

export const authProcessSignInAction = (formData) => async (dispatch, getState) => {
    await signIn(formData).then(userData => {
        return dispatch({ type: authReducer.SIGN_IN_SUCCESS, payload: userData })
    }).catch(err => {
        errHandler(err);
    });
}