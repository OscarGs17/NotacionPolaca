function esOperador(token) {
    return ['+', '-', '*', '/'].includes(token);
}

function evaluarNotacionPolacaPrefija(texto) {
    let pila = [];
    let tokens = texto.split(' ').reverse();
    let pasosCalculo = '';

    for (let token of tokens) {
        if (esOperador(token)) {
            let operando1 = parseFloat(pila.pop());
            let operando2 = parseFloat(pila.pop());
            
            let resultado;
            switch (token) {
                case '+':
                    resultado = operando1 + operando2;
                    pasosCalculo += `${operando1} + ${operando2} = ${resultado}\n`;
                    break;
                case '-':
                    resultado = operando1 - operando2;
                    pasosCalculo += `${operando1} - ${operando2} = ${resultado}\n`;
                    break;
                case '*':
                    resultado = operando1 * operando2;
                    pasosCalculo += `${operando1} * ${operando2} = ${resultado}\n`;
                    break;
                case '/':
                    resultado = operando1 / operando2;
                    pasosCalculo += `${operando1} / ${operando2} = ${resultado}\n`;
                    break;
                default:
                    resultado = NaN;
            }
            pila.push(resultado);
        } else {
            pila.push(token);
        }
    }

    if (pila.length === 1) {
        pasosCalculo += `\nResultado final: ${pila[0]}`;
        return pasosCalculo;
    } else {
        return 'Entrada inválida';
    }
}

document.getElementById('guardarTexto').addEventListener('click', function() {
    let textoEntrada = document.getElementById('texto').value.trim();
    
    if (textoEntrada === '') {
        Swal.fire('Error', 'Por favor, ingresa la notación polaca.', 'error');
        return;
    }

    let resultado = evaluarNotacionPolacaPrefija(textoEntrada);
    document.getElementById('busqueda').value = resultado;
});

document.getElementById('limpiar').addEventListener('click', function() {
    document.getElementById('texto').value = '';
    document.getElementById('busqueda').value = '';
});
