import {GenerateBruxellesWeather, SetButtonsListeners, SetFormListener} from "./assets/js/usersActionsListeners.js";
import {InitializeCountries} from "./assets/js/helpers.js";

InitializeCountries();
await GenerateBruxellesWeather();
SetFormListener();
SetButtonsListeners();

