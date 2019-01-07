import { initIndexPage } from "./novokuznetsk/index";
import { initLashmakerPage } from "./novokuznetsk/lashmaker";
import { initMassagePage } from "./novokuznetsk/massage";

if (location.href.indexOf("massage.html") > 0) {
  initMassagePage();
} else if (location.href.indexOf("lashmaker.html") > 0) {
  initLashmakerPage();
} else {
  initIndexPage();
}
