const res = document.querySelector("#resultArea");
const themeToggle = document.querySelector("#themeToggle");
const historyBtn = document.querySelector("#historyBtn");
const historyPanel = document.querySelector("#historyPanel");
const historyList = document.querySelector("#historyList");
const clearHistoryBtn = document.querySelector("#clearHistory");

const MAX_HISTORY = 50;
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
let lastWasResult = false;

function renderHistory() {
    historyList.innerHTML = "";
    history.slice(-MAX_HISTORY).reverse().forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}

function addToHistory(expr, result) {
    const entry = `${expr} = ${result}`;
    history.push(entry);
    if (history.length > MAX_HISTORY) history = history.slice(-MAX_HISTORY);
    localStorage.setItem("calcHistory", JSON.stringify(history));
    renderHistory();
}

renderHistory();

document.querySelectorAll(".btn").forEach(btn => {
    if (btn.id === "openParen") {
        btn.addEventListener("click", () => {
            if (lastWasResult) res.textContent = "";
            res.textContent += "(";
            lastWasResult = false;
        });
    } else if (btn.id === "closeParen") {
        btn.addEventListener("click", () => {
            res.textContent += ")";
            lastWasResult = false;
        });
    } else if (btn.id === "clrTxt") {
        btn.addEventListener("click", () => {
            res.textContent = "";
            lastWasResult = false;
        });
    } else if (btn.id === "backspace") {
        btn.addEventListener("click", () => {
            res.textContent = res.textContent.slice(0, -1);
            lastWasResult = false;
        });
    } else if (btn.id === "sqrt") {
        btn.addEventListener("click", () => {
            if (lastWasResult) res.textContent = "";
            res.textContent += "sqrt(";
            lastWasResult = false;
        });
    } else if (btn.id === "square") {
        btn.addEventListener("click", () => {
            if (lastWasResult) res.textContent = "";
            res.textContent += "**2";
            lastWasResult = false;
        });
    } else if (btn.id === "percent") {
        btn.addEventListener("click", () => {
            const match = res.textContent.match(/[\d.]+$/);
            if (match) {
                const num = parseFloat(match[0]) / 100;
                res.textContent = res.textContent.slice(0, -match[0].length) + num;
            }
            lastWasResult = false;
        });
    } else if (btn.id === "decp") {
        btn.addEventListener("click", () => {
            const parts = res.textContent.split(/[\+\-\*\/]/);
            const lastPart = parts[parts.length - 1];
            if (!lastPart.includes(".") || !lastPart) {
                res.textContent += ".";
            }
            lastWasResult = false;
        });
    } else if (btn.id.startsWith("num")) {
        btn.addEventListener("click", () => {
            if (lastWasResult) {
                res.textContent = "";
                lastWasResult = false;
            }
            res.textContent += btn.textContent;
        });
    } else if (["op0", "op1", "op2", "op3"].includes(btn.id)) {
        btn.addEventListener("click", () => {
            if (lastWasResult) {
                lastWasResult = false;
            }
            const sym = { op0: '+', op1: '-', op2: '*', op3: '/' }[btn.id];
            const lastChar = res.textContent.slice(-1);
            if ("+-*/".includes(lastChar)) {
                res.textContent = res.textContent.slice(0, -1) + sym;
            } else {
                res.textContent += sym;
            }
        });
    } else if (btn.id === "eqBtn") {
        btn.addEventListener("click", () => {
            const expr = res.textContent.trim();
            if (!expr || lastWasResult) return;

            let result;
            try {
                result = math.evaluate(expr.replace(/÷/g, '/').replace(/×/g, '*'));
                if (typeof result === 'number' && !isFinite(result)) throw new Error();
                result = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
            } catch (e) {
                res.classList.add("error");
                setTimeout(() => res.classList.remove("error"), 500);
                res.textContent = "Error";
                return;
            }

            addToHistory(expr, result);
            res.textContent = result;
            lastWasResult = true;
        });
    }
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    themeToggle.textContent = document.body.classList.contains("light-theme") ? "☀️" : "🌙";
    localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "☀️";
}

historyBtn.addEventListener("click", () => {
    historyPanel.style.display = historyPanel.style.display === "block" ? "none" : "block";
});

clearHistoryBtn.addEventListener("click", () => {
    history = [];
    localStorage.removeItem("calcHistory");
    renderHistory();
});

document.addEventListener("click", (e) => {
    if (!historyBtn.contains(e.target) && !historyPanel.contains(e.target)) {
        historyPanel.style.display = "none";
    }
});

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (/[0-9]/.test(key)) {
        const btn = document.querySelector(`#num${key}`);
        if (btn) btn.click();
    } else if (key === '.') {
        const btn = document.querySelector("#decp");
        if (btn) btn.click();
    } else if (['+', '-', '*'].includes(key)) {
        e.preventDefault();
        const map = { '+': 'op3', '-': 'op1', '*': 'op2' };
        const btn = document.querySelector(`#${map[key]}`);
        if (btn) btn.click();
    } else if (key === '/') {
        e.preventDefault();
        const btn = document.querySelector("#op2");
        if (btn) btn.click();
    } else if (key === '%') {
        const btn = document.querySelector("#percent");
        if (btn) btn.click();
    } else if (key === 'Enter') {
        e.preventDefault();
        const btn = document.querySelector("#eqBtn");
        if (btn) btn.click();
    } else if (key === 'Escape') {
        const btn = document.querySelector("#clrTxt");
        if (btn) btn.click();
    } else if (key === 'Backspace') {
        const btn = document.querySelector("#backspace");
        if (btn) btn.click();
    }
});
