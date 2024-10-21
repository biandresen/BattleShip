import "./style.css";
import { ViewModel } from "./ViewModel.js";
import { Model } from "./Model.js";

window.onload = () => {
  ViewModel().displayHomeScreen();
  ViewModel().bindEvents();
};
