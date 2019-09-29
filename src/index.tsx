import { initDepilation } from "./novokuznetsk/depilation";
import { initHairdresser } from "./novokuznetsk/hairdresser";
import { initIndexPage } from "./novokuznetsk/index";
import { initLashmakerPage } from "./novokuznetsk/lashmaker";
import { initMassagePage } from "./novokuznetsk/massage";

if (location.href.indexOf("massage.html") > 0) {
  initMassagePage();
} else if (location.href.indexOf("lashmaker.html") > 0) {
  initLashmakerPage();
} else if (location.href.indexOf("hairdresser.html") > 0) {
  initHairdresser();
} else if (location.href.indexOf("depilation.html") > 0) {
  initDepilation();
} else {
  initIndexPage();
}
