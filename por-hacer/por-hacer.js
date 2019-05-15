const fs = require('fs');

//array que contiene el listado de las tareas
let listadoPorHacer = [];

const guardarDB = () => {
  //convierto el arreglo a un formato JSON
  let data = JSON.stringify(listadoPorHacer);

  //grabamos la data en el archivo
  fs.writeFile('db/data.json', data, (err) => {
    if(err)
      throw new Error('No se pudo grabar');
  });
}

const cargarDB = () => {
  try {
    listadoPorHacer = require('../db/data.json');
    //console.log(listadoPorHacer);
  }
  catch(error){
    listadoPorHacer = [];
  }
}

const crear = (descripcion) => {
  cargarDB();

  //objeto de tareas
  let porHacer = {
    descripcion,
    completado: false
  };

  //añado al array la tarea
  listadoPorHacer.push(porHacer);

  guardarDB();

  return porHacer;
}

const getListado = () => {
  cargarDB();
  return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
  cargarDB();
  //obtenemos el indice
  let index = listadoPorHacer.findIndex(tarea => {
    return tarea.descripcion === descripcion;
  });

  if(index >= 0){
    listadoPorHacer[index].completado = completado;
    guardarDB();
    return true;
  }
  else {
     return false;
  }
}

const borrar = (descripcion) => {
  cargarDB();
  let nuevoListado = listadoPorHacer.filter(tarea => {
    return tarea.descripcion !== descripcion
  });
  if(nuevoListado.length === listadoPorHacer.length){
    return false;
  }
  else{
    listadoPorHacer = nuevoListado;
    guardarDB();
    return true;
  }
}

module.exports = {
  crear,
  guardarDB,
  getListado,
  actualizar,
  borrar
}
