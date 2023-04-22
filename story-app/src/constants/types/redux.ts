import { Action } from "redux";

export type ReduxAction<P = undefined> =
    Action<string> & (P extends undefined ? { payload?: any } : { payload: P })