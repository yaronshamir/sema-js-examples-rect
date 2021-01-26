const _events = require('events');
const _grp = require('./graphic');
const _map = require('map');

module.exports = {
   drag,
   endDrag,
   startDrag,
   getSize,
   startRotation,
   endRotation,
   rotate,
   reselectOnMove
}

function reselectOnMove(id) {
   _map.select(id);

   var xy = _grp.getPosition(id);
   let x = xy.x;
   let y = xy.y;

   var size = getSize(id);
   let w = size.w;
   let h = size.h;
   let rotation = _grp.getRotation(id);

   drawAttributes(id, x, y, w, h, rotation, false, 0, 0);
}

function startDrag(e, id, modelKey, dragType) {
   const pos = {
      dragType: dragType || "bottom-right"
   };

   e.preventDefault();
   e.stopImmediatePropagation();

   pos.cx = e.clientX;
   pos.cy = e.clientY;
   // todo: get values from model;

   var xy = _grp.getPosition(id);
   pos.x = xy.x;
   pos.y = xy.y;


   var size = getSize(id);
   pos.w = size.w;
   pos.h = size.h;
   pos.rotation = _grp.getRotation(id);

   _events.notify('update-event-start', {
      key: modelKey,
      propertyNames: ['x', 'y', 'width', 'height', 'rotation', 'isNew']
   });


   let g = document.getElementById(id);
   g.querySelector('.' + pos.dragType).classList.add('drag');

   pos.tx = 0;
   pos.ty = 0;
   if (pos.dragType === 'rotate') {
      var t = getRotationOffset(pos.rotation, pos.w, pos.h);
      pos.tx = t.x;
      pos.ty = t.y;
   }

   var isRotation = dragType === 'rotate';
   drawAttributes(id, pos.x, pos.y, pos.w, pos.h, pos.rotation, isRotation, pos.tx, pos.ty);

   return pos;
}

function startRotation(id) {
   const pos = {
      dragType: "rotate",
      cx: 0,
      cy: 0
   };

   var xy = _grp.getPosition(id);
   pos.x = xy.x;
   pos.y = xy.y;

   var size = getSize(id);
   pos.w = size.w;
   pos.h = size.h;
   pos.rotation = _grp.getRotation(id);

   var t = getRotationOffset(pos.rotation, pos.w, pos.h);
   pos.tx = t.x;
   pos.ty = t.y;

   return pos;
}


function drag(e, id, pos) {
   e.preventDefault();
   e.stopImmediatePropagation();

   let rectPos,
      pointPos;

   let x = pos.x;
   let y = pos.y;
   let w = pos.w;
   let h = pos.h;
   let ang = pos.rotation;

   const Q_1 = ang < 0 && ang > -90;
   const Q_2 = ang > 180 && ang < 270;
   const Q1 = ang > 0 && ang <= 90;
   const Q2 = ang > 90 && ang <= 180;

   const cosA = Math.cos(Math.abs(ang) * Math.PI / 180);
   const sinA = Math.sin(Math.abs(ang) * Math.PI / 180);

   switch (pos.dragType) {
      case 'body':
         rectPos = getXyPosition(e, pos);
         x = rectPos.x;
         y = rectPos.y;
         break;
      case 'top-left':
         rectPos = getXyPosition(e, pos);
         x = rectPos.x;
         y = rectPos.y;
         pointPos = getPointPosition(e, pos, -1, -1);
         w = pointPos.w;
         h = pointPos.h;
         break;
      case 'top-right':
         pointPos = getPointPosition(e, pos, 1, -1);
         w = pointPos.w;
         h = pointPos.h;
         if (pos.rotation != 0) {
            switch (true) {
               case Q_1:
                  y += (pos.h - h) * cosA;
                  x += (pos.h - h) * sinA;
                  break;
               case Q1:
                  y += (pos.h - h) * cosA;
                  x -= (pos.h - h) * sinA;
                  break;
               case Q2:
                  y += (pos.h - h) * cosA;
                  x -= (pos.h - h) * sinA;
                  break;
               case Q_2:
                  y += (pos.h - h) * cosA;
                  x -= (pos.h - h) * sinA;
                  break;
            }
         }
         else {
            rectPos = getXyPosition(e, pos);
            y = rectPos.y;
         }

         break;
      case 'bottom-right':
         pointPos = getPointPosition(e, pos, 1, 1);
         w = pointPos.w;
         h = pointPos.h;
         break;
      case 'bottom-left':
         pointPos = getPointPosition(e, pos, - 1, 1);
         w = pointPos.w;
         h = pointPos.h;
         if (pos.rotation != 0) {
            switch (true) {
               case Q_1:
                  x += (pos.w - w) * cosA;
                  y -= (pos.w - w) * sinA;
                  break;
               case Q1:
                  x += (pos.w - w) * cosA;
                  y += (pos.w - w) * sinA;
                  break;
               case Q2:
                  x += (pos.w - w) * cosA;
                  y += (pos.w - w) * sinA;
                  break;
               case Q_2:
                  x += (pos.w - w) * cosA;
                  y += (pos.w - w) * sinA;
                  break;
            }
         }
         else {
            rectPos = getXyPosition(e, pos);
            x = rectPos.x;
         }
         break;
      case 'rotate':
         var rect = document.querySelector(`#${id} .body`).getBoundingClientRect();
         ang = Math.atan2(e.clientY - rect.y - rect.height / 2, e.clientX - rect.x - rect.width / 2) * 180 / Math.PI + 90;
         break;
   }

   var xy = _grp.getPosition(id);
   if (w < 10) {
      x = xy.x;
      w = 10;
   }
   if (h < 10) {
      y = xy.y;
      h = 10;
   }

   var isRotation = pos.dragType === 'rotate';
   drawAttributes(id, x, y, w, h, ang, isRotation, pos.tx, pos.ty);
}


