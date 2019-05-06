// Create the <div>'s Container:

const container = document.createElement("div");
container.classList.add("container");

// Create and append the <div>'s to the container:

let divs;
for ( let i = 0; i < 256; i++ ) {
    divs = document.createElement("div");
    divs.classList.add("grid-item");
    container.appendChild(divs);
};

// Append the container to the Document:

document.body.insertBefore(container,document.scripts[0]);



