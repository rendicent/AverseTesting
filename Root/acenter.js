window.addEventListener('load', centerElement);

function centerElement() {
  var container = document.getElementById('container');
  var centeredElement = document.getElementById('centeredElement');
  
  // Calculate the required offsets to center the element
  var containerHeight = container.clientHeight;
  var containerWidth = container.clientWidth;
  var elementHeight = centeredElement.offsetHeight;
  var elementWidth = centeredElement.offsetWidth;
  var verticalOffset = (containerHeight - elementHeight) / 2;
  var horizontalOffset = (containerWidth - elementWidth) / 2;

  // Apply the offsets using margin-top and margin-left
  centeredElement.style.marginTop = verticalOffset + 'px';
  centeredElement.style.marginLeft = horizontalOffset + 'px';
}