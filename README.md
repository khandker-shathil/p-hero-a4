## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans: 
* getElementByID(): Using this method we can get a specific element from HTML Document using the ID(#) as an selector.<br> 
* getElementsByClassName(): Using this method we get the HTML Class list using the class(.) as a selector.<br>
* querySelector(): This method is used to get the first element that matches the CSS selector.<br>
* querySelectorAll(): This method gives all the elements from DOM using a selector as a static list.<br> 

## 2. How do you create and insert a new element into the DOM?

 Ans: 
 * Create and Element: `const div = document.createElement('div');`
 * Insert Text/Contents inside: `div.textContent = "Lorem Ipsum";`
 * Append the Elemen with the Body: `document.body.appendChild(div)/.prepand('div')/.inseertBefore('div');`

## 3. What is Event Bubbling? And how does it work?
Ans: <br>
Imagine a bubbble. A bubble goes from bottom tp upwords. Just like that event bubbling is when clicked or an event is initiated the event propagates back to the top of the DOM Tree.<br>
<table>
  <tr>
    <td>
        <img width="400" height="400" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/DOM-model.svg/1920px-DOM-model.svg.png">
        <figcaption>Figure 1: DOM Tree (Taken from Wikipedia)</figcaption>
    </td>
    <td>
      <img width="400" height="400" src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GscNW1Ey1K715KQU2CA_Hg.png">
      <figcaption>Figure 2: Event Bubble (Taken from Medium)</figcaption>
    </td>
  </tr>
</table>


## 4. What is Event Delegation in JavaScript? Why is it useful?
Ans: <br>
Event delegation is attaching an event listener to a parents node instead of a child node for better capture of event bubbling. <br>

## 5. What is the difference between preventDefault() and stopPropagation() methods?
Ans: <br>
* `preventDefault()`: Prevents the default action of any cancalable event. Example:
  ```
  document.querySelector('a').addEventListener('click', function(event) {
  event.preventDefault(); // Prevents the link from navigating
  console.log("Navigation prevented, custom logic executed instead.");
  });
  ```
* `stopPropagation()`: Stops the further propagation or event bubling/capturing from happenning through the DOM Tree.
```
document.getElementById('parent').addEventListener('click', function() {
 alert('Parent clicked!');});
document.getElementById('child').addEventListener('click', function() {
    alert('Child clicked!');
 });
 ```
> Output:
> "Child Clicked!"
> "Parent Clicked!" <br>

But if we put:
```
document.getElementById('parent').addEventListener('click', function() {
    alert('Parent clicked!'); // This will NOT run
});

document.getElementById('child').addEventListener('click', function(event) {
    event.stopPropagation(); // Stop propagation
    alert('Child clicked!'); // This will run
});

```
> Output:
> "Child Clicked!"
