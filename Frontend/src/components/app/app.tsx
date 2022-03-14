import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../auth/auth";
import ContactsList from "../contacts-list/contacts-list";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/contacts" element={<ContactsList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
