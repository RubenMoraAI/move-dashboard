
export const darkMapStyle: google.maps.MapTypeStyle[] = [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [
        { saturation: 36 },
        { color: "#000000" },
        { lightness: 40 },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [
        { visibility: "on" },
        { color: "#000000" },
        { lightness: 16 },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [
        { color: "#000000" },
        { lightness: 20 },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        { color: "#000000" },
        { lightness: 17 },
        { weight: 1.2 },
      ],
    },
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative.country",
      elementType: "all",
      stylers: [{ visibility: "simplified" }],
    },
    {
      featureType: "administrative.locality",
      elementType: "all",
      stylers: [
        { visibility: "simplified" },
        { saturation: -100 },
        { lightness: 30 },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        { color: "#34334f" },
        { lightness: -37 },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ visibility: "simplified" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        { color: "#2d2c45" },
        { lightness: 0 },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        { color: "#000000" },
        { lightness: 29 },
        { weight: 0.2 },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        { color: "#7d7c9b" },
        { lightness: 43 },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        { color: "#2d2c45" },
        { lightness: 1 },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [
        { color: "#2d2c45" },
        { lightness: -1 },
        { gamma: 1 },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        { color: "#7d7c9b" },
        { lightness: -31 },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        { color: "#2d2c45" },
        { lightness: -36 },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        { color: "#2d2c45" },
        { lightness: 0 },
        { gamma: 1 },
      ],
    },
  ];
  
  
  
export const lightMapStyle:google.maps.MapTypeStyle[] = [ 
        {
          featureType: "road",
          stylers: [
            { hue: "#5e00ff" }, 
            { saturation: -79 }, 
          ],
        },
        {
          featureType: "poi",
          stylers: [
            { saturation: -78 }, 
            { hue: "#6600ff" }, 
            { lightness: -47 }, 
            { visibility: "off" }, 
          ],
        },
        {
          featureType: "road.local",
          stylers: [
            { lightness: 22 }, 
          ],
        },
        {
          featureType: "landscape",
          stylers: [
            { hue: "#6600ff" }, 
            { saturation: -11 }, 
          ],
        },
        {
          featureType: "water",
          stylers: [
            { saturation: -65 }, 
            { hue: "#1900ff" }, 
            { lightness: 8 }, 
          ],
        },
        {
          featureType: "road.local",
          stylers: [
            { weight: 1.3 }, 
            { lightness: 30 }, 
          ],
        },
        {
          featureType: "transit",
          stylers: [
            { visibility: "simplified" }, 
            { hue: "#5e00ff" }, 
            { saturation: -16 }, 
          ],
        },
        {
          featureType: "transit.line",
          stylers: [
            { saturation: -72 }, 
          ],
        },
      ];
      