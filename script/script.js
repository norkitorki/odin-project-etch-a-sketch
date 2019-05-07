"use-strict";

// Create the <div>'s Container:

const container = document.createElement("div");
container.classList.add("container");

// Create and append the <div>'s to the container:

populateGrid(2304);
function populateGrid(grids) {
    let divs;
    for ( let i = 0; i < grids; i++ ) {
        divs = document.createElement("div");
        divs.classList.add("grid-item");
        container.appendChild(divs);
    };
}

// Append the container to the Document:

document.body.insertBefore(container,document.scripts[0]);

// Create and append the "Clear Grid" Button to the Document:

const clearButton = document.createElement("button");
clearButton.classList.add("clear-grid");
clearButton.textContent = "Clear Grid";

document.body.insertBefore(clearButton,container);

// Create and append the "Color Slider" to the Document:

const colorSlider = document.createElement("input");
colorSlider.setAttribute("type","range");
colorSlider.setAttribute("id","color");
colorSlider.setAttribute("min","0");
colorSlider.setAttribute("max","360");
colorSlider.classList.add("color-slider");

document.body.insertBefore(colorSlider,container);

colorSlider.addEventListener("change", (e) => {
    colorSlider.addEventListener("mousemove", () => {
        colorDisplay.style.background = `hsl(${e.target.value}, 100%, 50%)`; 
    })
});

// Create and append the Color Display <div>.

const colorDisplay = document.createElement("div");
colorDisplay.classList.add("color-display");

document.body.insertBefore(colorDisplay,container);

// Create the Grid and add the neccessary functions.

const gridItems = Array.from(document.querySelectorAll(".grid-item"));

gridItems.forEach(item => {
    item.addEventListener("mousemove", (e) => {
        if ( e.buttons === 1 && e.isTrusted ) { // Add Color to the grid items when the left mouse button is pressed.
            e.target.style.background = colorDisplay.style.background;
        } 
        if ( e.buttons === 4 && e.isTrusted ) { // Clear the grid items when the MouseWheel Button is held down.
            e.target.style.background = "";
        }
    });
    item.addEventListener("mousedown", (e) => {
        if ( e.button === 0 && e.isTrusted ) {
            e.target.style.background = colorDisplay.style.background; 
        }
    });
    clearButton.addEventListener("click", (e) => { // Clear the whole grid.
        if ( e.button === 0 && e.isTrusted ) {
            item.style.background = "";
        }
    });
    item.addEventListener("mousedown", (e) => { // Clear the grid item that has been clicked on.
        if ( e.button === 1 ) {
            e.target.style.background = "";
        }
    });
});




