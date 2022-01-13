const inquirer = require('inquirer');
require('colors');

const questions = {

    type: 'list',
    name: 'options',
    message: 'Que quiere hacer?\n',
    choices:[
        {
            name: '1. Crear tarea',
            value: '1'
            
        },
        {
            name: '2. Lista de tareas',
            value: '2'
            
        },
        {
            name: '3. Listar tareas completadas',
            value: '3'
            
        },
        {
            name: '4. Listar tareas pendientes',
            value: '4'
            
        },
        {
            name: '5. Completar tareas',
            value: '5'
            
        },
        {
            name: '6. Borrar tareas',
            value: '6'
            
        },
        {
            name: '7. Salir',
            value: '0'
            
        }
                
    ]
}

const inquireMenu = async() => {

    // console.clear();
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'.green);
    console.log('       NodeJS Console App          '.blue);
    console.log('             Tasks                 '.blue);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'.green);

    const {options} = await inquirer.prompt(questions);

    return options;
}

const pause = async() => {

    const question = {
        
        type: 'input',
        name: 'pause',
        message: `Presione ${'ENTER'.blue} para continuar\n`
    }

    console.log('\n');

    await inquirer.prompt(question);

} 

const leerInput = async( message ) => {

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

const listadoTareasBorrar = async( tareas ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }        
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })
    
    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(question);

    return id;
}

const confirm = async( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message

        }
    ]

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async( tareas ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }        
    })

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones las tareas completadas\n',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question);

    return ids;
}


module.exports = {
    inquireMenu,
    pause,
    leerInput,
    listadoTareasBorrar,
    confirm,
    mostrarListadoChecklist
}