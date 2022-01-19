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
                    
                    // guardar en historial
                    busquedas.agregarHistorial(lugarSeleccionado.nombre)
                    
                    // clima
                    const clima = await busquedas.climaCiudad(lugarSeleccionado.lat, lugarSeleccionado.lon)        
                    

                    // mostrar resultado
                    console.log('\nInformación de la ciudad\n'.cyan);
                    console.log('Ciudad: ', lugarSeleccionado.nombre.green );
                    console.log('Lat: ', lugarSeleccionado.lat);
                    console.log('Lon: ',lugarSeleccionado.lon);
                    console.log('Clima: ', clima.desc.yellow);
                    console.log('Temperatura: ', clima.temp);
                    console.log('Mínima: ', clima.min);
                    console.log('Máxima: ', clima.max,'\n');
                    
                    await pausa();
                    break;                    
                case 2:
                    busquedas.historial.forEach((ciudad, i) => {
                        const idx = `${ i + 1}.`.green;
                        console.log(`${idx} ${ciudad}`);
                    });
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

// Para ver las variables de entorno 
// console.log(process.env)