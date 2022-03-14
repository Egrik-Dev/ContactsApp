import { ActionTypes } from "./action-types";
import axios, { AxiosInstance, AxiosError } from "axios";
import { Dispatch } from "redux";
import { RootState } from "../state/reducer";
import { Contacts } from "../types/index";

const authAction =
  (email: string, password: string) =>
  (dispatch: Dispatch, _getState: RootState, api: AxiosInstance): void => {
    api
      .post(`/login`, { email, password })
      .then((response) => {
        localStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: true,
            token: response.data.accessToken,
          })
        );
        dispatch(changeAuthStatus(true));
        dispatch(setErrorMessage(""));
      })
      .catch((err: AxiosError) => {
        if (axios.isAxiosError(err) && err.response)
          dispatch(setErrorMessage(err.response.data.message));
      });
  };

const fetchContacts =
  () =>
  (
    dispatch: Dispatch,
    _getState: RootState,
    api: AxiosInstance
  ): Promise<void> =>
    api.get(`/contacts`).then(({ data }: { data: Contacts[] }) => {
      dispatch(SetContacts(data));
      dispatch(FilterContacts(data));
    });

const addNewContact =
  (name: string, phone: string) =>
  (
    dispatch: Dispatch,
    _getState: () => {},
    api: AxiosInstance
  ): Promise<void> =>
    api
      .post(`/add-contact`, { name, phone })
      .then(({ data }: { data: Contacts[] }) => {
        dispatch(SetContacts(data));
        dispatch(FilterContacts(data));
      });

const deleteContact =
  (id: number) =>
  (
    dispatch: Dispatch,
    _getState: () => {},
    api: AxiosInstance
  ): Promise<void> =>
    api
      .post(`/delete-contact`, { id })
      .then(({ data }: { data: Contacts[] }) => {
        dispatch(SetContacts(data));
        dispatch(FilterContacts(data));
      });

const editContact =
  (contact: Contacts, id: number) =>
  (
    dispatch: Dispatch,
    _getState: () => {},
    api: AxiosInstance
  ): Promise<void> =>
    api
      .post(`/edit-contact`, { contact, id })
      .then(({ data }: { data: Contacts[] }) => {
        dispatch(SetContacts(data));
        dispatch(FilterContacts(data));
      });

const changeAuthStatus = (status: boolean) => ({
  type: ActionTypes.CHANGE_AUTH_STATUS,
  payload: status,
});

const setErrorMessage = (message: string) => ({
  type: ActionTypes.SET_ERROR_MESSAGE,
  payload: message,
});

const SetContacts = (contacts: Contacts[] | []) => ({
  type: ActionTypes.SET_CONTACTS,
  payload: contacts,
});

const FilterContacts = (contacts: Contacts[] | []) => ({
  type: ActionTypes.FILTER_CONTACTS,
  payload: contacts,
});

export const actionCreators = {
  changeAuthStatus,
  authAction,
  fetchContacts,
  addNewContact,
  deleteContact,
  editContact,
  FilterContacts,
};
