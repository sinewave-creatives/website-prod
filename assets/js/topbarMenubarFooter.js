// Query Selector
function qs(element, parent = document) {
  return parent.querySelector(element);
}

let topBar = qs(".topBar");

let menuBar = qs(".menuBar");
let menuButton = qs("#menuButton");
let closeMenu = qs("#closeMenu");
let servicesButton = qs("#servicesButton");
let contactsButton = qs("#contactsButton");
let closeServices = qs("#closeServices");
let closeContacts = qs("#closeContacts");
let firstMenu = qs(".firstMenu");
let secondMenu = qs(".secondMenu");
let thirdMenu = qs(".thirdMenu");
let firstMenuDecoy = qs(".firstMenuDecoy");
let secondMenuDecoy = qs(".secondMenuDecoy");
let thirdMenuDecoy = qs(".thirdMenuDecoy");
let rights = qs(".rights");

let oldValue = 0;
let newValue = 0;

menuButton.addEventListener("click", () => {
  menuBar.style.display = "flex";
  showFirstMenu();
  // menuBar.style.height = `${getRequiredMenuBarHeight(firstMenu)}px`
  // menuBar.style.width = `${getRequiredMenuBarWidth(firstMenu)}px`
});
closeMenu.addEventListener("click", () => {
  menuBar.style.display = "none";
  // menuBar.style.transform = "translateY(0)"
  // console.log("Executed Closemenu")
});
servicesButton.addEventListener("click", (e) => {
  e.stopPropagation();
  showSecondMenu();
  // scrollSelectedMenuIntoView(secondMenuDecoy)
  // menuBar.style.height = `${getRequiredMenuBarHeight(secondMenu, qs(".social"))}px`
  // menuBar.style.width = `${getRequiredMenuBarWidth(secondMenu)}px`
});
closeServices.addEventListener("click", (e) => {
  e.stopPropagation();
  showFirstMenu();
  // scrollSelectedMenuIntoView(firstMenuDecoy)
  // menuBar.style.height = `${getRequiredMenuBarHeight(firstMenu)}px`
  // menuBar.style.width = `${getRequiredMenuBarWidth(firstMenu)}px`
});

contactsButton.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("CLiecked");

  showThirdMenu();
  // scrollSelectedMenuIntoView(secondMenuDecoy)
  // menuBar.style.height = `${getRequiredMenuBarHeight(secondMenu, qs(".social"))}px`
  // menuBar.style.width = `${getRequiredMenuBarWidth(secondMenu)}px`
});
closeContacts.addEventListener("click", (e) => {
  e.stopPropagation();
  showFirstMenu();
  // scrollSelectedMenuIntoView(firstMenuDecoy)
  // menuBar.style.height = `${getRequiredMenuBarHeight(firstMenu)}px`
  // menuBar.style.width = `${getRequiredMenuBarWidth(firstMenu)}px`
});

function showFirstMenu() {
  secondMenu.style.display = "none";
  firstMenu.style.display = "block";
  thirdMenu.style.display = "none";
}

function showSecondMenu() {
  firstMenu.style.display = "none";
  secondMenu.style.display = "block";
  thirdMenu.style.display = "none";
}

function showThirdMenu() {
  firstMenu.style.display = "none";
  secondMenu.style.display = "none";
  thirdMenu.style.display = "block";
}

function getRequiredMenuBarHeight(element, sample = qs(".menuItem")) {
  let menuItemHeight = sample.offsetHeight;
  let length = element.children.length;
  let padding = menuBar.style.paddingTop * 2;
  return menuItemHeight * length + padding;
}

function getRequiredMenuBarWidth() {
  let menuItemWidth = qs(".menuItem").offsetWidth;
  let padding = menuBar.style.paddingLeft;
  console.log(menuItemWidth + padding);
  return menuItemWidth + padding;
}

// TODO doubtful
// document.addEventListener("click", (e) => {
// 	console.log(e.target.classList)
// 	if (!e.target.classList.contains("menuStuff")) {
// 		menuBar.style.display = "none"
// 	}
// })

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    menuBar.style.display = "none";
  }
});

document.addEventListener(
  "scroll",
  () => {
    showOrHideTopBarOnScroll();
  },
  { passive: true }
);

// TODO dynamic year
// rights.innerHTML = `© ${new Date().getFullYear()} by Sinewave`

function showOrHideTopBarOnScroll() {
  let currentScrollPos = window.pageYOffset;
  newValue = window.pageYOffset;
  if (oldValue < newValue) {
    if (currentScrollPos > 50) {
      topBar.classList.add("hideTopBar");
    }
  } else if (oldValue > newValue) {
    if (topBar.classList.contains("hideTopBar")) {
      topBar.classList.remove("hideTopBar");
    }
  }
  oldValue = newValue;
}

window.post = function (url, data) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

async function clearContact() {
  document.getElementById("email").value = "";
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("type").value = "";
  document.getElementById("query").value = "";
}

async function submitContact() {
  email = document.getElementById("email").value.trim();
  person = document.getElementById("name").value.trim();
  phone = document.getElementById("phone").value.trim();
  type = document.getElementById("type").value.trim();
  query = document.getElementById("query").value.trim();
  await clearContact();
  if (email && person && email && type) {
    res = await post("/.netlify/functions/mail", {
      email: email,
      name: person,
      phone: phone,
      type: type,
      query: query,
    });
    data = await res.json();
    console.log(data);
  } else {
    alert("Please fill all the fields");
  }
}
