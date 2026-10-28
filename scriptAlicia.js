// ==========================================
// EJERCICIO 1: La poción mágica de Alicia
// ==========================================
const formPocion = document.getElementById('formPocion');
formPocion.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita la recarga de la página (RF-08)

    // Captura de datos usando getElementById y value (RF-03)
    const alturaInicialInput = document.getElementById('alturaInicial').value;
    const mlPocionInput = document.getElementById('mlPocion').value;
    const divResultado = document.getElementById('resultadoPocion');

    // Conversión a tipo numérico
    const alturaInicial = parseFloat(alturaInicialInput);
    const mlPocion = parseFloat(mlPocionInput);
    const alturaPuerta = 150; // Altura fija de referencia

    // Validación de entradas (RF-05)
    if (isNaN(alturaInicial) || isNaN(mlPocion) || alturaInicial <= 0 || mlPocion < 0) {
        divResultado.className = "resultado error";
        divResultado.textContent = "Error: Por favor ingrese valores numéricos válidos y positivos para la altura y la poción.";
        return;
    }

    // Cálculo y procesamiento con estructuras condicionales (RF-04, RF-07)
    // Regla: Nueva Altura = Altura Inicial + (ml * 0.5) - 5
    const nuevaAltura = calcularNuevaAltura(alturaInicial, mlPocion);
    
    let mensajeEstado = "";
    if (nuevaAltura === alturaPuerta) {
        mensajeEstado = "¡Alicia mide exactamente lo mismo que la puerta! Puede pasar rozando el dintel con cuidado.";
        divResultado.className = "resultado exito";
    } else if (nuevaAltura < alturaPuerta) {
        mensajeEstado = "¡Excelente! La poción redujo a Alicia lo suficiente. Puede atravesar la puerta sin problemas.";
        divResultado.className = "resultado exito";
    } else {
        mensajeEstado = "¡Oh no! Alicia es demasiado alta para la puerta. Necesita corregir la cantidad de poción.";
        divResultado.className = "resultado error";
    }

    // Mostrar resultados en la interfaz usando textContent (RF-03, RF-06)
    divResultado.innerHTML = `
        <strong>Altura Inicial:</strong> ${alturaInicial} cm<br>
        <strong>Poción Consumida:</strong> ${mlPocion} ml<br>
        <strong>Nueva Altura Calculada:</strong> ${nuevaAltura.toFixed(2)} cm<br>
        <strong>Estado:</strong> ${mensajeEstado}
    `;
});

// Función propia para el Ejercicio 1 (RF-07)
function calcularNuevaAltura(altura, pocion) {
    const factorCrecimiento = pocion * 0.5;
    const evaporacion = 5;
    return altura + factorCrecimiento - evaporacion;
}


// ==========================================
// EJERCICIO 2: La merienda del Sombrerero Loco
// ==========================================
const formMerienda = document.getElementById('formMerienda');
formMerienda.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombreInvitado').value.trim();
    const bebida = document.getElementById('tipoBebida').value;
    const cantidadTazasInput = document.getElementById('cantidadTazas').value;
    const divResultado = document.getElementById('resultadoMerienda');

    const cantidad = parseInt(cantidadTazasInput, 10);

    // Validaciones (RF-05)
    if (nombre === "" || bebida === "" || isNaN(cantidad) || cantidad <= 0 || cantidad > 20) {
        divResultado.className = "resultado error";
        divResultado.textContent = "Error: Verifique que el nombre no esté vacío, seleccione una bebida y la cantidad esté entre 1 y 20.";
        return;
    }

    // Obtener precio unitario mediante switch (RF-02, RF-04)
    const precioUnitario = obtenerPrecioBebida(bebida);
    let nombreBebidaTexto = obtenerNombreBebida(bebida);

    // Procesamiento y cálculos (subtotal y descuento)
    const subtotal = cantidad * precioUnitario;
    let descuento = 0;
    
    // Condicional para aplicar 10% de descuento si pide más de 5 tazas
    if (cantidad > 5) {
        descuento = subtotal * 0.10;
    }
    const total = subtotal - descuento;

    // Mostrar resultados (RF-06)
    divResultado.className = "resultado exito";
    divResultado.innerHTML = `
        <strong>Invitado:</strong> ${nombre}<br>
        <strong>Bebida:</strong> ${nombreBebidaTexto}<br>
        <strong>Cantidad:</strong> ${cantidad} taza(s)<br>
        <strong>Precio Unitario:</strong> $${precioUnitario.toFixed(2)}<br>
        <strong>Subtotal:</strong> $${subtotal.toFixed(2)}<br>
        <strong>Descuento aplicado:</strong> $${descuento.toFixed(2)}<br>
        <strong>Total a pagar:</strong> $${total.toFixed(2)}
    `;
});

