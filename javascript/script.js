document.addEventListener("DOMContentLoaded", function() {
    const draggableElements = document.querySelectorAll(".draggable");
  
    draggableElements.forEach((element) => {
      element.addEventListener("mousedown", onMouseDown);
    });
  
    let offsetX, offsetY;
    let draggedElement = null;
  
    function onMouseDown(e) {
      if (e.target.classList.contains("header")) {
        draggedElement = e.currentTarget;
        const rect = draggedElement.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        draggedElement.classList.add("dragging");
        bringToFront(draggedElement);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      }
    }
  
    function onMouseMove(e) {
      if (draggedElement) {
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
        draggedElement.style.left = `${newX}px`;
        draggedElement.style.top = `${newY}px`;
      }
    }
  
    function onMouseUp() {
      if (draggedElement) {
        draggedElement.classList.remove("dragging");
        draggedElement = null;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
    }
  
    function bringToFront(element) {
      const divs = document.querySelectorAll(".draggable");
      let highestZIndex = 0;
  
      divs.forEach((div) => {
        const zIndex = parseInt(window.getComputedStyle(div).zIndex, 10);
        if (!isNaN(zIndex) && zIndex > highestZIndex) {
          highestZIndex = zIndex;
        }
      });
  
      element.style.zIndex = highestZIndex + 1;
    }
  });