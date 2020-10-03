//APi calling
const express = require("express");
const fetch = require("node-fetch");
const port = process.env.PORT;

const geomappingURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const geomappingKey = 'AIzaSyBxQ-ePRQRpr-82ztriavj7fWW6DO0rP10';
let addressNumber = 79;
let addressStreet = 'Cambior';
let streetType = 'cres';
let city = 'Ottawa';

const app = express();

  fetch(geomappingURL+addressNumber+"+"+addressStreet+"+"+streetType+",+"+city+"&key="+geomappingKey)
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
                    console.log(geometry.location);
                }
            }
        }
    }
}