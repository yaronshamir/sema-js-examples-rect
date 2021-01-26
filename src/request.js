module.exports = {
   load
}

var loader = require('./core/loader');

function load() {
   var data = {
      views: [{
            "modelKey": "HelloWorldMdl",
            "containerId": "content",
            "component": "HelloWorld"
         }
      ],
      models: [
         {
            "key": "HelloWorldMdl",
            "value": "Hello World"
         }
      ]
   }

   loader.onDataLoad(data);
}