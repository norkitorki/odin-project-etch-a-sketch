"use-strict";

// Create the <div>'s Container:

const container = document.createElement("div");
container.classList.add("container");

// Create and append the <div>'s to the container:

populateGrid(2304);
function populateGrid(grids) {
    for ( let i = 0; i < grids; i++ ) {
        divFragment = document.createDocumentFragment();
        let divs = document.createElement("div");
        divs.classList.add("grid-item");
        divFragment.appendChild(divs)
        container.appendChild(divFragment);
    };
};

// Append the container to the Document:

document.body.insertBefore(container,document.scripts[0]);

// Select the "Grid-Control" <div> and append the "Clear Grid" Button to the Document:

const gridControl = document.getElementById("grid-control");

const clearButton = document.createElement("button");
clearButton.classList.add("clear-grid");
clearButton.textContent = "Clear Sketchpad";

gridControl.appendChild(clearButton);

// Create the <button> to change the Grid Layout:

const gridLayoutButton = document.createElement("button");
gridLayoutButton.classList.add("grid-layout");
gridLayoutButton.textContent = "Change Sketchpad Layout";

gridLayoutButton.addEventListener("click", changeGrid);

function changeGrid() {
    let gridCols = +prompt("How many Squares per side would you like to have ?", "");
    if ( !isNaN(gridCols) && gridCols !== 0 ) {
        console.log(gridCols);
        container.style.gridTemplateColumns = `repeat(${gridCols}, 1fr)`;
        container.style.gridTemplateRows    = `repeat(${gridCols}, 1fr)`;
        populateGrid(gridCols * gridCols);
    }
    else return;
};


// Create and append the Color Sliders to the "Grid Control":

// Hue Slider:

const hueSliderLabel = document.createElement("label");
hueSliderLabel.setAttribute("for","hue");
hueSliderLabel.classList.add("hue-label");


const hueSlider = document.createElement("input");
hueSlider.setAttribute("type","range");
hueSlider.setAttribute("id","hue");
hueSlider.setAttribute("min","0");
hueSlider.setAttribute("max","360");
hueSlider.defaultValue = "0";
hueSlider.classList.add("hue-slider");
hueSliderLabel.textContent = "Hue: " + hueSlider.value;

// Saturation Slider:

const saturationSLiderLabel = document.createElement("label");
saturationSLiderLabel.setAttribute("for","saturation");
saturationSLiderLabel.classList.add("saturation-label");

const saturationSlider = document.createElement("input");
saturationSlider.setAttribute("type","range");
saturationSlider.setAttribute("id","saturation");
saturationSlider.setAttribute("min","0");
saturationSlider.setAttribute("max","100");
saturationSlider.defaultValue = "100";
saturationSlider.classList.add("saturation-slider");
saturationSLiderLabel.textContent = "Saturation: " + saturationSlider.value + "%";

// Luminance Slider:

const luminanceSLiderLabel = document.createElement("label");
luminanceSLiderLabel.setAttribute("for","luminance");
luminanceSLiderLabel.classList.add("luminance-label");

const luminanceSlider = document.createElement("input");
luminanceSlider.setAttribute("type","range");
luminanceSlider.setAttribute("id","luminance");
luminanceSlider.setAttribute("min","0");
luminanceSlider.setAttribute("max","100");
luminanceSlider.defaultValue = "50";
luminanceSlider.classList.add("luminance-slider");
luminanceSLiderLabel.textContent = "Luminance: " + luminanceSlider.value + "%";


gridControl.appendChild(hueSlider);
gridControl.insertBefore(hueSliderLabel,hueSlider);

gridControl.appendChild(luminanceSLiderLabel);
gridControl.appendChild(luminanceSlider);

gridControl.insertBefore(saturationSlider,luminanceSLiderLabel);
gridControl.insertBefore(saturationSLiderLabel,saturationSlider);

gridControl.insertBefore(gridLayoutButton,hueSliderLabel);

const sliders = document.querySelectorAll("input");

sliders.forEach(slider => {
    slider.addEventListener("change", (e) => {
        slider.addEventListener("mousemove", () => {
            colorDisplay.style.background = 
            `hsl(${hueSlider.value}, ${saturationSlider.value}%, ${luminanceSlider.value}%)`;
            hueSliderLabel.textContent = "Hue: " + hueSlider.value;
            saturationSLiderLabel.textContent = "Saturation: " + saturationSlider.value + "%";
            luminanceSLiderLabel.textContent = "Luminance: " + luminanceSlider.value + "%";
        })
    })
});


// Create and append the Color Display <div> to the "Grid Control".

const colorDisplay = document.createElement("div");
colorDisplay.classList.add("color-display");

gridControl.appendChild(colorDisplay);

// Create and append the <button> to hide the "Grid Control".

const hideControlButton = document.createElement("button");
hideControlButton.textContent = "Hide Controls";
hideControlButton.classList.add("hide-controls");

document.body.insertBefore(hideControlButton,container);

hideControlButton.addEventListener("click", (e) => {
    if ( gridControl.style.display !== "none" && e.isTrusted ) {
        gridControl.style.display = "none";
        hideControlButton.textContent = "Show Controls";
    }
    else {
        gridControl.style.display = "block";
        hideControlButton.textContent = "Hide Controls";
    }
});


// Create the Grid and add the neccessary functions.

const gridItems = Array.from(document.querySelectorAll(".grid-item"));

gridItems.forEach(item => {
    item.addEventListener("mousemove", (e) => {
        if ( e.buttons === 1 && e.isTrusted ) { // Add Color to the grid items when the left mouse button is pressed.
            e.target.style.background = colorDisplay.style.background;
        } 
        else if ( e.buttons === 4 && e.isTrusted ) { // Clear the grid items when the MouseWheel Button is held down.
            e.target.removeAttribute("style");
        }
    });
    item.addEventListener("mousedown", (e) => {
        if ( e.button === 0 && e.isTrusted ) {
            e.target.style.background = colorDisplay.style.background; 
        }
        else if ( e.button === 1 ) {
            e.target.removeAttribute("style");
        }
    });
    clearButton.addEventListener("click", (e) => { // Clear the whole grid.
        if ( e.button === 0 && e.isTrusted ) {
            item.removeAttribute("style");
        }
    });
    item.addEventListener("mousedown", (e) => {
        e.preventDefault();
    })
    
});




