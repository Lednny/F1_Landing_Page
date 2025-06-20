// En este script se coloca la lógia para la carga de las rutas y de los componentes que aparecen en la caorpeta "components".

const routes = {
    overview: 'src/components/overview/overview.html',
    carreras: 'src/components/carreras/carreras.html',
    equipos: 'src/components/equipos/equipos.html',
    pilotos: 'src/components/pilotos/pilotos.html',
    historia: 'src/components/historia/historia.html',
    'dinamicas-carreras': 'src/components/dinamicas-carreras/dinamicas-carreras.html'
};


//Esta función carga el componente que se está solicitando, que en este caso sería el que se encuentra en la ruta del hash de la URL, "Overview" por defecto, que sería el menú principal al cargar el sitio web.
function loadComponent(route) {
    const path = routes[route] || routes['overview'];
    fetch(path)
        .then(res => res.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
        });
}

// Está función cambia la ruta por defecto a "overview" si no se encuentra una ruta válida en el hash de la URL.
function handleRoute() {
    let route = location.hash.replace('#', '');
    if (!route || !routes[route]) {
        route = 'overview';
        if (location.hash !== '#overview') {
            window.location.hash = '#overview';
            return; 
        }
    }
    loadComponent(route);
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);