const fs = require("fs");

const jwt = require("jsonwebtoken");

function isAuth({ email, password }) {
  const usersDb = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

  return (
    usersDb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

function createToken(payload) {
  const SECRET_KEY = `1147230191`;
  const expiresIn = `1h`;

  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

exports.postLoginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!isAuth({ email, password })) {
    const status = 401;
    const message = "Incorrect login or password";
    res.status(status).json({ status, message });
    return;
  }

  const accessToken = createToken({ email, password });
  res.status(200).json({ accessToken });
};

exports.postAddContact = (req, res, next) => {
  const { name, phone } = req.body;

  fs.readFile("./contacts.json", (err, data) => {
    if (err) {
      const status = err.status;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    data = JSON.parse(data.toString());

    const lastId = data.contacts[data.contacts.length - 1].id || 1;
    data.contacts.push({ name, phone, id: lastId + 1 });

    fs.writeFile("./contacts.json", JSON.stringify(data), (err) => {
      if (err) {
        const status = err.status;
        const message = err;
        res.status(status).json({ status, message });
        return;
      }

      this.getContacts(req, res, next);
    });
  });
};

exports.getContacts = (req, res, next) => {
  const contactsDb = JSON.parse(fs.readFileSync("./contacts.json", "utf-8"));
  res.status(200).json(contactsDb.contacts);
};

exports.deleteContact = (req, res, next) => {
  const { id } = req.body;

  fs.readFile("./contacts.json", (err, data) => {
    if (err) {
      const status = err.status;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    data = JSON.parse(data.toString());
    data.contacts = data.contacts.filter((contact) => contact.id !== id);

    fs.writeFile("./contacts.json", JSON.stringify(data), (err) => {
      if (err) {
        const status = err.status;
        const message = err;
        res.status(status).json({ status, message });
        return;
      }

      this.getContacts(req, res, next);
    });
  });
};

exports.editContact = (req, res, next) => {
  const { contact, id } = req.body;
  console.log(contact);
  console.log(id);

  fs.readFile("./contacts.json", (err, data) => {
    if (err) {
      const status = err.status;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    data = JSON.parse(data.toString());
    const indexEditedContact = data.contacts.findIndex(
      (item) => item.id === id
    );

    data.contacts[indexEditedContact] = contact;

    let writeData = fs.writeFile(
      "./contacts.json",
      JSON.stringify(data),
      (err) => {
        if (err) {
          const status = err.status;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }

        this.getContacts(req, res, next);
      }
    );
  });
};
