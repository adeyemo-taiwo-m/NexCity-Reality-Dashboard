import { useContext } from "react";
import { DarkModeContext } from "../features/contexts/DarkModeContext";

export default function useDarkMode() {
  const contexts = useContext(DarkModeContext);
  if (!contexts) {
    throw new Error("context is called outside the DarkMode provider");
  } else return contexts;
}
