### Live Site: [Visit Now 🚀](https://ashik-ahammad.github.io/JobApplicationTracker/) 


# 📘 JavaScript DOM Questions & Answers

1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
2. How do you create and insert a new element into the DOM?
3. What is Event Bubbling? And how does it work?
4. What is Event Delegation in JavaScript? Why is it useful?
5. What is the difference between preventDefault() and stopPropagation() methods?

## ✅ Answers

*
1. The difference between getElementById, getElementsByClassName, querySelector, and querySelectorAll is how they select elements. getElementById() selects only one element using its id. getElementsByClassName() selects all elements that have the same class name and returns a collection. querySelector() uses CSS selectors and returns only the first matching element. querySelectorAll() also uses CSS selectors but returns all matching elements as a list.
*

*
2. To create and insert a new element into the DOM, first you create the element using document.createElement(). Then you add text or content inside it using properties like innerText or innerHTML. After that, you insert it into the page by using methods like appendChild() or append() on a parent element. This is how new elements are dynamically added to a webpage.
*

*
3. Event bubbling is a process in JavaScript where an event starts from the target element and then moves upward to its parent elements. For example, if you click a button inside a div, the click event first happens on the button, then on the div, then on the body, and continues upward. This upward movement is called bubbling.
*

*
4.  Event delegation is a technique where you add an event listener to a parent element instead of adding listeners to many child elements. The parent listens for events that happen on its children and handles them. This is useful because it reduces code, improves performance, and also works for new elements that are added later dynamically.
*

*
5. The difference between preventDefault() and stopPropagation() is in what they stop. preventDefault() stops the browser’s default action, such as stopping a form from submitting or a link from opening. On the other hand, stopPropagation() stops the event from moving up to parent elements, which means it stops event bubbling but does not affect the default browser behavior.
*
