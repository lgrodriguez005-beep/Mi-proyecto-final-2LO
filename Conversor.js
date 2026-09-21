// Lógica de cálculo dinámico consumiendo la API RESTful
document.getElementById('conversor-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const monto = parseFloat(document.getElementById('monto').value);
    const origen = document.getElementById('origen').value;
    const destino = document.getElementById('destino').value;

    const resultadoContainer = document.getElementById('resultado-container');
    const resultadoTexto = document.getElementById('resultado-texto');
    const timestamp = document.getElementById('timestamp');

    if (isNaN(monto) || monto <= 0) {
        alert('Por favor ingresa un monto válido.');
        return;
    }

    try {
        const respuesta = await fetch(`https://open.er-api.com/v6/latest/${origen}`);
        const datos = await respuesta.json();

        if (datos.result === 'success') {
            const tasa = datos.rates[destino];
            const resultado = (monto * tasa).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            resultadoTexto.textContent = `${resultado} ${destino}`;
            timestamp.textContent = `Tipo de cambio actualizado: ${new Date(datos.time_last_update_utc).toLocaleString('es-MX')}`;
            resultadoContainer.classList.remove('d-none');
        } else {
            throw new Error('Error en la respuesta de la API');
        }
    } catch (error) {
        console.error(error);
        alert('Ocurrió un problema al realizar el cálculo. Intenta de nuevo.');
    }
});