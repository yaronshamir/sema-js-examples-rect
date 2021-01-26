const _grp = require('../graphic');
const _map = require('map');
const _events = require('events');
const _shape = require('../shape');

module.exports = {
   create,
   render,
   reselectOnMove,
   rotate,
   init,
   onUserEvent,
   onDocumentEvent,
   onWindowEvent
};


_events.subscribe('insert-graphic-ellipse', onInsert);

_events.subscribe('render-rotation-start', renderRotationStart);
_events.subscribe('render-rotation-end', renderRotationEnd);

var _isDrag = false;
let _id = '';


let _pos = {
   x: 0,
   y: 0,
   w: 0,
   h: 0,
   cx: 0,
   cy: 0
}

function reselectOnMove(view, model) {
   _map.select(view.id);
   _shape.reselectOnMove(view.id);
}

function create(view, model) {
   const template = require("./template.generated");
   return template.create(view, model);
}

function init(view, model) {
   _grp.init(view, model);
   render(view, model);
}

function onWindowEvent(view, event, model) {
   render(view, model);
}

function render(view, model) {

   var m = model.value;

   var x = m.x / _map.ratio() + _map.xOffset();
   var y = m.y / _map.ratio() + _map.yOffset();

   var w = m.width / _map.ratio();
   var h = m.height / _map.ratio();

   if (w < 0) {
      w = - w;
      x -= w;
   }

   if (h < 0) {
      h = - h;
      y -= h;
   }

   var g = document.getElementById(view.id);
   g.setAttribute('transform', `translate(${x} ${y})`);

   const ellipse = g.querySelector('ellipse');
   ellipse.setAttribute('cx', w / 2);
   ellipse.setAttribute('cy', h / 2);
   ellipse.setAttribute('rx', w / 2);
   ellipse.setAttribute('ry', h / 2);

   _grp.setShape(ellipse, m);

   var wrapper = g.querySelector('.wrapper');
   wrapper.setAttribute('transform', `rotate(${m.rotation})`);
}


function onDocumentEvent(view, e, model) {
   if (view.id !== _id) {
      return;
   }
   switch (e.type) {
      case 'mousemove':
         if (!_isDrag) {
            return;
         }
         _shape.drag(e, _id, _pos);
         break;

      case 'mouseup':

         if (view.id !== _id || !_isDrag) {
            return;
         }
         _shape.endDrag(e, view, model.key, _pos.dragType);
         e.preventDefault();
         e.stopImmediatePropagation();

         if (view.isNew) {
            view.isNew = null;
            _map.removeSelection();
            _events.notify('model-reset-menu');
         }
         _events.notify('show-ellipse-popup', {
            model,
            open: false
         });
         _isDrag = false;
         break;
   }
}


//drag image
function onUserEvent(view, e, model) {
   switch (e.type) {
      case
         'mousedown':
         _id = view.id;
         _map.select(view.id);
         startDrag(e, model.key);
         break;
      case
         'mouseup':
         return;
   }
   _grp.onUserEvent('show-ellipse-popup', view, e, model);
}

function onInsert(data) {
   var view = data.view;
   var e = data.e;

   _id = view.id;
   _map.select(_id);
   startDrag(e, view.modelKey, 'bottom-right', false);
}

function startDrag(e, modelKey) {
   _isDrag = true;
   const dragType = e.target.classList[1];
   _pos = _shape.startDrag(e, _id, modelKey, dragType);
}

function renderRotationStart(value) {
   if (_map.selectedItem() !== _id) {
      return;
   }

   _pos = _shape.startRotation(_id);
}

function rotate(view, model) {
   _pos.rotation = model.value.rotation;
   _shape.rotate(view.id, _pos);
}


function renderRotationEnd(value) {
   if (_map.selectedItem() !== _id) {
      return;
   }

   _shape.endRotation(_id);
}