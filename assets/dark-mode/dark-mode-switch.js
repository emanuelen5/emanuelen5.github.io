/*!
 * Dark Mode Switch v1.0.1 (https://github.com/coliff/dark-mode-switch)
 * Copyright 2021 C.Oliff
 * Licensed under MIT (https://github.com/coliff/dark-mode-switch/blob/main/LICENSE)
 */

var darkSwitch = document.getElementById("darkSwitch");
window.addEventListener("load", function () {
  if (darkSwitch) {
    darkSwitch.addEventListener("change", function () {
      resetTheme();
    });
  }
});

function drawTheme(darkThemeSelected) {
  darkThemeSelected
    ? document.body.setAttribute("data-theme", "dark")
    : document.body.removeAttribute("data-theme");
}

/**
 * Summary: function that adds or removes the attribute 'data-theme' depending if
 * the switch is 'on' or 'off'.
 *
 * Description: initTheme is a function that uses localStorage from JavaScript DOM,
 * to store the value of the HTML switch. If the switch was already switched to
 * 'on' it will set an HTML attribute to the body named: 'data-theme' to a 'dark'
 * value. If it is the first time opening the page, or if the switch was off the
 * 'data-theme' attribute will not be set.
 * @return {void}
 */
function initTheme() {
  var darkThemeSelected =
    (localStorage.getItem("darkSwitch") === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) || 
    (localStorage.getItem("darkSwitch") !== null && localStorage.getItem("darkSwitch") === "dark");
  darkSwitch.checked = darkThemeSelected;
  drawTheme(darkThemeSelected);
}
initTheme();

/**
 * Summary: resetTheme checks if the switch is 'on' or 'off' and if it is toggled
 * on it will set the HTML attribute 'data-theme' to dark so the dark-theme CSS is
 * applied.
 * @return {void}
 */
function resetTheme() {
  drawTheme(darkSwitch.checked);
  if (darkSwitch.checked) {
    localStorage.setItem("darkSwitch", "dark");
  } else {
    localStorage.setItem("darkSwitch", "light");
  }
}