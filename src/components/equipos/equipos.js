
//FUNCIÓN PARA NOSTRAR EL ESTADO DEL TIEMPO ACTUAL CON API KEY

(function(){
  const weatherWidget = document.querySelector('.weather-widget');
  if (!weatherWidget) return;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = '8cb8a095778f4bd1825212942252406';
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&lang=es`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log('data', data);
        const temp = Math.round(data.current.temp_c);
        const desc = data.current.condition.text;
        const iconUrl = "https:" + data.current.condition.icon;

        weatherWidget.innerHTML = `<img src="${iconUrl}" alt="${desc}" style="vertical-align:middle;width:32px;height:32px;"> ${temp}°C, ${desc}`;
      } catch (e) {
        weatherWidget.textContent = 'No se pudo cargar el clima';
      }
    }, () => {
      weatherWidget.textContent = 'Ubicación no disponible';
    });
  } else {
    weatherWidget.textContent = 'Geolocalización no soportada';
  }     

    // Reloj
  const clock = document.querySelector('.clock-widget');
  function updateClock() {
    if (!clock) return;
    const now = new Date();
    const horas = now.getHours().toString().padStart(2, '0');
    const minutos = now.getMinutes().toString().padStart(2, '0');
    clock.textContent = `${horas}:${minutos}`;
  }
  if (clock) {
    setInterval(updateClock, 1000);
    updateClock();
  }


// FUNCIÓN PARA MOSTRAR A TODOS LOS EQUIPOS POR TEMPORADAS EN SUS RESPECTIVOS AÑOS 

  const selectSeason = document.getElementById("season-select");
const teamsList = document.getElementById("teams-list");
const driversList = document.getElementById("drivers-list");

// Cargar años de 1970 a 2025 en el select
for (let year = 2025; year >= 1970; year--) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  selectSeason.appendChild(option);
}

// Al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  const currentYear = 2025;
  selectSeason.value = currentYear;
  loadTeams(currentYear);
});

// Al cambiar la temporada
selectSeason.addEventListener("change", () => {
  const selectedYear = parseInt(selectSeason.value);
  loadTeams(selectedYear);
});

// Nueva función usando la API correcta
function loadTeams(season) {
  teamsList.innerHTML = "Cargando equipos...";
  driversList.innerHTML = "";

  fetch("https://f1connectapi.vercel.app/api/teams")
    .then((res) => res.json())
    .then((data) => {
      const filtered = data.teams.filter(team => team.firstAppearance <= season);
      teamsList.innerHTML = "";

      filtered.forEach(team => {
        const teamDiv = document.createElement("div");
        teamDiv.className = "team";
        teamDiv.innerHTML = `
          <h4>${team.teamName}</h4>
          <p>Nacionalidad: ${team.teamNationality}</p>
          <p>Debut: ${team.firstAppearance}</p>
          <a href="${team.url}" target="_blank">Más info</a>
        `;
        teamsList.appendChild(teamDiv);
      });

      if (filtered.length === 0) {
        teamsList.innerHTML = "No hay equipos para esta temporada.";
      }
    })
    .catch(err => {
      console.error(err);
      teamsList.innerHTML = "Error al cargar los equipos.";
    });
}


  // Notificaciones
  const notificationButton = document.querySelector('.notif-btn');
  const notificationDropdown = document.querySelector('.notific-icon-dropdown');
  if (notificationButton && notificationDropdown) {
    notificationButton.addEventListener('click', () => {
      notificationDropdown.classList.toggle('show');
    });
    document.addEventListener('click', (event) => {
      if (!notificationButton.contains(event.target) && !notificationDropdown.contains(event.target)) {
        notificationDropdown.classList.remove('show');
      }
    });
  }
})();

