define('gmaps', ['jquery','async!http://maps.google.com/maps/api/js?sensor=false&language=it'],
function(){

  return function Gmaps(input, resultCallback){
    this.input=input;
    this.resultCallback=resultCallback;
    var mapitems = {};
    init();

    function createAddress(r){
      var street_number,route,locality,province,region,state,zip;
      $.each(r.address_components, function(k,v){
        if($.inArray('street_number', v.types)!=-1){
            street_number =v.long_name;
        }
        if($.inArray('route', v.types)!=-1){
            route=v.long_name;
        }
        if($.inArray('locality', v.types)!=-1){
            locality=v.long_name;
        }
        if($.inArray('administrative_area_level_2', v.types)!=-1){
            province=v.short_name;
        }
        if($.inArray('administrative_area_level_1', v.types)!=-1){
            region=v.long_name;
        }
        if($.inArray('country', v.types)!=-1){
            state=v.short_name;
        }
        if($.inArray('postal_code', v.types)!=-1){
            zip=v.short_name;
        }
      });
      return {
        pos: [r.geometry.location.Ya,r.geometry.location.Xa], state:state,zip:zip,
        street_number : street_number,route:route,locality:locality,province:province,region:region
      }

    }

    function init() {
      var geocoder = new google.maps.Geocoder();
      var geocode;
      input.typeahead({
        source: function(query,process) {
          resultCallback.onTyping();
          geocoder.geocode( {'address': query}, function(results, status) {
            if(status === 'OK' && results!=null){
              process($.map(results, function(item) {
                mapitems[item.formatted_address]=item;
                return item.formatted_address;
              }));
            }
          })
        },
        matcher: function(item){return true;},
        updater: function(item){
          var address = createAddress(mapitems[item]);
          resultCallback.onGmapAddress(address);
          return item;
        }
      });
    };
  }
});
