const inquirer = require('inquirer');
const {
    inquirerMenu,
    pausa,
    leerInput,
    confirmarSalir
} = require('./helpers/inquirer');

const main = async() => {

    const init = async() => {

        let opt = null;

        do {
        
            opt = await inquirerMenu();
    
            switch (opt) {
                case 1:
                    console.log('Estas dentro del caso 1');
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