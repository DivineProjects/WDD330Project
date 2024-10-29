// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//get URL parameter e.g <a href="product_pages/index.html?product=880RR" 
export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;

}

// export function renderListWithTemplate(templateFn, parentElement, list, position= "afterbegin", clear = false){
//   const htmlStrings = list.map(templateFn);
//   if (clear){
//     parentElement.innerHTML = "";
//   }
//   parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
// }

export function renderWithTemplate(templateFn, parent, data, position ="afterbegin", callback){
  parent.insertAdjacentHTML(position, templateFn);
  if(callback){
    callback(data);
  }
}

// function to take an optional object and a template and insert the objects as HTML into the DOM
export async function loadTemplate(path){
  const html = await fetch(path);
  const htmlText = await html.text();
  return htmlText;
}

// function to dynamically load the header and footer into a page
export async function loadHeaderFooter() {
  // Load the header and footer templates in from our partials (loadTemplate).
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  // Grab the header and footer elements out of the DOM.
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  // Render the header and footer (renderWithTemplate).
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}


// handling the unhappy path (form validation)
export function alertMessage(message, scroll=true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  // set the contents of the alert
  alert.innerHTML = `<p>${message}</p>
    <button class="close-alert">X</button>`;
  alert.style.display = "block";

  // add the alert to the page
  // document.body.appendChild(alert);

  // add an event listener to the close button
  alert.querySelector(".close-alert").addEventListener("click", () => {
    alert.remove();
  });

  // add the alert to the page
  const main = document.querySelector("main");
  main.prepend(alert);

  // scroll to the top of the page
  if (scroll) {
    window.scrollTo(0, 0);
  }
}