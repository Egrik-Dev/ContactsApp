import React from "react";

type OwnProps = {
  onAddContactClick: Function;
};

const NewContact = ({ onAddContactClick }: OwnProps): JSX.Element => {
  const [name, setName] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");

  return (
    <form
      className="contacts__form"
      action="/add-person"
      method="post"
      onSubmit={(evt) => {
        setName("");
        setPhone("");
        onAddContactClick(evt, name, phone);
      }}
    >
      <h2 className="contacts__subtitle">Add new user</h2>
      <div className="contacts__form--container">
        <label className="visually-hidden" htmlFor="name-field">
          Name
        </label>
        <input
          className="contacts__input-text contacts__input-text--name"
          type="text"
          name="name"
          id="name-field"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="visually-hidden" htmlFor="email-field">
          Phone
        </label>
        <input
          className="contacts__input-text contacts__input-text--phone"
          type="tel"
          name="phone"
          id="phone-field"
          placeholder="Phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button className="contacts__add-btn">Add contact</button>
    </form>
  );
};

export default NewContact;
