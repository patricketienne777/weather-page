const key = "5b1ec8486d48b1faeb561254d4081182";
let cityname;
const searchInput = document.getElementsByClassName("searchInput")[0];
const searchButton = document.getElementsByClassName("searchButton")[0];
const historylist = document.getElementsByClassName("history")[0];
// localStorage.setItem("datas", []);
const datas = JSON.parse(localStorage.getItem("datas") || "[]");

// Search İnput Listener

searchInput.addEventListener("input", (e) => {
  cityname = e.target.value;
});

// Search Button Click run the getdata function

searchButton.addEventListener("click", () => {
  getdata();
});

const header = document.getElementsByClassName("name")[0];
const temp = document.getElementsByClassName("temp")[0];
const humidity = document.getElementsByClassName("humidity")[0];
const wind = document.getElementsByClassName("wind")[0];
const cardcontainer = document.getElementsByClassName("cardcontainer")[0];
const elems = [1, 2, 3, 4];

// When Click Search Button Get the data in the api and push it to the list.

const getdata = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${key}`
  );
  const data = await response.json();
  const filter = datas.filter((e) => {
    return e.city.name === data.city.name;
  });

  if (data.cod === "400" || filter.length) {
    console.log("Bad Request");
  } else if (data.cod === "200") {
    await datas.push(data);
    localStorage.setItem("datas", JSON.stringify(datas));

    const li = document.createElement("li");
    li.innerHTML = `<h2 onclick="clicklist(this)">${data.city.name}</h2>`;
    historylist.appendChild(li);
  }

  const filtereddata = datas.filter((e) => {
    return e.city.name === cityname;
  });
  const date = filtereddata[0].list[0].dt_txt.split(" ")[0];
  const icon = filtereddata[0].list[0].weather[0].main;

  if (icon === "Clouds") {
    header.innerHTML = `${filtereddata[0].city.name} (${date}) <i class="fa-solid fa-cloud"></i>`;
    temp.innerHTML = `Temp: ${filtereddata[0].list[0].main.temp} °F`;
    humidity.innerHTML = `Wind: ${filtereddata[0].list[0].main.humidity} MPH`;
    wind.innerHTML = `Humidity: ${filtereddata[0].list[0].wind.speed} %`;
  } else if (icon === "Rain") {
    header.innerHTML = `${filtereddata[0].city.name} (${date}) <i class="fa-solid fa-cloud-rain"></i>`;
    temp.innerHTML = `Temp: ${filtereddata[0].list[0].main.temp} °F`;
    humidity.innerHTML = `Wind: ${filtereddata[0].list[0].main.humidity} MPH`;
    wind.innerHTML = `Humidity: ${filtereddata[0].list[0].wind.speed} %`;
  } else if (icon === "Clear") {
    header.innerHTML = `${filtereddata[0].city.name} (${date}) <i class="fa-solid fa-sun"></i>`;
    temp.innerHTML = `Temp: ${filtereddata[0].list[0].main.temp} °F`;
    humidity.innerHTML = `Wind: ${filtereddata[0].list[0].main.humidity} MPH`;
    wind.innerHTML = `Humidity: ${filtereddata[0].list[0].wind.speed} %`;
  }

  cardcontainer.querySelectorAll("*").forEach((n) => n.remove());

  for (let i = 0; i < i < 40; i = i + 8) {
    const iconx = filtereddata[0].list[i].weather[0].main;
    const cardcontainer = document.getElementsByClassName("cardcontainer")[0];
    const card = document.createElement("div");
    card.classList.add("card");
    if (iconx === "Clouds") {
      card.innerHTML = `<h3>${filtereddata[0].list[i].dt_txt.split(" ")[0]}</h3>
    <i class="fa-solid fa-cloud"></i>
    <p>Temp: ${filtereddata[0].list[i].main.temp} °F</p>
    <p>Wind: ${filtereddata[0].list[i].main.humidity} MPH</p>
    <p>Humidity: ${filtereddata[0].list[i].wind.speed} %</p>`;
    } else if (iconx === "Rain") {
      card.innerHTML = `<h3>${filtereddata[0].list[i].dt_txt.split(" ")[0]}</h3>
    <i class="fa-solid fa-cloud-rain"></i>
    <p>Temp: ${filtereddata[0].list[i].main.temp} °F</p>
    <p>Wind: ${filtereddata[0].list[i].main.humidity} MPH</p>
    <p>Humidity: ${filtereddata[0].list[i].wind.speed} %</p>`;
    } else if (iconx === "Clear") {
      card.innerHTML = `<h3>${filtereddata[0].list[i].dt_txt.split(" ")[0]}</h3>
    <i class="fa-solid fa-sun"></i>
    <p>Temp: ${filtereddata[0].list[i].main.temp} °F</p>
    <p>Wind: ${filtereddata[0].list[i].main.humidity} MPH</p>
    <p>Humidity: ${filtereddata[0].list[i].wind.speed} %</p>`;
    }

    cardcontainer.appendChild(card);
  }
};

// When click the list item (City in the list) get the data city data in the localstorage.

const clicklist = async (hello) => {
  const name = hello.innerHTML;

  const filter = datas.filter((e) => {
    return e.city.name === name;
  });

  const date = filter[0].list[0].dt_txt.split(" ")[0];
  const icon = filter[0].list[0].weather[0].main;

  if (icon === "Clouds") {
    header.innerHTML = `${filter[0].city.name} (${date}) <i class="fa-solid fa-cloud"></i>`;
    temp.innerHTML = `Temp: ${filter[0].list[0].main.temp} °F`;
    humidity.innerHTML = `Wind: ${filter[0].list[0].main.humidity} MPH`;
    wind.innerHTML = `Humidity: ${filter[0].list[0].wind.speed} %`;
  } else if (icon === "Rain") {
    header.innerHTML = `${filter[0].city.name} (${date}) <i class="fa-solid fa-cloud-rain"></i>`;
    temp.innerHTML = `Temp: ${filter[0].list[0].main.temp} °F`;
    humidity.innerHTML = `Wind: ${filter[0].list[0].main.humidity} MPH`;
    wind.innerHTML = `Humidity: ${filter[0].list[0].wind.speed} %`;
  } else if (icon === "Clear") {
    header.innerHTML = `${filter[0].city.name} (${date}) <i class="fa-solid fa-sun"></i>`;
    temp.innerHTML = `Temp: ${filter[0].list[0].main.temp} °F`;
    humidity.innerHTML = `Wind: ${filter[0].list[0].main.humidity} MPH`;
    wind.innerHTML = `Humidity: ${filter[0].list[0].wind.speed} %`;
  }

  cardcontainer.querySelectorAll("*").forEach((n) => n.remove());

  for (let i = 0; i < i < 40; i = i + 8) {
    const iconx = filter[0].list[i].weather[0].main;
    const cardcontainer = document.getElementsByClassName("cardcontainer")[0];
    const card = document.createElement("div");
    card.classList.add("card");
    if (iconx === "Clouds") {
      card.innerHTML = `<h3>${filter[0].list[i].dt_txt.split(" ")[0]}</h3>
    <i class="fa-solid fa-cloud"></i>
    <p>Temp: ${filter[0].list[i].main.temp} °F</p>
    <p>Wind: ${filter[0].list[i].main.humidity} MPH</p>
    <p>Humidity: ${filter[0].list[i].wind.speed} %</p>`;
    } else if (iconx === "Rain") {
      card.innerHTML = `<h3>${filter[0].list[i].dt_txt.split(" ")[0]}</h3>
    <i class="fa-solid fa-cloud-rain"></i>
    <p>Temp: ${filter[0].list[i].main.temp} °F</p>
    <p>Wind: ${filter[0].list[i].main.humidity} MPH</p>
    <p>Humidity: ${filter[0].list[i].wind.speed} %</p>`;
    } else if (iconx === "Clear") {
      card.innerHTML = `<h3>${filter[0].list[i].dt_txt.split(" ")[0]}</h3>
    <i class="fa-solid fa-sun"></i>
    <p>Temp: ${filter[0].list[i].main.temp} °F</p>
    <p>Wind: ${filter[0].list[i].main.humidity} MPH</p>
    <p>Humidity: ${filter[0].list[i].wind.speed} %</p>`;
    }

    cardcontainer.appendChild(card);
  }
};

// When u fetch the first time (Refresh the website) get the data in the localstorage.

const firstfetch = async () => {
  if (datas.length) {
    for (let i = 0; i < datas.length; i++) {
      const li = document.createElement("li");
      li.innerHTML = `<h2 onclick="clicklist(this)">${datas[i].city.name}</h2>`;
      historylist.appendChild(li);
    }

    const filter = datas[0];

    const date = filter.list[0].dt_txt.split(" ")[0];
    const icon = filter.list[0].weather[0].main;

    if (icon === "Clouds") {
      header.innerHTML = `${filter.city.name} (${date}) <i class="fa-solid fa-cloud"></i>`;
      temp.innerHTML = `Temp: ${filter.list[0].main.temp} °F`;
      humidity.innerHTML = `Wind: ${filter.list[0].main.humidity} MPH`;
      wind.innerHTML = `Humidity: ${filter.list[0].wind.speed} %`;
    } else if (icon === "Rain") {
      header.innerHTML = `${filter.city.name} (${date}) <i class="fa-solid fa-cloud-rain"></i>`;
      temp.innerHTML = `Temp: ${filter.list[0].main.temp} °F`;
      humidity.innerHTML = `Wind: ${filter.list[0].main.humidity} MPH`;
      wind.innerHTML = `Humidity: ${filter.list[0].wind.speed} %`;
    } else if (icon === "Clear") {
      header.innerHTML = `${filter.city.name} (${date}) <i class="fa-solid fa-sun"></i>`;
      temp.innerHTML = `Temp: ${filter.list[0].main.temp} °F`;
      humidity.innerHTML = `Wind: ${filter.list[0].main.humidity} MPH`;
      wind.innerHTML = `Humidity: ${filter.list[0].wind.speed} %`;
    }

    for (let i = 0; i < 40; i = i + 8) {
      const iconx = filter.list[i].weather[0].main;
      const cardcontainer = document.getElementsByClassName("cardcontainer")[0];
      const card = document.createElement("div");
      card.classList.add("card");
      if (iconx === "Clouds") {
        card.innerHTML = `<h3>${filter.list[i].dt_txt.split(" ")[0]}</h3>
      <i class="fa-solid fa-cloud"></i>
      <p>Temp: ${filter.list[i].main.temp} °F</p>
      <p>Wind: ${filter.list[i].main.humidity} MPH</p>
      <p>Humidity: ${filter.list[i].wind.speed} %</p>`;
      } else if (iconx === "Rain") {
        card.innerHTML = `<h3>${filter.list[i].dt_txt.split(" ")[0]}</h3>
      <i class="fa-solid fa-cloud-rain"></i>
      <p>Temp: ${filter.list[i].main.temp} °F</p>
      <p>Wind: ${filter.list[i].main.humidity} MPH</p>
      <p>Humidity: ${filter.list[i].wind.speed} %</p>`;
      } else if (iconx === "Clear") {
        card.innerHTML = `<h3>${filter.list[i].dt_txt.split(" ")[0]}</h3>
      <i class="fa-solid fa-sun"></i>
      <p>Temp: ${filter.list[i].main.temp} °F</p>
      <p>Wind: ${filter.list[i].main.humidity} MPH</p>
      <p>Humidity: ${filter.list[i].wind.speed} %</p>`;
      }

      cardcontainer.appendChild(card);
    }
  } else {
    header.innerHTML = `Please Search City`;
  }
};

// Run the first time fetch function

firstfetch();
