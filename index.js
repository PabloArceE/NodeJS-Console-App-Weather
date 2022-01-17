require('dotenv').config();
require('colors');
const inquirer = require('inquirer');
const {
    inquirerMenu,
    pausa,
    leerInput,
    confirmarSalir
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
                    const lugar = await leerInput('Ciudad: ');
                    
                    await busquedas.ciudad(lugar);

                    // buscar los lugares

                    // seleccionar el lugar

                    // clima

                    // mostrar resultado
                    console.log('\nInformación de la ciudad\n'.cyan);
                    console.log('Ciudad: ', );
                    console.log('Lat: ', );
                    console.log('Lng: ',);
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