import React, { useState } from "react";
import Header from "../header/header";
import NewContact from "../new-contact/new-contact";
import Contact from "../contact/contact";
import { Navigate } from "react-router-dom";
import { Contacts } from "../../types/index";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

type DispatchProps = {
  fetchContacts: Function;
  addNewContact: Function;
  deleteContact: Function;
  editContact: Function;
  FilterContacts: Function;
};

const ContactsList = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const { isAuth, contacts, searchedContacts } = useTypedSelector(
    (state) => state
  );
  const {
    fetchContacts,
    addNewContact,
    deleteContact,
    editContact,
    FilterContacts,
  }: DispatchProps = useActions();

  React.useEffect((): void => {
    fetchContacts();
  }, []);

  const onAddContactClick = React.useCallback(
    (
      evt: React.FormEvent<HTMLFormElement>,
      name: string,
      phone: string
    ): void => {
      evt.preventDefault();
      addNewContact(name, phone);
    },
    []
  );

  const onDeleteButtonClick = React.useCallback((id: number): void => {
    deleteContact(id);
    setSearch("");
  }, []);

  const onEditContactClick = React.useCallback(
    (editedContact: Contacts): void => {
      editContact(editedContact, editedContact.id);
      setSearch("");
    },
    []
  );

  const onChangeTypeSearch = (
    evt: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const searchString = evt.currentTarget.value;
    setSearch(searchString);

    const filteredConts = contacts.filter(
      (cont) =>
        cont.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
        cont.phone.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
    );

    FilterContacts(searchString === "" ? contacts : filteredConts);
  };

  if (!isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Header />
      <main className="page-main">
        <h1 className="page-main__title title">Contacts list</h1>
        <section className="page-main__contacts contacts">
          <div className="contacts__search-user">
            <label className="visually-hidden" htmlFor="search-field"></label>
            <input
              className="contacts__search-input"
              type="search"
              name="search"
              id="search-field"
              placeholder="Search"
              value={search}
              onChange={(evt) => onChangeTypeSearch(evt)}
            />
          </div>
          <table className="contacts__table">
            <tbody>
              <tr className="contacts__table-row contacts__table-row--titles">
                <th className="contacts__table-title">Name</th>
                <th className="contacts__table-title">Phone</th>
                <th className="contacts__table-title">Action buttons</th>
              </tr>
              {searchedContacts.map((contact: Contacts) => (
                <Contact
                  key={contact.id}
                  contact={contact}
                  onDeleteButtonClick={onDeleteButtonClick}
                  onEditContactClick={onEditContactClick}
                />
              ))}
            </tbody>
          </table>
          <NewContact onAddContactClick={onAddContactClick} />
        </section>
      </main>
    </>
  );
};

export default ContactsList;
