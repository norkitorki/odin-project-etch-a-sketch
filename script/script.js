"use-strict";

// Select the "Grid-Control" <div>:

const gridControl = document.getElementById("grid-control");

// Select the <button> to clear the Sketchpad:

const clearButton = document.querySelector("button.clear-grid");

// Select the <button> to change the Sketchpad Layout and add an Event for the functionality:

const gridLayoutButton = document.querySelector("button.grid-layout");

gridLayoutButton.addEventListener("click", changeGrid);

function changeGrid() {
    let gridCols = +prompt("How many Squares per side would you like to have? (1 - 80)", "");
    if ( !isNaN(gridCols) && Number.isInteger(gridCols) && gridCols > 0 && gridCols <= 80 ) {
        document.body.removeChild(container); 
        populateGrid(gridCols * gridCols);
        container.style.gridTemplateColumns = `repeat(${gridCols},1fr)`;
        container.style.gridTemplateRows = `repeat(${gridCols},1fr)`;
    }
    else if ( !Number.isInteger(gridCols) || gridCols < 0 || gridCols > 80 ) {
        alert("Please input an integer between 1 and 80.");  
        changeGrid();
    }
    else return;
};

/* Color Option Labels and Sliders */ 

// Red Label and Slider:

const redSliderLabel = document.querySelector("label.red-label");
const redSlider = document.querySelector("input.red-slider");
redSliderLabel.textContent = "Red: " + redSlider.value;

// Green Label and Slider:

const greenSliderLabel = document.querySelector("label.green-label");
const greenSlider = document.querySelector("input.green-slider");
greenSliderLabel.textContent = "Green: " + greenSlider.value;

// Blue Label and Slider:

const blueSliderLabel = document.querySelector("label.blue-label");
const blueSlider = document.querySelector("input.blue-slider");
blueSliderLabel.textContent = "Blue: " + blueSlider.value;

// Alpha(Opacity) Label and Slider:

const alphaSliderLabel = document.querySelector("label.alpha-label");
const alphaSlider = document.querySelector("input.alpha-slider");
alphaSliderLabel.textContent = "Opacity: " + alphaSlider.value;


/* Adding the Color Option Sliders functionality, as well as the function to display the rgb values in the labels
   when the "CTRL LEFT" key is pressed and the "Left Mouse Button" is clicked: */

const sliders = document.querySelectorAll("input");

sliders.forEach(slider => {
    slider.addEventListener("input", (e) => {
        colorDisplay.style.background = 
        `rgba(${redSlider.value}, ${greenSlider.value}, ${blueSlider.value}, ${alphaSlider.value})`;

        redSliderLabel.textContent =     "Red: " +   redSlider.value;
        greenSliderLabel.textContent = "Green: " + greenSlider.value;
        blueSliderLabel.textContent =   "Blue: " +  blueSlider.value;
        alphaSliderLabel.textContent = "Opacity: " + alphaSlider.value;
    });
});

function getValues(background) {
    redSlider.value = background.slice(background.indexOf("(") +1, background.indexOf(","));
    greenSlider.value = background.slice(background.indexOf(",") +2, background.lastIndexOf(","));
    blueSlider.value = background.slice(background.lastIndexOf(",") +2, background.indexOf(")"));
    
    redSliderLabel.textContent =    "Red : " + redSlider.value;
    greenSliderLabel.textContent = "Green: " + greenSlider.value;
    blueSliderLabel.textContent =   "Blue: " +  blueSlider.value;
};

// Select the Color Display <div> and set the default color:

const colorDisplay = document.querySelector("div.color-display");
colorDisplay.style.background = `rgba(0, 0, 0, 1)`;

// Create the Function for the random Colors and add the Event to the "Random Colors" <button>:

function randomColors() {
    let randomRed =   Math.floor(Math.random() * 255) +1;
    let randomGreen = Math.floor(Math.random() * 255) +1;
    let randomBlue =  Math.floor(Math.random() * 255) +1;

    colorDisplay.style.background = `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, 1)`;

    redSliderLabel.textContent =     "Red: " + randomRed;
    greenSliderLabel.textContent = "Green: " + randomGreen;
    blueSliderLabel.textContent =   "Blue: " + randomBlue;
    alphaSliderLabel.textContent = "Opacity: 1";

    redSlider.value =   randomRed;
    greenSlider.value = randomGreen;
    blueSlider.value =  randomBlue;
    alphaSlider.value = "1";
};