function rotate(id, pos) {
   drawAttributes(id, pos.x, pos.y, pos.w, pos.h, pos.rotation, true, pos.tx, pos.ty);
}

function drawAttributes(id, x, y, w, h, rotation, isRotation, tx, ty) {

   let g = document.getElementById(id);
   g.setAttribute("transform", `translate(${x} ${y})`);

   let tl = g.querySelector('.top-left');
   tl.setAttribute("transform", `translate(-3 -3)`);

   let tr = g.querySelector('.top-right');
   tr.setAttribute("transform", `translate(${w - 3} -3)`);

   let br = g.querySelector('.bottom-right');
   br.setAttribute("transform", `translate(${w - 3} ${h - 3})`);

   let bl = g.querySelector('.bottom-left');
   bl.setAttribute("transform", `translate(-3 ${h - 3})`);

   let rt = g.querySelector('.rotate');
   rt.setAttribute("transform", `translate(${w / 2 + 2} -10)`);

   var wrapper = g.querySelector('.wrapper');
   if (isRotation) {
      g.setAttribute("transform", `translate(${x + tx} ${y + ty})`);
      wrapper.setAttribute('transform', `rotate(${rotation}  ${w / 2}  ${h / 2}) `);
      return;
   }

   g.setAttribute("transform", `translate(${x} ${y})`);
   wrapper.setAttribute('transform', `rotate(${rotation})`);

   const ellipse = g.querySelector(`.ellipse`);
   if (ellipse != null) {
      drawEllipseAttributes(g, w, h);
      return;
   }
   drawRectAttributes(g, w, h);
}

function drawRectAttributes(g, w, h) {
   let rect = g.querySelector('.body');
   rect.setAttribute('width', w);
   rect.setAttribute('height', h);
}

function drawEllipseAttributes(g, w, h) {
   let ellipse = g.querySelector('.ellipse');
   ellipse.setAttribute('rx', w / 2);
   ellipse.setAttribute('ry', h / 2);
   ellipse.setAttribute('cx', w / 2);
   ellipse.setAttribute('cy', h / 2);
}

function endDrag(e, view, modelKey, dragType) {
   e.preventDefault();
   e.stopImmediatePropagation();
   e.stopImmediatePropagation();
   const id = view.id;
   const pos = _grp.getPosition(id);
   const size = getSize(id);
   const rotation = _grp.getRotation(id);

   if (dragType === 'rotate') {
      var t = getRotationOffset(rotation, size.w, size.h);
      pos.x -= t.x;
      pos.y -= t.y;
   }

   var data = {
      key: modelKey,
      data: {
         x: parseInt((pos.x - _map.xOffset()) * _map.ratio()),
         y: parseInt((pos.y - _map.yOffset()) * _map.ratio()),
         width: parseInt(size.w * _map.ratio()),
         height: parseInt(size.h * _map.ratio()),
         rotation: parseInt(rotation),
         isNew: view.isNew ? false : null
      }
   };

   _events.notify('update-event', data);
   _events.notify('update-event-end', {
      key: modelKey,
      propertyNames: ['x', 'y', 'width', 'height', 'rotation', 'isNew']
   });

   let g = document.getElementById(id);
   g.querySelector('.' + dragType).classList.remove('drag');

   if (dragType === 'rotate') {
      var wrapper = g.querySelector('.wrapper');
      wrapper.setAttribute('transform', `rotate(${rotation}) `);
      g.setAttribute("transform", `translate(${pos.x} ${pos.y})`);
   }
}

