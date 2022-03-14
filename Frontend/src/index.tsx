import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/app/app";
import { createStore, applyMiddleware } from "redux";
import { reducer } from "./state/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createApi } from "./api";

const root = document.querySelector(`#root`);

const api = createApi();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
