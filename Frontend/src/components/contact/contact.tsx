import React from "react";
import { Contacts } from "../../types";

type OwnProps = {
  contact: Contacts;
  onDeleteButtonClick: Function;
  onEditContactClick: Function;
};

const Contact = ({
  contact,
  onDeleteButtonClick,
  onEditContactClick,
}: OwnProps): JSX.Element => {
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>(contact.name);
  const [phone, setPhone] = React.useState<string>(contact.phone);

  const onEditClick = (editedContact: Contacts): void => {
    setEditMode(false);
    onEditContactClick(editedContact);
  };

  return (
    <>
      {editMode ? (
        <tr className="contacts__table-row">
          <td className="contacts__table-definition">
            <label className="visually-hidden" htmlFor="name-field"></label>
            <input
              type="text"
              className="contacts__table-input contacts__table-input--name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </td>
          <td className="contacts__table-definition">
            <label className="visually-hidden" htmlFor="phone-field"></label>
            <input
              type="text"
              className="contacts__table-input contacts__table-input--phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </td>
          <td className="contacts__table-edit">
            <button
              className="contacts__table-btn contacts__table-btn--save"
              type="button"
              onClick={() => onEditClick({ name, phone, id: contact.id })}
            >
              Save
            </button>
          </td>
        </tr>
      ) : (
        <tr className="contacts__table-row">
          <td className="contacts__table-definition">{contact.name}</td>
          <td className="contacts__table-definition contacts__table-definition--phone">
            {contact.phone}
          </td>
          <td className="contacts__table-actions">
            <button
              className="contacts__table-btn contacts__table-btn--edit"
              type="button"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
            <button
              className="contacts__table-btn contacts__table-btn--delete"
              type="button"
              onClick={() => onDeleteButtonClick(contact.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

export default Contact;
