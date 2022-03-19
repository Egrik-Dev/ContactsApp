import { ActionTypes } from "./action-types";
import axios, { AxiosInstance, AxiosError } from "axios";
import { Dispatch } from "redux";
import { RootState } from "../state/reducer";
import { Contacts, User } from "../types/index";

const authAction =
  (email: string, password: string, requestName: string) =>
  (dispatch: Dispatch, _getState: RootState, api: AxiosInstance): void => {
    api
      .post(requestName, { email, password })
      .then((response) => {
        localStorage.setItem(
          "login",
          JSON.stringify({
            user: response.data.user,
            userLogin: true,
            token: response.data.accessToken,
          })
        );
        dispatch(changeAuthStatus(true));
        dispatch(
          setUser({
            email: response.data.user.email,
            id: response.data.user.id,
          })
        );
        dispatch(setErrorMessage(""));
      })
      .catch((err: AxiosError) => {
        if (axios.isAxiosError(err) && err.response)
          dispatch(setErrorMessage(err.response.data.message));
      });
  };

const fetchContacts =
  (userId: number) =>
  (
    dispatch: Dispatch,
    _getState: RootState,
    api: AxiosInstance
  ): Promise<void> =>
    api.get(`/contacts/${userId}`).then(({ data }: { data: Contacts[] }) => {
      dispatch(SetContacts(data));
      dispatch(FilterContacts(data));
    });

const addNewContact =
  (name: string, phone: string, userId: number) =>
  (
    dispatch: Dispatch,
    _getState: () => {},
    api: AxiosInstance
  ): Promise<void> =>
    api
      .post(`/add-contact`, { name, phone, userId })
      .then(({ data }: { data: Contacts[] }) => {
        dispatch(SetContacts(data));
        dispatch(FilterContacts(data));
      });

const deleteContact =
  (contactId: number, userId: number) =>
  (
    dispatch: Dispatch,
    _getState: () => {},
    api: AxiosInstance
  ): Promise<void> =>
    api
      .post(`/delete-contact`, { contactId, userId })
      .then(({ data }: { data: Contacts[] }) => {
        dispatch(SetContacts(data));
        dispatch(FilterContacts(data));
      });

const editContact =
  (contact: Contacts, contactId: number, userId: number) =>
  (
    dispatch: Dispatch,
    _getState: () => {},
    api: AxiosInstance
  ): Promise<void> =>
    api
      .post(`/edit-contact`, { contact, contactId, userId })
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

const setUser = (user: User) => ({
  type: ActionTypes.SET_USER,
  payload: user,
});

export const actionCreators = {
  changeAuthStatus,
  authAction,
  fetchContacts,
  addNewContact,
  deleteContact,
  editContact,
  FilterContacts,
  setUser,
};
