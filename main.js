'use strict';

let screenEl;
let stats, term, acme, clock;
let dragBorder;

let prevFocus;
let curZ = 1;

let dragEl;
let initialX, initialY; 

window.onload = function() {
    stats = document.getElementById("stats");
    term = document.getElementById("term");
    acme = document.getElementById("acme");
    clock = document.getElementById("clock");

    screenEl = document.getElementById("screen");
    dragBorder = document.getElementById("dragborder");

    prevFocus = acme;
    setTimeout(() => {
        stats.addEventListener("click", changeFocus);
        term.addEventListener("click", changeFocus);
        acme.addEventListener("click", changeFocus);

        stats.addEventListener('mousedown', dragStart);
        term.addEventListener('mousedown', dragStart);
        acme.addEventListener('mousedown', dragStart);

        screenEl.addEventListener('mousemove', drag);
        screenEl.addEventListener('mouseup', dragEnd);
        screenEl.addEventListener('mouseleave', dragEnd);
    }, 5250)

    getUptime(new Date("January 20, 2020"));
    getRam();
    updateDate();
};

// Define the mouse event handlers
function dragStart(event) {
    event.preventDefault();
    
    changeFocus.call(this);
    initialX = event.clientX;
    initialY = event.clientY;

    dragEl = this;

    dragBorder.style.visibility = "visible";
    dragBorder.style.left = `${dragEl.offsetLeft}px`;
    dragBorder.style.top = `${dragEl.offsetTop}px`;
    dragBorder.style.width = `${dragEl.offsetWidth}px`;
    dragBorder.style.height = `${dragEl.offsetHeight}px`;
    dragBorder.style.zIndex = curZ;
}

function drag(event) {
    event.preventDefault();
    if (!dragEl) return;
    

    const deltaX = event.clientX - initialX;
    const deltaY = event.clientY - initialY;

    let finalLeft = dragBorder.offsetLeft + deltaX;
    const leftBound = 15 - dragBorder.offsetWidth;
    if (finalLeft < leftBound) {
        finalLeft = leftBound;
    }
    if (finalLeft > 990) {
        finalLeft = 990;
    }

    let finalTop = dragBorder.offsetTop + deltaY;
    if (finalTop < 0) {
        finalTop = 0;
    }
    if (finalTop > 730) {
        finalTop = 730;
    }

    dragBorder.style.left = `${finalLeft}px`;
    dragBorder.style.top = `${finalTop}px`;

    initialX = event.clientX;
    initialY = event.clientY;
}

function dragEnd() {
    if (!dragEl) return;
    
    dragEl.style.left = `${dragBorder.offsetLeft}px`;
    dragEl.style.top = `${dragBorder.offsetTop}px`;
    dragEl = null;

    dragBorder.style.visibility = "hidden";
}

const changeFocus = function() {
    if (prevFocus == this) return;

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
    clock.innerText = now;

    setTimeout(updateDate, 1000);
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}

function getDayOfWeek(day) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysOfWeek[day];
}

