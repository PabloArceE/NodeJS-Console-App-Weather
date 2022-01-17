const axios = require('axios');

class Busquedas {

    constructor(){

    }
   
    get paramsMapbox(){

        return {
            'limit': '5',
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY
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
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (err) {
            return [];
        }

    }


}

module.exports = Busquedas;