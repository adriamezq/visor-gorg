// 1. Inicialitzar el mapa de MapLibre
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', // Mapa base neutre i gratuït
    center: [2.1734, 41.3851], // Canvia-ho per les coordenades de la teva zona d'estudi [long, lat]
    zoom: 12
});

// 2. Carregar el GeoJSON local quan el mapa estigui a punt
map.on('load', () => {
    // 1. Carregar la capa base (ex: el geojson de Badalona)
    map.addSource('dades-bdn', {
        type: 'geojson',
        data: './data/bdn_aem.geojson' 
    });

    map.addLayer({
        'id': 'capa-poligons-bdn',
        'type': 'fill', // Suposant que són polígons (seccions censals, barris...)
        'source': 'dades-bdn',
        'paint': {
            'fill-color': '#e0e0e0',
            'fill-opacity': 0.8,
            'fill-outline-color': '#ffffff'
        }
    });

    // 2. Carregar una segona capa (ex: els punts dels HUTs)
    map.addSource('dades-huts', {
        type: 'geojson',
        data: './data/HUTbdn.geojson'
    });

    map.addLayer({
        'id': 'capa-punts-huts',
        'type': 'circle', // Suposant que són coordenades puntuals
        'source': 'dades-huts',
        'paint': {
            'circle-color': '#e34a33',
            'circle-radius': 5,
            'circle-opacity': 0 // Comencem amb opacitat 0 perquè no es vegi al principi
        }
    });

    // Un cop carregades les dades, inicialitzem l'scrollytelling
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
        // Dins de initScrollama() ...
        .onStepEnter((response) => {
            const stepIndex = response.element.dataset.step;

            if (stepIndex === "1") {
                // Pas 1: Vista general de Badalona, HUTs invisibles
                map.flyTo({ center: [2.2468, 41.4469], zoom: 13, pitch: 0 }); // Coordenades de Badalona
                map.setPaintProperty('capa-punts-huts', 'circle-opacity', 0); 
            } 
            else if (stepIndex === "2") {
                // Pas 2: Apareixen els HUTs
                map.setPaintProperty('capa-punts-huts', 'circle-opacity', 0.9);
            } 
            else if (stepIndex === "3") {
                // Pas 3: Moviment cap a una zona concreta de l'AMB
                map.flyTo({ center: [2.1734, 41.3851], zoom: 12, pitch: 45 });
            }
        });

    // Reajustar Scrollama si es canvia la mida de la finestra
    window.addEventListener('resize', scroller.resize);
}
