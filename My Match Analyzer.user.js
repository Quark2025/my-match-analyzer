// ==UserScript==
// @name           My Match Analyzer
// @namespace      *trophymanager.com/matches*
// @include        *trophymanager.com/matches*
// @version        4
// @grant          none
// @description:en My Match Analyzer For TM
// @description My Match Analyzer For TM
// @downloadURL    https://github.com/Quark2025/my-match-analyzer/raw/refs/heads/main/My%20Match%20Analyzer.user.js
// @updateURL      https://github.com/Quark2025/my-match-analyzer/raw/refs/heads/main/My%20Match%20Analyzer.user.js
// ==/UserScript==

function installFunc(source) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
}

/*
Taken from http://www.tomhoppe.com/index.php/2008/03/dynamically-adding-css-through-javascript/
*/
function addCss(cssCode) {
  var styleElement = document.createElement("style");
  styleElement.type = "text/css";
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = cssCode;
  } else {
    styleElement.appendChild(document.createTextNode(cssCode));
  }
  document.getElementsByTagName("head")[0].appendChild(styleElement);
}

function loadJS(filename) {
  var fileref = document.createElement('script');
  fileref.setAttribute("type", "text/javascript");
  fileref.setAttribute("src", filename);
  document.getElementsByTagName("head")[0].appendChild(fileref);
}

function clickAnalyze() {
  // get match id
  var mid = document.URL.split(".com/")[1].split("/")[1].split("#")[0].split("?")[0];
  container = document.getElementById("mma_data");
  value = JSON.stringify(match_data);
  container.value = value;

  midc = document.getElementById("mma_mid");
  midc.value = JSON.stringify(match_id);

  mids = document.getElementById("mma_season");
  mids.value = JSON.stringify($("a[title]").first().html().split('&nbsp;')[1]);

  if (!end_of_game)
    alert("Wait for match to end");
  else {
    myform = document.getElementById("mma_form");
    myform.action = "https://mymatchanalyzer.com/mma/report.php";
    myform.submit();
  }
}

function clickSave() {
  // get match id
  midc = document.getElementById("mma_mid");
  midc.value = JSON.stringify(match_id);

  mids = document.getElementById("mma_season");
  mids.value = JSON.stringify($("a[title]").first().html().split('&nbsp;')[1]);

  if (!end_of_game)
    alert("Wait for match to end");
  else {
    myform = document.getElementById("mma_form");
    myform.action = "https://mymatchanalyzer.com/mma/savereport.php";
    myform.submit();
  }
}

window.addEventListener('load', function (e) {
  installFunc(clickAnalyze);
  installFunc(clickSave);
  installFunc(addCss);
  installFunc(loadJS);

  var fileref = document.createElement('script');
  fileref.setAttribute("type", "text/javascript");
  fileref.setAttribute("src", "https://mymatchanalyzer.com/mma/json2.js");

  document.getElementsByTagName("head")[0].appendChild(fileref);

  loadJS("https://mymatchanalyzer.com/mma/json2.js");

  addCss(".mma_big { height: 30px; width: 400px; background: url(https://mymatchanalyzer.com/mma/scr_back.png); position: fixed; bottom: 0px; left: 10px; z-index: 10; }");
  addCss(".mma_analyze { left: 200px; top: 5px; height: 20px; position: relative; width: 60px; float: left; background: url(https://mymatchanalyzer.com/mma/analyze.png); }");
  addCss(".mma_analyze:hover { background: url(https://mymatchanalyzer.com/mma/analyze_hover.png); cursor: pointer; }");
  addCss(".mma_saverep { left: 220px; top: 5px; height: 20px; position: relative; width: 100px; float: left; background: url(https://mymatchanalyzer.com/mma/saverep.png); }");
  addCss(".mma_saverep:hover { background: url(https://mymatchanalyzer.com/mma/saverep_hover.png); cursor: pointer; }");

  thisform = document.createElement("form");
  thisform.method = "post";
  thisform.setAttribute("id", "mma_form");
  thisform.setAttribute("target", "_blank");

  formmid = document.createElement("input");
  formmid.setAttribute("id", "mma_mid");
  formmid.setAttribute("type", "hidden");
  formmid.setAttribute("name", "mid");

  thisform.appendChild(formmid);

  formseason = document.createElement("input");
  formseason.setAttribute("id", "mma_season");
  formseason.setAttribute("type", "hidden");
  formseason.setAttribute("name", "season");

  thisform.appendChild(formseason)

  formdata = document.createElement("input");
  formdata.setAttribute("id", "mma_data");
  formdata.setAttribute("type", "hidden");
  formdata.setAttribute("name", "data");

  thisform.appendChild(formdata);

  document.body.appendChild(thisform);

  div = document.createElement("div");
  div.setAttribute("class", "mma_big");

  div.innerHTML = '<div class="mma_analyze" onclick="clickAnalyze();"></div><div class="mma_saverep" onclick="clickSave();"></div>';
  document.body.appendChild(div);

}, false);
