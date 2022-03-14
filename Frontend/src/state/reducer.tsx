import { Action } from "./actions";
import { ActionTypes } from "./action-types";
import { Contacts } from "../types/index";

interface userState {
  isAuth: boolean;
  errorMessage: string;
  contacts: Contacts[];
  searchedContacts: Contacts[];
}

const initialState = {
  isAuth: false,
  errorMessage: "",
  contacts: [],
  searchedContacts: [],
};

export const reducer = (
  state: userState = initialState,
  action: Action
): userState => {
  switch (action.type) {
    case ActionTypes.CHANGE_AUTH_STATUS:
      return Object.assign({}, state, { isAuth: action.payload });
    case ActionTypes.SET_ERROR_MESSAGE:
      return Object.assign({}, state, { errorMessage: action.payload });
    case ActionTypes.SET_CONTACTS:
      return Object.assign({}, state, { contacts: action.payload });
    case ActionTypes.FILTER_CONTACTS:
      return Object.assign({}, state, { searchedContacts: action.payload });
    default:
      return state;
  }
};

export type RootState = ReturnType<typeof reducer>;
