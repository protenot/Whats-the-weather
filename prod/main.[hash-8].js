(() => {
  "use strict";
  async function e(e) {
    const t = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${e}&appid=c768bc4e962d2a69c28ba404045dc96c`
    );
    return await t.json();
  }
  !(async function (t) {
    const n = document.createElement("p");
    n.classList.add("local");
    const o = await (async function () {
      const e = await fetch("https://get.geojs.io/v1/ip/geo.json");
      console.log(e);
      const t = await e.json(JSON.stringify());
      return console.log(t), t.city;
    })();
    (n.innerText = `Город :  ${o}`), t.append(n);
    const c = document.createElement("p");
    c.classList.add("local");
    const a = await e(o);
    (c.innerText = `Температура :  ${Math.round(a.main.temp)} °C`), t.append(c);
    const s = document.createElement("img");
    s.classList.add("local");
    const l = a.weather[0].icon;
    (s.src = `http://openweathermap.org/img/wn/${l}@2x.png`), t.append(s);
  })(document.querySelector("#header-container")),
    (async function (t) {
      const n = document.createElement("form");
      t.prepend(n);
      const o = document.createElement("h2");
      (o.textContent = "Хочешь узнать погоду?"), t.prepend(o);
      const c = document.createElement("input");
      (c.placeholder = "Введи название города"), n.append(c);
      const a = document.createElement("button");
      (a.innerText = "Жми сюда"), n.append(a);
      const s = document.createElement("div");
      s.classList.add("city-name"), (s.textContent = "Город : "), t.append(s);
      const l = document.createElement("p");
      l.classList.add("city-place"), s.append(l);
      const r = document.createElement("p");
      r.classList.add("city-temp"),
        (r.textContent = "Температура : "),
        t.append(r);
      const p = document.createElement("img");
      (p.alt = "здесь будет картинка"), t.append(p);
      const d = document.createElement("h2");
      (d.textContent = "Вы недавно смотрели погоду в городах"), t.append(d);
      const m = document.createElement("div");
      (m.id = "weather-box"), t.append(m);
      const i = document.createElement("h2");
      (i.textContent = "Это то, что Вы ищете?"), t.append(i);
      const u = document.createElement("div");
      (u.id = "map-container"),
        t.append(u),
        n.addEventListener("submit", async (t) => {
          t.preventDefault();
          let n = c.value,
            o = await e(n),
            a = o.weather[0].icon;
          p.src = `http://openweathermap.org/img/wn/${a}@2x.png`;
          const l = document.createElement("p");
          (l.textContent = o.name),
            (s.textContent = `Город :  ${l.textContent}`),
            (r.textContent = `Температура :  ${Math.round(o.main.temp)} °C`);
          const d = document.createElement("button");
          d.classList.add("list");
          let { lon: i } = o.coord,
            { lat: x } = o.coord;
          const g = document.createElement("img");
          g.classList.add("map"),
            (g.src = `https://static-maps.yandex.ru/1.x/?ll=${i},${x}&size=450,450&z=12&l=map`);
          let h = document.querySelectorAll(".map");
          if (
            (console.log(h),
            1 === h.length ? (h[0].remove(), u.append(g)) : u.append(g),
            l.textContent)
          ) {
            d.textContent = l.textContent;
            const t = m.querySelectorAll(".list"),
              c = Array.from(t, (e) => e.innerText);
            c.includes(d.innerHTML) ? console.log(c) : m.prepend(d),
              console.log(m.innerText),
              t.length > 9 && t[9].remove(),
              console.log(c),
              d.addEventListener("click", async () => {
                console.log(d.textContent),
                  (n = d.textContent),
                  (o = await e(n)),
                  (s.textContent = `Город :  ${l.textContent}`),
                  console.log(o.main.temp),
                  (r.textContent = `Температура :  ${Math.round(
                    o.main.temp
                  )} °C`),
                  (a = o.weather[0].icon),
                  (p.src = `http://openweathermap.org/img/wn/${a}@2x.png`),
                  (i = o.coord.lon),
                  (x = o.coord.lat),
                  (g.src = `https://static-maps.yandex.ru/1.x/?ll=${i},${x}&size=450,450&z=12&l=map`),
                  (h = document.querySelectorAll(".map")),
                  console.log(h),
                  1 === h.length ? (h[0].remove(), u.append(g)) : u.append(g);
              });
          }
          c.value = "";
        });
    })(document.querySelector("#container"));
})();
