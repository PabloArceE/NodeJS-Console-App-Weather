require('dotenv').config();
require('colors');
const inquirer = require('inquirer');
const {
    inquirerMenu,
    pausa,
    leerInput,
    confirmarSalir,
    listarLugares
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async() => {

    const init = async() => {

        const busquedas = new Busquedas();
        let opt = null;

        do {
        
            opt = await inquirerMenu();
    
            switch (opt) {
                case 1:
                    // mostrar mensaje
                    const usrInput = await leerInput('Ciudad: ');
                    
                    // buscar los lugares
                    const lugares = await busquedas.ciudades(usrInput);

                    // seleccionar el lugar
                    const seleccion = await listarLugares(lugares);

                    // primeros datos
                    const lugarSeleccionado = lugares.find(lugar => lugar.id === seleccion);

                    // clima
                    

                    // mostrar resultado
                    console.log('\nInformación de la ciudad\n'.cyan);
                    console.log('Ciudad: ', lugarSeleccionado.nombre.toString().green );
                    console.log('Lat: ', lugarSeleccionado.lat);
                    console.log('Lng: ',lugarSeleccionado.lng);
                    console.log('Temperatura: ',);
                    console.log('Mínima: ',);
                    console.log('Máxima: ','\n');
                    
                    await pausa();
                    break;                    
                case 2:
                    console.log('Estas dentro del caso 2');
                    await pausa();
                    break;          
            }
    
        } while (opt !== 0);

        const ok = await confirmarSalir();
    
        if(!ok){        
            init();
        }else{
            console.clear();
        } 
    }
    
    init();  
    
}

main();