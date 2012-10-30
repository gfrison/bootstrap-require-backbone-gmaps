
require.config({
  paths : {
    underscore : 'vendor/underscore',
    backbone   : 'vendor/backbone',
    bootstrap  : 'vendor/bootstrap.min'
  },
  shim : {
    'vendor/backbone-localStorage' : ['backbone'],
    underscore : {
      exports : '_'
    },
    backbone : {
      exports : 'Backbone',
      deps : ['jquery','underscore']
    }    
  },
  deps : ['jquery','underscore']
});

var resultCallback = {
	onGmapAddress : function(address){
      console.log('onGmapAddress',address);
      this.map(address);
    },
    onTyping: function(){
      this.map({
      	street_number:'',
      	route:'',
      	locality:'',
      	province:'',
      	region:'',
      	state:'',
      	zip:''
      });
    },
    map: function(address){
      $('#street_number').html(address.street_number);
      $('#route').html(address.route);
      $('#locality').html(address.locality);
      $('#province').html(address.province);
      $('#region').html(address.region);
      $('#state').html(address.state);
      $('#zip').html(address.zip);
  }
}

require(['backbone','bootstrap','gmaps'],function(Backbone,bootstrap, gmaps){
  "use strict";

  new gmaps($('#address'), resultCallback);
  console.log("main started");
});

