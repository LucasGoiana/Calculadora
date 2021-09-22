const display = document.querySelector("#display");
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador]");
const igual = document.querySelector("#igual");

let novoNumero = true;
let operador;
let numeroAnterior;
const atualizarDisplay = (texto) => {

    if(novoNumero){
        display.textContent = texto;
        novoNumero = false;
    }else{
        display.textContent += texto;
    }
        
}

const inserirNumero = (event) => 
    atualizarDisplay(event.target.textContent);


numeros.forEach(numero => numero.addEventListener("click", inserirNumero));

const selecionarOperador = (event) => {
    novoNumero = true;
    operador = event.target.textContent;
    numeroAnterior = display.textContent.replace(",", ".");
}

operadores.forEach(operador => operador.addEventListener("click", selecionarOperador));


const calcular = () =>{
    if (operador !== undefined) {
        const numeroAtual = display.textContent.replace(",", ".");
        const total = eval(numeroAnterior + operador + numeroAtual)
        novoNumero = true;
        atualizarDisplay(total.toString().replace(".", ","));
      
        operador = undefined;
    

    }
}

igual.addEventListener("click", calcular);

const limparDisplay = () => display.textContent = ""; 
document.querySelector("#limparDisplay").addEventListener("click", limparDisplay); 

const limparCalculo = () =>{
    limparDisplay();
    novoNumero = true;
    operador = undefined;
    numeroAnterior = undefined;
}

document.querySelector("#limparCalculo").addEventListener("click", limparCalculo); 


const backspace = () => display.textContent = display.textContent.slice(0, -1);

document.querySelector("#backspace").addEventListener("click", backspace); 


const inverterSinal = () => {
    novoNumero = true;
    display.textContent = display.textContent * (-1);
}

document.querySelector("#inverter").addEventListener("click", inverterSinal); 



const existeValor = () =>  display.textContent.length > 0 ;

const existDecimal = () => display.textContent.indexOf(",") !== -1;


const inserirDecimal = () => {
    if(!existDecimal()){
        if (existeValor()){
            atualizarDisplay(",");
        }else{
            atualizarDisplay("0,");
        }
    }
   
}

document.querySelector("#decimal").addEventListener("click", inserirDecimal);