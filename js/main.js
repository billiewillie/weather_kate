"use strict";

window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/2c88cc4a8d0deef18a4c57ce1515e30b/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // console.log(data);          
          const {temperature, summary, icon} = data.currently;
          temperatureDegree.textContent = Math.floor((temperature-32)/1.8);
          temperatureDescription.textContent = summary;
          setIcons(icon, document.querySelector('.icon'));
          function time(el, delay){
            setTimeout(() => {
              el.style.opacity = '1';
            }, delay);
          }
          
          time(document.querySelector('.text1'), 3000);
          time(document.querySelector('.text2'), 5000);
        })
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons ({color: 'white'});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});