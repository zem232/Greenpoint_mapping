// Zoe Martiniak's basic website

const LandUseLookup = (code) => {
  switch (code) {
    case 1:
      return {
        color: '#f4f455',
        description: '1 & 2 Family',
      };
    case 2:
      return {
        color: '#f7d496',
        description: 'Multifamily Walk-up',
      };
    case 3:
      return {
        color: '#FF9900',
        description: 'Multifamily Elevator',
      };
    case 4:
      return {
        color: '#f7cabf',
        description: 'Mixed Res. & Commercial',
      };
    case 5:
      return {
        color: '#ea6661',
        description: 'Commercial & Office',
      };
    case 6:
      return {
        color: '#d36ff4',
        description: 'Industrial & Manufacturing',
      };
    case 7:
      return {
        color: '#dac0e8',
        description: 'Transportation & Utility',
      };
    case 8:
      return {
        color: '#5CA2D1',
        description: 'Public Facilities & Institutions',
      };
    case 9:
      return {
        color: '#8ece7c',
        description: 'Open Space & Outdoor Recreation',
      };
    case 10:
      return {
        color: '#bab8b6',
        description: 'Parking Facilities',
      };
    case 11:
      return {
        color: '#5f5f60',
        description: 'Vacant Land',
      };
    case 12:
      return {
        color: '#5f5f60',
        description: 'Other',
      };
    default:
      return {
        color: '#5f5f60',
        description: 'Other',
      };
  }
};

// Loading the map from mapboxgl
mapboxgl.accessToken = 'pk.eyJ1IjoiemVtMjMyIiwiYSI6ImNqdWQ5NXQxcDAydWw0NHBleGlnbDQ2NWIifQ.xzxdaO_DvGxl4eNCuIZ-Zg';
var map = new mapboxgl.Map({
container: 'mapContainer',
style: 'mapbox://styles/mapbox/dark-v10',
center: [-73.950348,40.733210],
zoom: 12.5
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());


// the additional sources & layers cannot be loaded until the style of the base map is loaded
map.on('style.load', function() {
  //add a button click listener that will control the map
$('#park-slope').on('click', function(){
  map.flyTo({
  center: [-73.981, 40.670131],
  zoom: 14});
});

//setting paint property background
map.setPaintProperty('water','fill-color','cyan')


// setting up the geojson as a source in the map
// used to add visual layers
map.addSource('gp-pluto', {
  type: 'geojson', // other types of sources include: video, vector tile, & others
  data: './Data/gp-pluto.geojson',
});


//now need to add the geojson as a layer
// note that layers require id within curly brackets, whereas sources require id just before
map.addLayer({
  id: 'gp-lots-fill',
  type: 'fill',
  source: 'gp-pluto',
  paint: {
    'fill-opacity': 0.5,
    'fill-color': {
      type: 'categorical',
      property: 'landuse',
      stops: [
        ['01',
          'steelblue']]
          // try to play around and make a function if possible
    }
  },
  before: 'waterway-label'
})

// e is the event (js knows where cursor is when you move your mouse)
map.on('mousemove', function (e){
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['gp-lots-fill'],
  });
  // get the first feature from the array of returned features
  const lot = features[0]

  if (lot) {
  //console.log(lot.properties.address);
  $('#address').text(lot.properties.address);
  $('#landuse').text(LandUseLookup(parseInt(lot.properties.landuse)).description);
  }
})



})
