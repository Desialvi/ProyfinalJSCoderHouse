//Proyecto de Evaluación de Personas para Prepaga Médica
let form = document.getElementById("form");
// let Nombre = document.getElementById("Nombre");
// let Apellido = document.getElementById("Apellido");
// let DNI = document.getElementById("DNI");
// let Enfermedades = document.getElementById("EnfermedadesPreexistentes");
// let Nacimiento = document.getElementById("AñoNacimiento");
// let Altura = document.getElementById("Altura");
// let Peso = document.getElementById("Peso");

class Persona {
  constructor(nombre, apellido, dni, altura, peso, anio, enfermedad, provincia) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.altura = altura;
    this.peso = peso;
    this.anio = anio;
    this.edad = new Date().getFullYear() - this.anio;
    this.enfermedad = enfermedad;
    this.provincia = provincia;
  }
  IndiceMasaCorporal() {
    return (this.peso / this.altura ** 2).toFixed(2);
  }
  InfoDatos() {
    return `Su nonbre completo es ${this.nombre} ${this.apellido}, y su DNI ${this.dni}.`;
  }
  InfoPersona() {
    return `Tiene ${this.edad} años, su peso es ${this.peso} kg y su altura es ${this.altura}.`;
  }
  InfoProvincia() {
    return `La obra social es para la provincia ${this.provincia}.`;
  }
}

function emptyDatos() {
  Personas = [];
  container.innerHTML = "";
  showDatos();
}

function clear() {
  localStorage.clear();
  Personas = [];
  container.innerHTML = "";
  // showDatos();
}

// creo un array
let Personas = [];

let container = document.getElementById("container");
function showDatos() {
  let persona = new Persona(
    form.nombre.value,
    form.apellido.value,
    form.dni.value,
    parseFloat(form.altura.value),
    form.peso.value,
    form.nacimiento.value,
    form.enfermedad.value,
    form.provincia.value
  );
  console.log(persona)
  let container = document.getElementById("container");
  if (persona.nombre !== "" && persona.apellido !== "" && persona.peso !== "" && persona.altura !== "" && persona.nacimiento !== 2022 && persona.provincia !== "-1") {Personas.push(persona);
  localStorage.setItem("personas", JSON.stringify(Personas));
  const ListaStorage = JSON.parse(localStorage.getItem("personas"));
  if (ListaStorage !== null) {
    
    container.innerHTML = "";
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `<div>
                                      <h5>${persona.InfoDatos()}</h5>
                                      <h5>${persona.InfoPersona()}</h5>
                                      <h5>${persona.InfoProvincia()}</h5>
                                      <h5> Tiene un índice de masa corporal de ${persona.IndiceMasaCorporal()}</h5>
                                  </div>`;

    container.appendChild(contenedor);
    form.reset();
  } else {
    container.innerHTML = "";
  }
} else  {
  container.innerHTML = `<div>
  <h4> Es Obligatorio ingresar tus datos </h4>`;
} 

}
  

//eventos botones
let btnenviar = document.getElementById("btnenviar");
let btnlimpiar = document.getElementById("btnlimpiar");

//evento que escucha
btnenviar.addEventListener("click", showDatos);
btnlimpiar.addEventListener("click", () => {
  emptyDatos();
  clear();
});



// Datos obra social
const obrasocial = [];

//clase ObraSocial

class prepaga{
    constructor(Nombre, precio){
        this.id = obrasocial.length;
        this.Nombre = Nombre.toUpperCase();
        this.precio = Number(precio);
    }
    detalle(){
        return `la obra social es ${this.Nombre} y su precio mensual es $ ${this.precio}`
    }
}

//enviar info al array

obrasocial.push(new prepaga("Osbe",5000))
obrasocial.push(new prepaga("Ominti",10000))
obrasocial.push(new prepaga("Medicos",15000))

console.log(obrasocial);


//funcion para generar el select de los obrasocial

function obrasocialSelect(id){
  let innerSelect = '';
  obrasocial.forEach(OSocial => innerSelect += `<option value=${OSocial.id}>${OSocial.Nombre}</option>`)
  return `<select id="${id}">${innerSelect}</select>`;
}

//agregar al dom
$("body").append(obrasocialSelect('elegirObraSocial'));
$("#elegirObraSocial").change((e)=>{
  const seleccion = obrasocial.find(obraso => obraso.id == e.target.value);
  $("body").append(`<h4>${seleccion.detalle()}</h4>`)
})



// AJAX


function selectLista(array, id){
  let innerSelect = "";
  array.forEach(provincia => innerSelect += `<option value="${provincia.nombre}">${provincia.nombre}</option>`)
  return `<select id="${id}"> ${innerSelect}</select>`;
}


let URL = "https://apis.datos.gob.ar/georef/api/provincias";
const provincias = [{id: -1, nombre: "seleccion de provincias"}];


$(document).ready(()=>{
  //llamado get de las provinciaas
  $.get(URL,function (data, state) {
          if(state === "success"){
              provincias.push(...data.provincias);
              console.log(provincias)
              //agregamos el select
              $("#containerselect").append(`<div>Seleccione su provincia: 
              ${selectLista(provincias, "provincia")}</div>`);
              $("#containerselect").append("<h4 id='salidaProvincias'></h4>");
              $("#containerselect").change(function (e) { 
                  
                const seleccionados = provincias.find( obj => obj.id == e.target.value)
                  //$("#salidaProvincias").html(`Ud ha seleccionado ${seleccionados.nombre}`)
              });
          }
      });
});














