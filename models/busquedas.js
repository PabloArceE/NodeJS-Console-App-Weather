const axios = require('axios');

class Busquedas{

    historial = []

    constructor(){

    }
   
    get paramsMapbox(){

        return {
            'limit': '5',
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY
        }
    }
    
    get paramsOpenWeather(){

        return{                    
            'lang': 'es',
            'units': 'metric',
            'appid': process.env.WEATHERMAP_KEY
        }
    }


    async ciudades(lugar){

        try {
            
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lon: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (err) {
            return [];
        }

    }

    async climaCiudad(lat, lon){
        
        try {
            
            const instance = axios.create({
                baseURL:`http://api.openweathermap.org/data/2.5/weather?`,
                params: {...this.paramsOpenWeather, lat, lon}
            });

            const resp = await instance.get();
            const {weather, main} = resp.data

            return {
                desc:weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp:main.temp
            }            

        } catch (err) {
            console.log(err);
        }

    }

    agregarHistorial (ciudad){
        // prevenir duplicados
        if(!this.historial.includes(ciudad)){
            this.historial.unshift(ciudad)
        }
    }


}

module.exports = Busquedas;