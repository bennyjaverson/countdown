let hInput = 0;
let mInput = 0;
let sInput = 0;

let totalSecs = 0;
let isRunning = false;
let hasStarted = false;
let timer = null;

const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secsEl = document.getElementById("secs");
const btnStart = document.getElementById("btnStart");
const btnReset = document.getElementById("btnReset");

function updateUI(h, m, s) {
    hoursEl.textContent = String(h).padStart(2, "0");
    minsEl.textContent = String(m).padStart(2, "0");
    secsEl.textContent = String(s).padStart(2, "0");
}

function attachScroll(el, getVal, setVal, max) {
    el.addEventListener("wheel", function (e) {
        e.preventDefault();
        if (isRunning) return;

        let val = getVal();
        if (e.deltaY > 0) {
            val++;
            if (max !== null && val > max) val = 0;
        } else {
            val--;
            if (val < 0) val = (max !== null) ? max : 0;
        }
        setVal(val);
        hasStarted = false; 
        updateUI(hInput, mInput, sInput);
    });
}

attachScroll(hoursEl, () => hInput, (v) => (hInput = v), null); 
attachScroll(minsEl, () => mInput, (v) => (mInput = v), 59);
attachScroll(secsEl, () => sInput, (v) => (sInput = v), 59);

btnStart.onclick = function () {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        this.textContent = "Lanjutkan";
        return;
    }

    if (!hasStarted) {
        totalSecs = hInput * 3600 + mInput * 60 + sInput;
        if (totalSecs <= 0) return;
        hasStarted = true;
    }

    isRunning = true;
    this.textContent = "Jeda";

    timer = setInterval(() => {
        totalSecs--;

        if (totalSecs <= 0) {
            clearInterval(timer);
            isRunning = false;
            hasStarted = false;
            hInput = 0;
            mInput = 0;
            sInput = 0;
            totalSecs = 0;
            btnStart.textContent = "Mulai";
            updateUI(0, 0, 0);
            return;
        }

        const h = Math.floor(totalSecs / 3600);
        const m = Math.floor((totalSecs % 3600) / 60);
        const s = totalSecs % 60;

        hInput = h;
        mInput = m;
        sInput = s;

        updateUI(h, m, s);
    }, 1000);
};

btnReset.onclick = function () {
    clearInterval(timer);
    isRunning = false;
    hasStarted = false;
    hInput = 0;
    mInput = 0;
    sInput = 0;
    totalSecs = 0;
    updateUI(0, 0, 0);
    btnStart.textContent = "Mulai";
};