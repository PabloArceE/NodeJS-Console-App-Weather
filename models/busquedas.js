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


    async ciudad(lugar){

        try {
            
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            console.log(resp.data);


            /* const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/coedoba.json?language=es&access_token=pk.eyJ1IjoicGFibG9hcmNlIiwiYSI6ImNreWhwdnVsNDFsNW4ycWxrdmpvcXA1b2kifQ.DSPOKKZcGQxtdcwKM26xqA');
            console.log(resp.data); */
    
            return [];
            
        } catch (err) {
            return [];
        }

    }


}

module.exports = Busquedas;