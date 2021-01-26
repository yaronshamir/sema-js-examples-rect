const _events = require('events');
module.exports = {
   render,
   init,
   onUserEvent,
   setPath,
   setStroke,
   getColour,
   setShape,
   addRatioX,
   addRatioY,
   removeRatioX,
   removeRatioY,
   getPosition,
   getRotation
}

const _map = require('map');

function init(view, model) {
   var el = document.getElementById(view.id);
   el.classList.add('graphic');
}

function render(view, model) {
   var img = document.getElementById(view.id);
   var x = model.value.x / _map.ratio() + _map.xOffset() - img.width / 2;
   var y = model.value.y / _map.ratio() + _map.yOffset() - img.height / 2;;

   img.style.top = `${y}px`;
   img.style.left = `${x}px`;
}

function onUserEvent(eventName, view, event, model) {
   switch (event.type) {
      case 'mousedown':
         _events.notify(eventName, {
            model,
            open: false
         });
         break;
      case 'click':
         _events.notify('item-selected', model.key);
         break;
      case 'dblclick':
         _events.notify(eventName, {
            model,
            open: true
         });
         break;
   }
   event.preventDefault();
   event.stopImmediatePropagation();
}


function setStroke(g, m) {
   const width = m.lineWidth;
   const colour = getColour(m.lineColor);

   g.setAttribute('stroke', colour);
   g.setAttribute('stroke-width', width);
}

function setPath(path, m) {
   const w = m.lineWidth;
   const alpha = m.lineAlpha;
   const type = m.lineType;

   path.setAttribute('opacity', alpha);
   switch (type) {
      case 'DOT':
         path.setAttribute('stroke-dasharray', `${w},${w}`);
         break;
      case 'BRK':
         path.setAttribute('stroke-dasharray', `${w * 4},${w * 4}`);
         break;
      case 'SOL':
         path.removeAttribute('stroke-dasharray');
   }
}

function getColour(colour) {
   colour = colour.trim();
   colour = '000000' + colour;
   colour = colour.substr(colour.length - 6, 6);

   return '#' + colour;
}


function setShape(node, m) {
   node.style.fill = getColour(m.fillColor);
   node.style.stroke = getColour(m.lineColor);
   node.style.strokeWidth = m.lineWidth;
   node.style.fillOpacity = m.fillAlpha;
   node.style.strokeOpacity = m.lineAlpha;

   const lw = m.lineWidth;

   switch (m.lineType) {
      case 'DOT':
         node.setAttribute('stroke-dasharray', `${lw},${lw * 2}`);
         break;
      case 'BRK':
         node.setAttribute('stroke-dasharray', `${lw * 4},${lw * 4}`);
         break;
      case 'SOL':
         node.removeAttribute('stroke-dasharray');
   }
}


function addRatioX(value) {
   return (value - _map.xOffset()) * _map.ratio();
}

function addRatioY(value) {
   return (value - _map.yOffset()) * _map.ratio();
}

function removeRatioX() {
   var value = [...arguments]
      .reduce((a, b) => a + b);
   return parseFloat(value) / _map.ratio() + _map.xOffset();
}
function removeRatioY() {
   var value = [...arguments]
      .reduce((a, b) => a + b);
   return parseFloat(value) / _map.ratio() + _map.yOffset();
}


function getPosition(id) {
   let el = document.getElementById(id);

   var translate = el
      .getAttribute('transform')
      .replace(/[a-zA-Z\(\)\,]/g, '')
      .split(' ')
      .map(i => parseFloat(i));

   return {
      x: parseFloat(translate[0]),
      y: parseFloat(translate[1])
   }
}

function getRotation(id) {
   let el = document.querySelector(`#${id} .wrapper`);
   return el
      .getAttribute('transform')
      .replace(/[a-zA-Z\(\)\,]/g, '')
      .split(' ')
      .map(i => parseFloat(i))[0];
}