// 1. Inicialitzar el mapa de MapLibre
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', // Mapa base neutre i gratuït
    center: [2.1734, 41.3851], // Canvia-ho per les coordenades de la teva zona d'estudi [long, lat]
    zoom: 12
});

// 2. Carregar el GeoJSON local quan el mapa estigui a punt
map.on('load', () => {
    map.addSource('dades-tfg', {
        type: 'geojson',
        data: './data/matriu_tfg.geojson' // Ruta relativa al teu arxiu dins del repositori
    });

    // Afegir la capa de polígons bàsica (ajusta l'estil com vulguis)
    map.addLayer({
        'id': 'capa-poligons',
        'type': 'fill',
        'source': 'dades-tfg',
        'paint': {
            'fill-color': '#3182bd',
            'fill-opacity': 0.6,
            'fill-outline-color': '#ffffff'
        }
    });

    // Un cop les dades estan carregades, inicialitzem Scrollama
    initScrollama();
});

// 3. Configurar els esdeveniments d'scroll
function initScrollama() {
    const scroller = scrollama();

    scroller
        .setup({
            step: '.step',
            offset: 0.5 // S'activa quan el bloc arriba a la meitat de la pantalla
        })
        .onStepEnter((response) => {
            // response.element mostra quin bloc de text s'ha activat
            const stepIndex = response.element.dataset.step;

            // Definir accions cartogràfiques segons el pas on es troba l'usuari
            if (stepIndex === "1") {
                map.flyTo({ center: [2.1734, 41.3851], zoom: 12, pitch: 0 });
            } 
            else if (stepIndex === "2") {
                // Exemple: Moure la càmera cap a unes coordenades específiques d'un barri
                map.flyTo({ center: [2.2111, 41.4422], zoom: 14.5, pitch: 45, duration: 2000 });
            } 
            else if (stepIndex === "3") {
                // Exemple: Canviar el color de la capa per mostrar un canvi de variable de la matriu
                map.setPaintProperty('capa-poligons', 'fill-color', '#e34a33');
            }
        });

    // Reajustar Scrollama si es canvia la mida de la finestra
    window.addEventListener('resize', scroller.resize);
}
