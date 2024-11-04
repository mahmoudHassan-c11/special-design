let boxSetting = document.querySelector(".box-setting");
let boxSettingToggle = document.querySelector(".toggole-settings .fa-gear");

boxSettingToggle.addEventListener("click", () => {
  boxSetting.classList.toggle("open");
  boxSettingToggle.classList.toggle("fa-spin");
});

// Switch Color

let colorsLi = document.querySelectorAll(".colors-list li");
if (window.localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("color")
  );
  // Remove Active Class From all Lis
  colorsLi.forEach((li) => {
    li.classList.remove("active");
  });
  // [3] Add Active Class To Current Color
  document
    .querySelector(`[data-color="${window.localStorage.getItem("color")}"]`)
    .classList.add("active");
}
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    hundleActive(e);
    window.localStorage.setItem("color", e.currentTarget.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      window.localStorage.getItem("color")
    );
  });
});
// Switch Random Background Image
let randomBackEl = document.querySelectorAll(".random-background span");
let randomBackgroundState = true;

let randomBackgroundOption = localStorage.getItem("random-background-option");

if (randomBackgroundOption !== null) {
  if (randomBackgroundOption === "true") {
    randomBackgroundState = true;
  } else {
    randomBackgroundState = false;
  }
  // Remove Class Active From All Span
  randomBackEl.forEach((ele) => {
    ele.classList.remove("active");
  });

  // Add Class Active
  if (randomBackgroundOption === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    hundleActive(e);

    if (e.currentTarget.dataset.background === "yes") {
      randomBackgroundState = true;
      randomizeImg();
      window.localStorage.setItem("random-background-option", true);
    } else {
      randomBackgroundState = false;
      clearInterval(mySetInterval);
      window.localStorage.setItem("random-background-option", false);
    }
  });
});

// Random Background Option

// Select Landing Page
let landingPage = document.querySelector(".landing-page");

// Get Array of Background Images
let imageArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

let mySetInterval;

function randomizeImg() {
  if (randomBackgroundState === true) {
    mySetInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imageArray.length);

      //   Change Background Image Url
      landingPage.style.backgroundImage = `url("image/${imageArray[randomNumber]}")`;
    }, 1000);
    colorsLi.forEach((li) => {
      li.classList.remove("active");
    });
    // [3] Add Active Class To Current Color
    document
      .querySelector(`[data-color="${window.localStorage.getItem("color")}"]`)
      .classList.add("active");
  } else {
    clearInterval(mySetInterval);
  }
}

randomizeImg();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillOffsetTop = ourSkills.offsetTop;
  // Skills Outer Height
  let skillOuterHeight = ourSkills.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillOffsetTop + skillOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(".skill-progress span");
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup with image

let ourGallery = document.querySelectorAll(".gallery .img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");

    // Add Class Overlay to The Element
    overlay.className = "popup-overlay";

    // Append Overlay Element
    document.body.appendChild(overlay);

    // Create Popup Box
    let popupBox = document.createElement("div");

    // Add Class To The Popup Box
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      // Create Heading Element
      let titleImg = document.createElement("h3");

      // Add Class To The Heading Element
      titleImg.className = "img-title";

      // Add text Node To the Element
      let textImg = document.createTextNode(img.alt);

      // Append Text Node
      titleImg.appendChild(textImg);

      // Append Heading Element
      popupBox.appendChild(titleImg);
    }

    // Create Img
    let imgPopup = document.createElement("img");

    // Set Img Source
    imgPopup.src = img.src;

    // Append Img Element
    popupBox.appendChild(imgPopup);

    // Append popupBox Element
    document.body.appendChild(popupBox);

    // Create Close Button
    let closeButton = document.createElement("div");

    // Create Text Node
    let closeTxt = document.createTextNode("X");

    // Append Text Node To The Close Button
    closeButton.appendChild(closeTxt);

    // Add Class To the Element
    closeButton.className = "popup-close";

    popupBox.appendChild(closeButton);
  });
});
// Close Popup
document.addEventListener("click", (e) => {
  if (e.target.className == "popup-close") {
    // Remove Current Popup Box
    e.target.parentNode.remove();

    // Remove The Overlay

    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bullets

let allBullets = document.querySelectorAll(".nav-bullets .bullets");
let allLiLinkNav = document.querySelectorAll(".header-area ul.links li a");

function schrollTo(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

schrollTo(allBullets);
schrollTo(allLiLinkNav);

function hundleActive(ev) {
  // Remove Active Class From all Lis
  ev.target.parentElement.querySelectorAll(".active").forEach((span) => {
    span.classList.remove("active");
  });
  // Add Active Class From all Lis
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalStorage = localStorage.getItem("bullet-option");

if (bulletLocalStorage !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalStorage === "show") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullet-option", "show");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullet-option", "hide");
    }
    hundleActive(e);
  });
});

// Reset Options
document.querySelector(".reset-option").onclick = function () {
  localStorage.removeItem("color");
  localStorage.removeItem("random-background-option");
  localStorage.removeItem("bullet-option");

  window.location.reload();
};

let togButton = document.querySelector(".toggole-menu");
let tLinks = document.querySelector(".links");

togButton.addEventListener("click", (e) => {
  e.stopPropagation();

  togButton.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target !== togButton && e.target !== tLinks) {
    togButton.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
    console.log("55");
  }
});
tLinks.onclick = (e) => {
  e.stopPropagation();
};
