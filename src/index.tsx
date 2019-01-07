import { initIndexPage } from "./nvkz/index";
import { initLashmakerPage } from "./nvkz/lashmaker";
import { initMassagePage } from "./nvkz/massage";

if (location.href.indexOf("massage.html") > 0) {
  initMassagePage();
} else if (location.href.indexOf("lashmaker.html") > 0) {
  initLashmakerPage();
} else {
  initIndexPage();
}
