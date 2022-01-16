const axios = require('axios');

class Busquedas {

    constructor(){


    }

    async ciudad(lugar){

        try {
            
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data.data[0].email);
    
            return [];
            
        } catch (err) {
            console.log(err);
        }

    }


}

module.exports = Busquedas;