import axios from "axios";
import { atom, selector } from "recoil";

const searchAtom = atom({
  key: "searchAtom",
  default: "",
});

export default searchAtom;
