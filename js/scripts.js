// fókuszon még kéne finomítani
// mi legyen ha lekéstünk egy ajándékról?

const gift = ["zselés", "kókuszos", "vajkaramellás", "kakaós", "málnás"];
const months = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
let main = document.querySelector(".container");
let section = document.querySelector(".row");
let month = 11;
// teszt new Date("2023-12-01");
let today = new Date();

// adventi kalendárium napjait állítja be
function adventDay(months, month, day) {
    let days = new Date(`2023 ${months[month]} ${day + 1}`);
    return days;
}

// kiszámolja hogy hány nap van még hátra
function remainingDays(day, today) {
    let difference = day - today;
    let days = difference / 1000 / 60 / 60 / 24;
    return days;
}

// ellenőrzi ha rákattintunk hogy már kinyitható-e az ajándék
function test(elem, gift) {
    let card = document.querySelector(elem);
    // nyeremény kiválasztása random
    let giftIndex = Math.round(Math.random() * (gift.length - 1) );
    if(card.dataset.card === "Már kinyithatod az ajándékodat!") {
        alert(`Egy ${gift[giftIndex]} szaloncukrot nyertél!`);
        // kibontás után megváltoztatja a kártya szövegét és data értékét
        card.innerHTML = "Ezt az ajándékot kibontottad már!";
        card.dataset.card = "Felhasználva!";
    }
    else if(card.dataset.card === "Felhasználva!") {
        alert("Már kinyitottad ezt az ajándékot!");
    }
    else if (card.dataset.card === "Elmúlasztottad a kinyitás napját!") {
        alert("Lemaradtál erről az ajándékról!");
    }
    else {
        alert("Még nem nyithatod ki!");
    }
}

// attól függően mit írjon ki ha elértük a napot ami a dobozon szerepel vagy még nem
function templateDays(remainingDays, day, today) {
    if(Math.floor(remainingDays(day, today)) > 0) {
        return `Még ${Math.floor(remainingDays(day, today))} nap van hátra!`;
    }
    else if (Math.floor(remainingDays(day, today)) < 0) {
        return "Elmúlasztottad a kinyitás napját!";
    }
    else {
        return "Már kinyithatod az ajándékodat!";
    }
}

// legenerálja a dobozokat és az azokat tartalmazó feliratokat
for(let i = 1; i < 25; i++) {
    let day = adventDay(months, month, i);
    let m = day.getUTCMonth();
    let d = day.getUTCDate();
    section.innerHTML += `
        <article class="col">
            <div class="card">
                <div class="card-inner">
                    <div class="card-front">${months[m]} ${d}</div>
                    <div class="card-back" id="card-key-${i}" data-card="${templateDays(remainingDays, day, today)}" onclick="test('#card-key-${i}', gift)">${templateDays(remainingDays, day, today)}</div>
                </div>
            </div>
        </article>
    `;
}
