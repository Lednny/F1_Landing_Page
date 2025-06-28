
//FUNCIÓN PARA NOSTRAR EL ESTADO DEL TIEMPO ACTUAL CON API KEY

(function(){
  const weatherWidget = document.querySelector('.weather-widget-1');
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
  const clock = document.querySelector('.clock-widget-1');
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

