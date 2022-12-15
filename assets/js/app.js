const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);

// Query Selector
function qs(element, parent = document) {
  return parent.querySelector(element);
}

function redirectToURL(path) {
  var base_url = window.location.origin;
  window.location.href = base_url + path;
}

/**
 * @function fadeInWhileScrollUp
 * @description - This function gradually increases the alpha value of the div while scrolling up
 * @param {HTMLDivElement} element - Element to change color
 * @param {Object} color - Color in RGB Object format
 * @param {number} color.red - The red value of the color
 * @param {number} color.green - The red value of the color
 * @param {number} color.blue - The red value of the color
 * @param {number} color.alpha - The alpha value of the color
 * @param {number} speedFactor - Speed of the animation
 */
function fadeInWhileScrollUp(element, color, speedFactor = 0.4) {
  let elementRect = element.getBoundingClientRect();

  // The padding of the firstSlide causes this viewport height changes.
  // Works well if we subtract 60 from vh
  let calculatedPaddingHeight = 60;
  let screenHeight = vh - calculatedPaddingHeight;
  let aboutHeight = elementRect.height;

  // when it enters the viewport from the bottom, it increases the alpha value gradually
  // when it reaches quarter the viewport height from the top it changes the background color to #f4b724
  // when it reaches the bottom of the viewport it changes the background color to #f4b72400
  if (elementRect.top < screenHeight) {
    let alpha = (screenHeight - elementRect.top) / (aboutHeight / speedFactor);
    element.style.backgroundColor = `rgba(${color.red}, ${color.green}, ${color.blue}, ${alpha})`;
  } else if (
    elementRect.top < screenHeight &&
    elementRect.bottom > screenHeight
  ) {
    element.style.backgroundColor = `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`;
  } else {
    element.style.backgroundColor = `rgba(${color.red}, ${color.green}, ${color.blue}, 00)`;
  }
}

function fadeOutWhileScrollUp(element, color, speedFactor = 1.2) {
  let elementRect = element.getBoundingClientRect();

  let divPosition = elementRect.top;

  if (divPosition > 0) {
    element.style.backgroundColor = `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`;
    return;
  }

  let magnitude = Math.abs(divPosition);

  let alpha = 1 - magnitude / 350;
  alpha = Math.abs(alpha);

  if (divPosition < -350) return;
  element.style.backgroundColor = `rgba(${color.red}, ${color.green}, ${color.blue}, ${alpha})`;
}

function fadeAbout() {
  // Don't run if it's not the home page
  if (location.pathname != "/") return;
  let aboutDiv = qs(".about");
  let color = {
    red: 244,
    green: 183,
    blue: 36,
    alpha: 255,
  };
  fadeInWhileScrollUp(aboutDiv, color);
}

function fadeClient() {
  // Don't run if it's not the home page
  if (location.pathname != "/") return;
  let clients = qs(".clients");
  let color = {
    red: 77,
    green: 51,
    blue: 127,
    alpha: 255,
  };
  fadeOutWhileScrollUp(clients, color);
}

function fadePolesOfTestimonies() {
  // Don't run if it's not the home page
  if (location.pathname != "/") return;
  let divs = document.querySelectorAll(".whilePoleOfTestimonials");
  divs = [...divs];
  let color = {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 255,
  };
  fadeInWhileScrollUp(divs[0], color, 1);
  fadeInWhileScrollUp(divs[1], color, 1);
}

document.addEventListener(
  "scroll",
  (e) => {
    fadeAbout();
    fadeClient();
    fadePolesOfTestimonies();
  },
  { passive: true }
);

// Closing the menu div of click

// get all div with class itemNameAndIcon add event listener to it trigger js on click

let itemsInMenu = document.getElementsByClassName("closeOnClickMenu");
let menuBarTop = qs(".menuBar");
for (i = 0; i < itemsInMenu.length; i++) {
  itemsInMenu[i].addEventListener("click", () => {
    console.log("clicked");
    menuBarTop.style.display = "none";
  });
}
