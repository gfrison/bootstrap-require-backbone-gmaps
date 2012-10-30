Template for creating web pages based on:

- Twitter Bootstrap
- RequireJS
- BackboneJS
- Google maps (autocomplete) API

You can see the demo <a href="http://bootstrap-require-backbone-gma.appspot.com/">HERE</a>

The module js/gmaps.js make use og Google API and provides an easy interface for assisting users to find an address through Google Maps.

In your code you have just to define:

<code>
new gmaps($('#address'), resultCallback);
</code>

where resultCallback implements:
- onGmapAddress
- onTyping


