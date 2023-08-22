import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { userReducer } from "./Reducer";
import { persistStore, persistReducer } from "redux-persist";
import localforage from "localforage";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    user: userReducer,
});
// export default store;

// const store = createStore(reducer, composeEnhancers(applyMiddleware()));
const persistConfig = {
    key: "root",
    storage: localforage,
};
const pReducer = persistReducer(persistConfig, reducer);
const store = createStore(pReducer, composeEnhancers(applyMiddleware()));
const persistor = persistStore(store);

export { persistor, store };
