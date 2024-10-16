import "./style.css";
import { ViewModel } from "./viewModel";
import { Model } from "./model";

window.onload = () => {
  ViewModel().displayHomeScreen();
  ViewModel().bindEvents();
};
