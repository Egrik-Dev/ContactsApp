import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../state/reducer";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
