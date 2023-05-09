let stats = document.getElementById("stats")
let term = document.getElementById("term")
let acme = document.getElementById("acme")
let clock = document.getElementById("clock")

let prevFocus;
let curZ = 1;

const focus = function() {
    prevFocus.style.setProperty("border-color", "#9eefee", "important");
    if (prevFocus == term) {
        prevFocus.style.setProperty("color", "#666666", "important");
    }

    this.style.zIndex = curZ++;
    this.style.setProperty("border-color", "#55abaa", "important");
    if (this == term) {
        this.style.setProperty("color", "black", "important");
    }
    prevFocus = this;
}


window.onload = function() {
    stats = document.getElementById("stats")
    term = document.getElementById("term")
    acme = document.getElementById("acme")
    clock = document.getElementById("clock")

    prevFocus = acme;
    setTimeout(() => {
        stats.addEventListener("click", focus);
        term.addEventListener("click", focus);
        acme.addEventListener("click", focus);
    }, 5250)

    getUptime(new Date("January 20, 2020"))
    getRam();
    updateDate();
};

function getUptime(target) {
    const now = new Date();
    const diff = now.getTime() - target.getTime();

    const year = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const month = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * (365.25 / 12)));
    const day = Math.floor((diff % (1000 * 60 * 60 * 24 * (365.25 / 12))) / (1000 * 60 * 60 * 24));

    let uptime = `${year} year${year !== 1 ? "s" : ""}`;
    if (month !== 0) {
        uptime += ` ${month} month${month !== 1 ? "s" : ""}`;
    }
    if (day !== 0) {
        uptime += ` ${day} day${day !== 1 ? "s" : ""}`;
    }

    document.getElementById("uptime").innerText = uptime;
}

function getRam() {
   document.getElementById("ram").innerText = Math.floor(Math.random() * (107 - 40 + 1) + 40);
}

function updateDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const dayOfWeek = getDayOfWeek(date.getDay());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    const now = `${year}/${month}/${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}`;
    document.getElementById("clock").innerText = now;

    setTimeout(updateDate, 1000);
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}

function getDayOfWeek(day) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysOfWeek[day];
}

