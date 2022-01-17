const inquirer = require('inquirer');
require('colors');

const questions = {
    type: 'list',
    name: 'options',
    message: 'Seleccione una opción del menú',
    choices: [
        {
            name: '1. Buscar ciudad',
            value: 1
        },
        {
            name: '2. Historial',
            value: 2
        },
        {
            name: '3. Salir',
            value: 0
        }
    ]    
}

const inquirerMenu = async() => {

    console.clear();

    console.log('====================================================');
    console.log('                 NodeJS Console App                 '.cyan);
    console.log('                 Weather Pablo Arce                 '.cyan);
    console.log('====================================================\n');

    const {options} = await inquirer.prompt(questions);

    return options;
}

const pausa = async() => {
    const question = {
        type: 'input',
        name: 'pausa',
        message: `Presione ${ 'ENTER'.cyan } para continuar...`
    }

    await inquirer.prompt(question);
}

const leerInput = async(message) => {

    const question = [
        {
            type: 'input',
            name: 'dataIn',
            message,
            validate(value){
                if(value.length === 0){
                   return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const {dataIn} = await inquirer.prompt(question);
    return dataIn;

}

const confirmarSalir = async() => {
    const question = {
        type: 'confirm',
        name: 'confirm',
        message: 'Desea salir de la app?'
    }

    const {confirm} = await inquirer.prompt(question);
    return confirm;
}

const listarLugares = async( arr = []) => {

    const choices = arr.map( (element, i) => {

        const idx = `${i + 1}.`.cyan;

        return {
            value: element.id,
            name: `${idx} ${element.nombre}`
        }
    });    

    const question = {
        type: 'list',
        name: 'elementId',
        message: 'Seleccione la ciudad',
        choices
    }

    const {elementId} = await inquirer.prompt(question);

    return elementId;
}



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    confirmarSalir,
    listarLugares
}