// Funciones propias para el Ejercicio 2 (RF-07)
function obtenerPrecioBebida(tipo) {
    switch (tipo) {
        case 'te': return 10;
        case 'infusion': return 15;
        case 'cafe': return 12;
        case 'jugo': return 8;
        default: return 0;
    }
}

function obtenerNombreBebida(tipo) {
    switch (tipo) {
        case 'te': return "Té Real";
        case 'infusion': return "Infusión del Tiempo";
        case 'cafe': return "Café de Marzo";
        case 'jugo': return "Jugo de Lirios";
        default: return "Desconocida";
    }
}


// ==========================================
// EJERCICIO 3: El desafío de la Reina de Corazones
// ==========================================
const formReina = document.getElementById('formReina');
formReina.addEventListener('submit', function(event) {
    event.preventDefault();

    const limiteInput = document.getElementById('limiteCartas').value;
    const divResultado = document.getElementById('resultadoReina');
    const limite = parseInt(limiteInput, 10);

    // Validaciones (RF-05)
    if (isNaN(limite) || limite < 1 || limite > 50) {
        divResultado.className = "resultado error";
        divResultado.textContent = "Error: Ingrese un número entero válido entre 1 y 50 para la cantidad de cartas.";
        return;
    }

    let secuenciaHTML = "";
    let cantidadPares = 0;
    let cantidadImpares = 0;
    let sumaPares = 0;
    let sumaImpares = 0;

    // Estructura repetitiva for (RF-02, RF-04)
    for (let i = 1; i <= limite; i++) {
        let esPar = (i % 2 === 0);
        if (esPar) {
            cantidadPares++;
            sumaPares += i;
            secuenciaHTML += `<span style="color: #0b5e26; font-weight: bold;">[${i}: Par]</span> `;
        } else {
            cantidadImpares++;
            sumaImpares += i;
            secuenciaHTML += `<span style="color: #5c0632; font-weight: bold;">[${i}: Impar]</span> `;
        }
    }

    // Condicional para determinar qué grupo tiene mayor suma
    let mensajeMayorSuma = "";
    if (sumaPares > sumaImpares) {
        mensajeMayorSuma = "El grupo de números **Pares** tiene la mayor suma acumulada.";
    } else if (sumaImpares > sumaPares) {
        mensajeMayorSuma = "El grupo de números **Impares** tiene la mayor suma acumulada.";
    } else {
        mensajeMayorSuma = "¡Empate exacto! Ambos grupos suman lo mismo.";
    }

    // Mostrar resultados (RF-06)
    divResultado.className = "resultado exito";
    divResultado.innerHTML = `
        <strong>Límite analizado:</strong> ${limite} cartas<br>
        <strong>Secuencia clasificada:</strong><br><div style="margin: 8px 0; line-height: 1.8;">${secuenciaHTML}</div><hr>
        <strong>Cantidad de Pares:</strong> ${cantidadPares} | <strong>Suma de Pares:</strong> ${sumaPares}<br>
        <strong>Cantidad de Impares:</strong> ${cantidadImpares} | <strong>Suma de Impares:</strong> ${sumaImpares}<br>
        <strong>Veredicto de la Reina:</strong> ${mensajeMayorSuma}
    `;
});