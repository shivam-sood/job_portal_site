import reducer from "../reducer/reducer";
import { createStore } from "redux";

const initialState = { role: "guest", name: "", email: "" };
export const store = createStore(reducer, initialState);