const randomColorButton = document.querySelector("button.random-color");
randomColorButton.addEventListener("click", (e) => {
    colorTrailActive = false;
    randomColorTrailButton.textContent = "Activate Random Color Trail";
    randomColors();
});

const randomColorTrailButton = document.querySelector("button.random-color-trail");
randomColorTrailButton.addEventListener("click", (e) => {
    if ( colorTrailActive === false && e.isTrusted ) {
        colorTrailActive = true;
        randomColorTrailButton.textContent = "Deactivate Random Color Trail";
    }
    else {
        colorTrailActive = false;
        randomColorTrailButton.textContent = "Activate Random Color Trail";
    }
});

let colorTrailActive = false; // setting a flag for the random color trail.

// Select and add an Event the <button>'s to hide the Controls and Borders:

const heading = document.querySelector("h1");
const hideControlButton = document.querySelector("button.hide-controls");

hideControlButton.addEventListener("click", (e) => {
    if ( gridControl.style.display !== "none" && e.isTrusted ) {
        gridControl.style.display = "none";
        heading.style.fontSize = "32px";
        hideControlButton.textContent = "Show Controls";
        hideControlButton.setAttribute("style","width:260px;");
    }
    else {
        gridControl.style.display = "block";
        heading.style.fontSize = "42px";
        hideControlButton.textContent = "Hide Controls";
        hideControlButton.removeAttribute("style","width");
    }
});

const hideBordersButton = document.querySelector("button.hide-borders")

/* Create the Sketchpad inside a container <div> and append the grid item <div>'s to it */

let container;

populateGrid(1764); // Create the standard size Sketchpad with 42 * 42 Squares

function populateGrid(items) {
    container = document.createElement("div");
    container.classList.add("container");
    for ( let i = 0; i < items; i++ ) {
        divFragment = document.createDocumentFragment();
        let divs = document.createElement("div");
        divs.classList.add("grid-item");
        divFragment.appendChild(divs)
        container.appendChild(divFragment);
    };
    styleGrid();
    document.body.insertBefore(container,document.scripts[0]);
};

// Add the Sketchpad functionality

function styleGrid() { 
    container.addEventListener("contextmenu", (e) => e.preventDefault());
    const gridItems = Array.from(container.children);
    gridItems.forEach(item => {
        item.addEventListener("mouseover", (e) => {
            if ( e.buttons === 1 && e.isTrusted ) { // Add color to the grid items when the Left Mouse Button is pressed.
                e.target.style.background = colorDisplay.style.background;
                if ( colorTrailActive === true ) randomColors();
            } 
            else if ( e.buttons === 2 && e.isTrusted ) { // Clear the grid items when the Right Mouse Button is held down.
                e.target.removeAttribute("style","background");
            }
        });
        item.addEventListener("mousedown", (e) => {
            e.preventDefault();
            if ( e.button === 0 && e.isTrusted && !e.ctrlKey ) { // Add color to a single grid item.
                e.target.style.background = colorDisplay.style.background; 
                if ( colorTrailActive === true ) randomColors();
            }
            else if ( e.button === 2 && e.isTrusted ) { // Clear a single grid item.
                e.target.removeAttribute("style","background");
            }
            else if ( e.button == 0 && e.ctrlKey && e.isTrusted && e.target.style.background !== "" ) {
                colorTrailActive = false;
                randomColorTrailButton.textContent = "Activate Random Color Trail";
                let background = e.target.style.background;
                getValues(background);
                colorDisplay.style.background = e.target.style.background;
            }
        });
        clearButton.addEventListener("click", (e) => { // Clear the whole grid.
            if ( e.button === 0 && e.isTrusted ) {
                item.removeAttribute("style");
            }
        });
        hideBordersButton.addEventListener("click", (e) => {
            if ( e.isTrusted && !item.classList.contains("grid-item-border-removed") ) {
                item.classList.toggle("grid-item-border-removed");
                hideBordersButton.textContent = "Show Borders";
            }
            else {
                item.classList.remove("grid-item-border-removed");
                hideBordersButton.textContent = "Hide Borders";
            }
        });
    });
};






