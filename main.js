// Afegeix la teva clau pública de Mapbox just a l'inici
const MAPBOX_TOKEN = 'pk.ENGANXA_AQUI_EL_TEU_TOKEN_SENCER';

// Inicialitzar el mapa
const map = new maplibregl.Map({
    container: 'map',
    // Enganxa aquí l'URL de l'estil, assegurant-te d'afegir el token al final
    style: `mapbox://styles/adriamezq/cmqilgk97000o01sj9hzge33b`,
    center: [2.2468, 41.4469], // Coordenades de Badalona
    zoom: 13
});

// Com que Mapbox ja carrega les teves dades i colors des del núvol, 
// no et cal fer map.addSource() ni map.addLayer() aquí. 
// Només cal esperar que carregui per engegar l'scrollytelling.

map.on('load', () => {
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
