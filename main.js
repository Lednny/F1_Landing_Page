// En este script se coloca la lógia para la carga de las rutas y de los componentes que aparecen en la caorpeta "components".

const routes = {
    overview: 'src/components/overview/overview.html',
    carreras: 'src/components/carreras/carreras.html',
    equipos: 'src/components/equipos/equipos.html',
    pilotos: 'src/components/pilotos/pilotos.html',
    historia: 'src/components/historia/historia.html',
    'dinamicas-carreras': 'src/components/dinamicas-carreras/dinamicas-carreras.html'
};

function loadComponent(route) {
    const path = routes[route] || routes['overview'];
    fetch(path)
        .then(res => res.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;

            // Cargar el JS correspondiente si existe
            const scriptPath = path.replace('.html', '.js');
            fetch(scriptPath, {method: 'HEAD'})
                .then(res => {
                    if (res.ok) {
                        const script = document.createElement('script');
                        script.src = scriptPath;
                        document.body.appendChild(script);
                    }
                });
        });
}

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


