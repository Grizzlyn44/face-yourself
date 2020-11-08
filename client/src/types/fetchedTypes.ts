export type FetchedTypeBase = {
    messageCode: number;
    data: any;
}

export interface IFetchedUserDataType {
    email: string;
    userId: string;
    iat: number;
    exp: number;
}

export type FetchedUserDataType = FetchedTypeBase & {
    data: IFetchedUserDataType;
}

export interface IFetchedSignInDataType {
    email: string;
    userId: string;
    iat: number;
    exp: number;
}

export type FetchedSignInDataType = {
    data: IFetchedSignInDataType;
}