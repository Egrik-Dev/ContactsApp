import React from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

type AppDispatchProps = {
  changeAuthStatus: Function;
};

const Header = (): JSX.Element => {
  const { isAuth } = useTypedSelector((state) => state);
  const { changeAuthStatus }: AppDispatchProps = useActions();

  const onLogoutClick = React.useCallback((): void => {
    if (isAuth) {
      localStorage.removeItem("login");
      changeAuthStatus(false);
    }
  }, []);

  return (
    <header className="page-header">
      <a href="/" className="page-header__logo">
        Contacts App
      </a>
      {isAuth ? (
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <img
                className="main-nav__img"
                src="./img/avatar.svg"
                alt="Avatar"
              />
              <button
                className="main-nav__btn"
                type="button"
                name="logout"
                onClick={onLogoutClick}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
