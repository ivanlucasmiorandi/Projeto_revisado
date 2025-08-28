const API_KEY = "a317ee040a543627ceb8034155394c2d";
const URL = `https://api.openweathermap.org/data/2.5/forecast?q=Porto Alegre,BR&appid=${API_KEY}&units=metric&lang=pt_br`;
 
async function getWeather() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
 
    // Filtrar só 1 previsão por dia (meio-dia, por exemplo)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));
 
    const buttons = document.querySelectorAll(".tab-dias");
    buttons.forEach((btn, index) => {
      if (dailyForecasts[index]) {
        const forecast = dailyForecasts[index];
        btn.innerHTML = `
          ${new Date(forecast.dt_txt).toLocaleDateString("pt-BR", { weekday: "long" })}
          - ${forecast.main.temp.toFixed(1)}°C
          <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
        `;
      }
    });
 
  } catch (error) {
    console.error("Erro ao buscar previsão:", error);
  }
}
 
getWeather();