// Consumo de API RESTful y renderizado dinámico en Dashboard
document.addEventListener('DOMContentLoaded', () => {
    cargarTiposDeCambio();
});

async function cargarTiposDeCambio() {
    const contenedor = document.getElementById('dashboard-rates');
    // Usamos la API pública ExchangeRate-API
    const URL = 'https://open.er-api.com/v6/latest/USD';

    try {
        const respuesta = await fetch(URL);
        if (!respuesta.ok) throw new Error('Error al conectar con la API');

        const datos = await respuesta.json();
        const tasas = datos.rates;

        // Limpiar spinner
        contenedor.innerHTML = '';

        // Monedas principales a mostrar
        const divisas = [
            { codigo: 'MXN', nombre: 'Peso Mexicano', bandera: '🇲🇽' },
            { codigo: 'EUR', nombre: 'Euro', bandera: '🇪🇺' },
            { codigo: 'GBP', nombre: 'Libra Esterlina', bandera: '🇬🇧' }
        ];

        divisas.forEach(divisa => {
            const valorEnMXN = (tasas['MXN'] / tasas[divisa.codigo]).toFixed(2);

            contenedor.innerHTML += `
                <div class="col-md-4 mb-3">
                    <div class="card shadow-sm border-0 h-100">
                        <div class="card-body">
                            <h5 class="card-title text-muted">${divisa.bandera} ${divisa.nombre} (${divisa.codigo})</h5>
                            <h2 class="display-6 fw-bold text-primary my-3">$${valorEnMXN} MXN</h2>
                            <p class="card-text text-muted small">Actualizado vía ExchangeRate-API</p>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error:', error);
        contenedor.innerHTML = `
            <div class="col-12 alert alert-danger" role="alert">
                No se pudieron cargar los tipos de cambio en tiempo real. Por favor intenta más tarde.
            </div>
        `;
    }
}
