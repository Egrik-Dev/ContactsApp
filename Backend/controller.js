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

function getUserIndex(users, userId) {
  return users.findIndex((user) => user.id === Number(userId));
}

function giveUserNotFoundMsg(res) {
  const status = 401;
  const message = "User not found";
  return res.status(status).json({ status, message });
}

exports.postCreateUser = (req, res, next) => {
  const { email, password } = req.body;
  let id;

  if (isAuth({ email, password })) {
    const status = 401;
    const message = "This login already exists";
    res.status(status).json({ status, message });
    return;
  }

  fs.promises
    .readFile("./users.json", "utf-8")
    .then((data) => {
      data = JSON.parse(data.toString());
      id = data.users[data.users.length - 1]?.id + 1 || 1;
      data.users.push({ id, email, password, contacts: [] });

      return fs.promises.writeFile("./users.json", JSON.stringify(data));
    })
    .then(() => {
      const accessToken = createToken({ email, password, id });
      res.status(200).json({ accessToken, user: { email, id } });
    })
    .catch((err) => {
      const status = err.status;
      const message = err;
      res.status(status).json({ status, message });
      return;
    });
};

exports.postLoginUser = (req, res, next) => {
  const { email, password } = req.body;

  fs.promises
    .readFile("./users.json", "utf-8")
    .then((data) => {
      if (!isAuth({ email, password })) {
        const status = 401;
        const message = "Incorrect login or password";
        res.status(status).json({ status, message });
        return;
      }

      data = JSON.parse(data.toString());

      const userId = data.users.find(
        (user) => user.email === email && user.password === password
      ).id;

      const accessToken = createToken({ email, password, id: userId });
      res.status(200).json({ accessToken, user: { email, id: userId } });
    })
    .catch((err) => {
      const status = err.status;
      const message = err;
      res.status(status).json({ status, message });
      return;
    });
};

exports.postAddContact = (req, res, next) => {
  const { name, phone, userId } = req.body;
  let userContacts;

  fs.promises
    .readFile("./users.json", "utf-8")
    .then((data) => {
      data = JSON.parse(data.toString());

      const userIndex = getUserIndex(data.users, userId);

      if (userIndex === -1) {
        const status = 401;
        const message = "User not found";
        res.status(status).json({ status, message });
        return;
      }

      userContacts = data.users[userIndex].contacts;
      let lastContactsId = userContacts[userContacts.length - 1]?.id || 0;
      userContacts.push({ name, phone, id: lastContactsId + 1 });
      data.users[userIndex].contacts = userContacts;

      return fs.promises.writeFile("./users.json", JSON.stringify(data));
    })
    .then(() => {
      res.status(200).json(userContacts);
    })
    .catch((err) => {
      const status = err.status;
      const message = err;
      res.status(status).json({ status, message });
      return;
    });
};

exports.getContacts = (req, res, next) => {
  const userId = req.params.userId;

  fs.promises
    .readFile("./users.json", "utf-8")
    .then((data) => {
      data = JSON.parse(data.toString());

      const userIndex = getUserIndex(data.users, userId);

      if (userIndex === -1) return giveUserNotFoundMsg();

      const userContacts = data.users[userIndex].contacts;
      res.status(200).json(userContacts);
    })
    .catch((err) => {
      const status = err.status;
      const message = err;
      res.status(status).json({ status, message });
      return;
    });
};

exports.deleteContact = (req, res, next) => {
  const { contactId, userId } = req.body;
  let userContacts;

  fs.promises
    .readFile("./users.json", "utf-8")
    .then((data) => {
      data = JSON.parse(data.toString());

      const userIndex = getUserIndex(data.users, userId);

      if (userIndex === -1) return giveUserNotFoundMsg();

      userContacts = data.users[userIndex].contacts;
      userContacts = userContacts.filter((contact) => contact.id !== contactId);
      data.users[userIndex].contacts = userContacts;

      return fs.promises.writeFile("./users.json", JSON.stringify(data));
    })
    .then(() => {
      res.status(200).json(userContacts);
    });
};

exports.editContact = (req, res, next) => {
  const { contact, contactId, userId } = req.body;
  let userContacts;

  fs.promises
    .readFile("./users.json", "utf-8")
    .then((data) => {
      data = JSON.parse(data.toString());

      const userIndex = getUserIndex(data.users, userId);

      if (userIndex === -1) return giveUserNotFoundMsg();

      userContacts = data.users[userIndex].contacts;

      const indexEditedContact = userContacts.findIndex(
        (item) => item.id === Number(contactId)
      );

      userContacts[indexEditedContact] = contact;
      data.users[userIndex].contacts = userContacts;

      return fs.promises.writeFile("./users.json", JSON.stringify(data));
    })
    .then(() => {
      res.status(200).json(userContacts);
    })
    .catch((err) => {
      const status = err.status;
      const message = err;
      res.status(status).json({ status, message });
      return;
    });
};
