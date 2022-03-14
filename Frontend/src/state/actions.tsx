import { Contacts } from "../types";
import { ActionTypes } from "./action-types";

type ChangeAuthStaus = {
  type: ActionTypes.CHANGE_AUTH_STATUS;
  payload: boolean;
};

type SetErrorMessage = {
  type: ActionTypes.SET_ERROR_MESSAGE;
  payload: string;
};

type SetContacts = {
  type: ActionTypes.SET_CONTACTS;
  payload: Contacts[] | [];
};

type FilterContacts = {
  type: ActionTypes.FILTER_CONTACTS;
  payload: Contacts[] | [];
};

export type Action =
  | ChangeAuthStaus
  | SetErrorMessage
  | SetContacts
  | FilterContacts;
