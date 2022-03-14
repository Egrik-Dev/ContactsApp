import React, { useState } from "react";
import Header from "../header/header";
import { Navigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Auth = (): JSX.Element => {
  const { isAuth, errorMessage } = useTypedSelector((state) => state);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { authAction, changeAuthStatus } = useActions();

  const isLoginTrue = JSON.parse(localStorage.getItem("login") || "{}");

  React.useEffect((): void => {
    if (isLoginTrue && isLoginTrue.userLogin) {
      changeAuthStatus(true);
    }
  }, []);

  const onLoginClick = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    authAction(email, password);
  };

  if (isAuth) {
    return <Navigate to={"/contacts"} />;
  }

  return (
    <>
      <Header />
      <main className="page-main">
        <h1 className="page-main__title title">Sign in</h1>
        <section className="page-main__sign-in sign-in">
          <div className="sign-in__block">
            {errorMessage ? (
              <p style={{ color: "red", textAlign: "center" }}>
                {errorMessage}
              </p>
            ) : (
              ""
            )}
            <form
              className="sign-in__form"
              action="/sign-in"
              method="post"
              onSubmit={onLoginClick}
            >
              <div className="sign-in__input-block">
                <label className="visually-hidden" htmlFor="email-field">
                  E-mail
                </label>
                <input
                  className="sign-in__input"
                  name="email"
                  id="email-field"
                  type="email"
                  placeholder="E-mail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="sign-in__input-block">
                <label className="visually-hidden" htmlFor="password-field">
                  Password
                </label>
                <input
                  className="sign-in__input"
                  name="password"
                  id="password-field"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <button className="sign-in__btn" type="submit">
                Login
              </button>
              <button className="sign-in__btn" type="submit">
                Register
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Auth;
