# Odin-Project: Etch-A-Sketch Project

In this little project, I'm going to create something that should resemble a something like a sketchpad.

# How to Adjust the Colors and Basic Controls:

Let's go over the basic controls of the Sketchpad.

At the top there is 1 <button>.

- The "Change Sketchpad Layout" Button will prompt you to input the number of squares you would like to have in your Sketchpad.
  It will then return a new and clean Sketchpad with the requested squares on each side.
  
  Note : The default number of squares on pageload are 42.
	 The number integer submitted into the prompt must be bigger than 0 and smaller than 81, otherwise the prompt will return false.

Next up you will see 4 Sliders.With these sliders you are able to adjust the color input to your liking, using the rgba("red","green","blue","alpha")
values.

Alternatively you can also choose a random color,by clicking the "Random Color" <button> beneath the sliders.

Underneath these sliders is a simple <div> displaying the currently selected color and four more buttons.

- The "Activate Random Trail" <button> will color each element you move your mouse over (and press or hold down the "Left Mouse Button") in a random
  RGB color.

- The "Hide Controls" <button> will hide the upper coloring options, giving you more screen space for your sketchpad.
  Clicking it once will hide the controls, whereas clicking it again will insert the controls back onto the page.

- The "Clear Sketchpad" <button> will clear all of the colored elements in the Sketchpad.

- The "Hide Borders" <button> will hide the borders of the elements contained in your sketchpad.
  Clicking it once will hide the borders, whereas clicking it again will insert the borders back onto the page.

# How to use the Sketchpad:

Once you have adjusted the color to your liking you can then start using the Sketchpad.

To start coloring the square elements, move your mouse pointer over one square element and press the "Left Mouse Button".
If you would like to color multiple elements, hold down the "Left Mouse Button" and drag your mouse pointer over the elements you wish to color.

If you would like to clear a color from an element, move your mouse pointer over the square element and press the "Right Mouse Button".
To remove multiple colors from an element, hold down the "Right Mouse Button" and drag your mouse pointer over the elements you wish to clear.

To quickly switch to a color which is already present in the sketchpad, hold down the "Left CTRL" key and click the "Left Mouse Button" on an already
colored square and the color control will switch to the color of the clicked on square.

Have fun :)



