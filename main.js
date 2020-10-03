//APi calling
const express = require("express");
const fetch = require("node-fetch");
const port = process.env.PORT;

const geomappingURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const geomappingKey = 'AIzaSyBxQ-ePRQRpr-82ztriavj7fWW6DO0rP10';
const envKey = '36ad0ea6934442c0b86ec7ab1bdaae8f';
const fireURL = 'https://api.breezometer.com/fires/v1/current-conditions?lat=';
const airURL =  'https://api.breezometer.com/air-quality/v2/current-conditions?lat='

let postalcode = 'K2T1J3';

const app = express();

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


function fullAddressDisplay(data){
    const main = data.results;
    if(!main){
        console.log('FunctionError');
    }
    else{
        for (let element of main) {
            for (key in element){
                if(key === 'formatted_address'){
                    console.log(element[key]);
                } 
                if(key === 'geometry'){
                    const geometry = element[key];
                    const location = (geometry.location);
                    const latitude =location.lat;
                    const longitude = location.lng;
                    fireRisk(latitude,longitude);
                    airRisk(latitude,longitude);
                }
            }
        }
    }
}

function fireRisk(lat,lng){
    fetch(fireURL+lat+"&lon="+lng+"&key="+envKey)
    .then((res) => res.json())
    .then((data) => {
      if(!data){
          console.log('ApiError');
      }
      else{
          const mainData = data.data;
          if(!mainData.fires[0]){
              console.log("You're in a low fire risk area");
          }
          else{
              console.log("You're in a high fire risk area");
          }
      }
    });
}

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
      }
    });
}
