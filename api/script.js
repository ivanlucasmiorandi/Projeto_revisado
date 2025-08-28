const API_KEY = "a317ee040a543627ceb8034155394c2d";
const URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=Porto Alegre,BR&appid=${API_KEY}&units=metric&lang=pt_br`;
const URL_CURRENT = `https://api.openweathermap.org/data/2.5/weather?q=Porto Alegre,BR&appid=${API_KEY}&units=metric&lang=pt_br`;

async function getWeather() {
  try {
    // Busca previsão atual
    const currentResponse = await fetch(URL_CURRENT);
    if (!currentResponse.ok) {
      throw new Error(`Erro HTTP (current): ${currentResponse.status}`);
    }
    const currentData = await currentResponse.json();

    // Busca previsões futuras
    const forecastResponse = await fetch(URL_FORECAST);
    if (!forecastResponse.ok) {
      throw new Error(`Erro HTTP (forecast): ${forecastResponse.status}`);
    }
    const forecastData = await forecastResponse.json();

    // Previsão dos próximos dias ao meio-dia
    const dailyForecasts = forecastData.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    // Array final: hoje (tempo real) + próximos 4 dias (meio-dia)
    const forecasts = [currentData, ...dailyForecasts.slice(0, 4)];

    const buttons = document.querySelectorAll(".tab-dias");
    if (buttons.length === 0) {
      console.warn("Nenhum botão .tab-dias encontrado nesta página.");
      return;
    }

    buttons.forEach((btn, index) => {
      const forecast = forecasts[index];
      if (forecast) {
        // Quando for o primeiro (tempo real), a estrutura é diferente
        let date, diaSemana, diaMes, descricao, temp, iconCode;

        if (index === 0) {
          date = new Date(forecast.dt * 1000);
          diaSemana = date.toLocaleDateString("pt-BR", { weekday: "long" });
          diaMes = date.getDate();
          descricao = forecast.weather[0].description;
          temp = forecast.main.temp.toFixed(1);
          iconCode = forecast.weather[0].icon;
        } else {
          date = new Date(forecast.dt_txt);
          diaSemana = date.toLocaleDateString("pt-BR", { weekday: "long" });
          diaMes = date.getDate();
          descricao = forecast.weather[0].description;
          temp = forecast.main.temp.toFixed(1);
          iconCode = forecast.weather[0].icon;
        }

        btn.innerHTML = `
          <strong>${diaSemana}, ${diaMes}</strong>
          <div class="temp">${temp}°C - ${descricao}</div>
          <img src="https://openweathermap.org/img/wn/${iconCode}.png" 
              alt="${descricao}" 
              title="${descricao}">
        `;
      }
    });
  } catch (error) {
    console.error("Erro ao buscar previsão:", error);
  }
}