function endRotation(id) {

   const pos = _grp.getPosition(id);
   const size = getSize(id);
   const rotation =_grp.getRotation(id);

   var t = getRotationOffset(rotation, size.w, size.h);
   pos.x -= t.x;
   pos.y -= t.y;

   let g = document.getElementById(id);
   var wrapper = g.querySelector('.wrapper');
   wrapper.setAttribute('transform', `rotate(${rotation}) `);
   g.setAttribute("transform", `translate(${pos.x} ${pos.y})`);
}

function getSize(id) {
   let el = document.querySelector(`#${id} .body`);
   if (el.classList[0] === 'ellipse') {
      return {
         w: parseFloat(el.getAttribute('rx')) * 2,
         h: parseFloat(el.getAttribute('ry')) * 2
      }
   }

   return {
      w: parseFloat(el.getAttribute('width')),
      h: parseFloat(el.getAttribute('height'))
   }
}

function getPointPosition(e, pos, reverseX, reverseY) {

   if (pos.rotation === 0) {
      return {
         w: pos.w + (e.clientX - pos.cx) * reverseX,
         h: pos.h + (e.clientY - pos.cy) * reverseY
      }
   }
   const point = pos.dragType;
   const TL = point === 'top-left' || point === 'bottom-right';
   const TR = point === 'top-right' || point === 'bottom-left';

   const ang = pos.rotation;

   const Q_1 = ang < 0 && ang > -90;
   const Q_2 = ang > 180 && ang < 270;
   const Q1 = ang > 0 && ang <= 90;
   const Q2 = ang > 90 && ang <= 180;

   let a = Math.abs(ang) * Math.PI / 180;
   if (ang > 180 && ang < 270) {
      a = Math.abs(ang - 180) * Math.PI / 180;
   }
   const w = (e.clientX - pos.cx) * reverseX;
   const h = (e.clientY - pos.cy) * reverseY;

   let dw = 0;
   let dh = 0;

   const sw = w * Math.sin(a);
   const cw = w * Math.cos(a);

   const sh = h * Math.sin(a);
   const ch = h * Math.cos(a);

   switch (true) {
      case Q_1 && TL:
         dw = cw - sh;
         dh = sw + ch;
         break;

      case Q1 && TR:
         dw = cw - sh;
         dh = sw + ch;
         break;

      case Q_2 && TL:
         dw = - sh - cw;
         dh = - ch + sw;
         break;

      case Q_1 && TR:
         dw = sh + cw;
         dh = ch - sw;
         break;

      case Q_2 && TR:
         dw = (sh - cw);
         dh = -(ch + sw);
         break;

      case Q1 && TL:
         dw = sh + cw;
         dh = ch - sw;
         break;

      case Q2 && TR:
         dw = -sh + cw;
         dh = ch + sw;
         break;

      case Q2 && TL:
         dw = sh + cw;
         dh = ch - sw;
         break;
   }

   return {
      w: pos.w + dw,
      h: pos.h + dh
   }
}

function getRotationOffset(a, W, H) {
   var w = W / 2;
   var h = H / 2;
   if (a === 0) {
      return {
         x: 0,
         y: 0
      }
   }

   const r = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
   const a2 = Math.atan2(h, w) * 180 / Math.PI;
   const a3 = a + a2;

   const w1 = Math.cos(a3 * Math.PI / 180) * r;
   const h1 = Math.sin(a3 * Math.PI / 180) * r;

   return {
      x: w1 - w,
      y: h1 - h
   }
}


function getXyPosition(e, pos) {
   const diffX = e.clientX - pos.cx;
   const diffY = e.clientY - pos.cy;

   let x = pos.x + diffX;
   let y = pos.y + diffY;


   return {
      x,
      y
   }
}