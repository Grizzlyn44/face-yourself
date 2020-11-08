import axios from "axios/axios";
import * as loadCodes from "types/loadCodes";
import * as endpointCodes from "types/endpointCodes";
import { FetchedUserDataType, FetchedSignInDataType } from "types/fetchedTypes";

export const load = async (code: loadCodes.CodesType, params: any): Promise<any> => {
  
    const promise = new Promise((resolve, reject) => {
      loadApi(code, params)
        .then(data => {
            // console.log("response", data); //DEBUG
            let tmpData = data.data;
          
            //if() for modify data
  
            //   return resolve(sortData(tmpData, code));
            return resolve(tmpData)
        })
        .catch(error => {
            // console.log("error", error); //DEBUG
            return reject(error);
        });
    });

    return promise;
}

const getUrl = (code: loadCodes.CodesType):endpointCodes.EndpointCodes => {
    switch (code) {
      case loadCodes.CODE_REQUEST_AUTH:
          return endpointCodes.CODE_ENDPOINT_AUTH;
      case loadCodes.CODE_REQUEST_SIGN_IN:
          return endpointCodes.CODE_ENDPOINT_SIGN_IN
        default:
          console.log(`CODE ${code} is not defined..`);
          return endpointCodes.CODE_ENDPOINT_UNDEFINED;
    }
}

export const loadApi = async ( code: loadCodes.CodesType, params: any ) => {
    const url = getUrl(code);
    return axios.post(url, params);
  }

export const loadUserData = async (params: any = {}): Promise<FetchedUserDataType> => { //dynamic <FetchedExtraEquipmentsType>
    return load(loadCodes.CODE_REQUEST_AUTH, params);
}

export const signIn = async (params: any = {}): Promise<FetchedSignInDataType> => { //dynamic <FetchedExtraEquipmentsType>
  return load(loadCodes.CODE_REQUEST_SIGN_IN, params);
}
