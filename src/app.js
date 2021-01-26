var app = require('sema-js-core');
var components = require('./components/components.generated');
app.init(components);

var data = {
   views: [
      view("Rect")
   ],
   models: [
      model("textMdl", "Text Binding Example")
   ]
}

app.onLoad(data);

function view(component) {
   return {
      "modelKey": "textMdl",
      "containerId": "content",
      "component": component
   }
}

function model(key, value) {
   return {
      "key": key,
      "value": value
   }
}