//APi calling

//FREE/PUBLIC API KEYS and url's
const geomappingURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const geomappingKey = 'AIzaSyBxQ-ePRQRpr-82ztriavj7fWW6DO0rP10';
const envKey = '76f4554dc5b446458ef9613bc064a741';
const fireURL = 'https://api.breezometer.com/fires/v1/current-conditions?lat=';
const airURL =  'https://api.breezometer.com/air-quality/v2/current-conditions?lat='

//declaring global variables
let postalcode = '';
let airInfo = '';
let fireInfo = '';
let locale ='';

//initial API call: zip/postal code to location and lat/longitude
function submit(){
    let postalcode = document.getElementById("PostalCode").value;
    if(postalcode){
        fetch(geomappingURL+postalcode+"&key="+geomappingKey)
        .then((res) => res.json())
        .then((data) => {
            if(!data){
                console.log('ApiError');
            }
            else{
                fullAddressDisplay(data);
            }
        });
    }
}

//filters out adress and coordinates from the API sent data
function fullAddressDisplay(data){
    const main = data.results;
    if(!main){
        console.log('FunctionError');
    }
    else{
        for (let element of main) {
            for (key in element){
                if(key === 'formatted_address'){
                    locale =(element[key]);  
                    
                } 
                if(key === 'geometry'){
                    const geometry = element[key];
                    const location = (geometry.location);
                    const latitude =location.lat;
                    const longitude = location.lng;
                    
                    fireRisk(latitude,longitude,locale);
                    airRisk(latitude,longitude,locale);
                }
            }
        }
    }
}

//fire risk API takes in coordinates and evualuates wether ther is
//a fire in a 30km radius
function fireRisk(lat,lng,locale){
    fetch(fireURL+lat+"&lon="+lng+"&key="+envKey)
    .then((res) => res.json())
    .then((data) => {
      if(!data){
          console.log('ApiError');
      }
      else{
          const mainData = data.data;
          if(!mainData.fires[0]){
              console.log(" is a low fire risk area");
              fireInfo = " is a low fire risk area with ";
              document.getElementById("results").innerHTML = locale+fireInfo + airInfo + ". Scroll down to see what you should do.";
          }
          else{
              console.log(" is a high fire risk area");
              fireInfo = " is a high fire risk area with ";
              document.getElementById("results").innerHTML = locale+fireInfo + airInfo + ". Scroll down to see what you should do.";
          }
      }
    });
}
 
//takes coordinate data and retries API air index out of 100 based on location 
function airRisk(lat,lng){
    fetch(airURL+lat+"&lon="+lng+"&key="+envKey)
    .then((res) => res.json())
    .then((data) => {
      if(!data){
          console.log('ApiError');
      }
      else{
          const mainData = data.data.indexes.baqi;
            console.log(mainData.category+": "+mainData.aqi_display+"/100");
            airInfo = mainData.category+": "+mainData.aqi_display+"/100";
            document.getElementById("results").innerHTML = locale+ fireInfo + airInfo + ". Scroll down to see what you should do.";
      }
    });
}






















































































































































































































































































































































//Michel was here