// ==========================================
// DOM Element References
// ==========================================

let scoreElA = document.getElementById('scoreA');
let scoreElB = document.getElementById('scoreB');
let nameElA = document.getElementById('nameA');
let nameElB = document.getElementById('nameB');
let barsElA = document.getElementById('barsA');
let barsElB = document.getElementById('barsB');

// ==========================================
// Score State
// ==========================================

let scoreA = 0;
let scoreB = 0;

// ==========================================
// Score Functions
// ==========================================

function increment(team) {
    if (team === 'A') {
        scoreA++;
        scoreElA.textContent = scoreA;
    } else {
        scoreB++;
        scoreElB.textContent = scoreB;
    }
    updateBars(team);
    saveScores();
}

function decrement(team) {
    if (team === 'A' && scoreA > 0) {
        scoreA--;
        scoreElA.textContent = scoreA;
    } else if (team === 'B' && scoreB > 0) {
        scoreB--;
        scoreElB.textContent = scoreB;
    }
    updateBars(team);
    saveScores();
}

function resetScores() {
    scoreA = 0;
    scoreB = 0;
    scoreElA.textContent = scoreA;
    scoreElB.textContent = scoreB;
    updateBars('A');
    updateBars('B');
    saveScores();
}

// ==========================================
// UI Updates (bars & winning state)
// ==========================================

function updateBars(team) {
    let count = team === 'A' ? scoreA : scoreB;
    let barsContainer = team === 'A' ? barsElA : barsElB;

    let barsHTML = '';
    for (let i = 0; i < count; i++) {
        barsHTML += '<div class="bar"></div>';
    }

    barsContainer.innerHTML = barsHTML;
    updateWinning();
}

function updateWinning() {
    barsElA.classList.remove('winning');
    barsElB.classList.remove('winning');
    scoreElA.classList.remove('winning');
    scoreElB.classList.remove('winning');

    if (scoreA > scoreB) {
        barsElA.classList.add('winning');
        scoreElA.classList.add('winning');
    } else if (scoreB > scoreA) {
        barsElB.classList.add('winning');
        scoreElB.classList.add('winning');
    }
}

// ==========================================
// Team Names
// ==========================================

function renameTeam(team) {
    let nameEl = team === 'A' ? nameElA : nameElB;
    let currentName = nameEl.textContent;
    let newName = prompt('Enter new name for ' + currentName + ':', currentName);
    if (newName !== null && newName.trim() !== '') {
        nameEl.textContent = newName.trim();
        localStorage.setItem('name' + team, newName.trim());
    }
}

function loadNames() {
    let savedA = localStorage.getItem('nameA');
    let savedB = localStorage.getItem('nameB');

    if (savedA) nameElA.textContent = savedA;
    if (savedB) nameElB.textContent = savedB;
}

// ==========================================
// Persistence (localStorage)
// ==========================================

function saveScores() {
    localStorage.setItem('scoreA', scoreA);
    localStorage.setItem('scoreB', scoreB);
}

function loadScores() {
    let savedA = localStorage.getItem('scoreA');
    let savedB = localStorage.getItem('scoreB');

    if (savedA !== null) {
        scoreA = parseInt(savedA, 10);
        scoreElA.textContent = scoreA;
    }
    if (savedB !== null) {
        scoreB = parseInt(savedB, 10);
        scoreElB.textContent = scoreB;
    }

    updateBars('A');
    updateBars('B');
}

// ==========================================
// Arena - Pixel Art Fighters
// ==========================================

let showImpact = true;

// Color palettes (defined once, reused every frame)
const colorsA = { 1: '#ff3322', 2: '#ff6644', 3: '#ffffff', 4: '#111111', 5: '#ffcc00' };
const colorsB = { 1: '#2255ff', 2: '#55aaff', 3: '#ffffff', 4: '#111111', 5: '#00ffcc' };
const colorsFX = { 1: '#ffcc00', 2: '#ffffff', 3: '#ff6600' };

// Sprite data (defined once, reused every frame)
const fighterA = [
    [0,0,5,0,0,0,0,5,0,0,0,0],
    [0,0,1,1,1,1,1,1,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,0,0,0],
    [0,1,3,4,1,1,3,4,1,0,0,0],
    [0,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,1,5,5,5,5,1,0,0,0,0],
    [0,0,0,1,1,1,1,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,5,0],
    [0,1,1,2,2,1,1,1,1,1,5,5],
    [0,0,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,0,0,0,0,0],
    [0,0,1,1,0,0,1,1,0,0,0,0],
    [0,2,2,0,0,0,0,2,2,0,0,0],
];

const fighterB = [
    [0,0,0,0,5,0,0,0,5,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,4,3,1,1,4,3,1,0],
    [0,0,0,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,1,5,5,5,5,1,0,0],
    [0,0,0,0,0,1,1,1,1,0,0,0],
    [0,5,1,1,1,1,1,1,1,1,0,0],
    [5,5,1,1,1,1,1,2,2,1,1,0],
    [0,0,0,0,1,1,1,1,1,1,0,0],
    [0,0,0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,1,1,0,0,1,1,0,0],
    [0,0,0,2,2,0,0,0,0,2,2,0],
];

const impact = [
    [0,0,1,0,0,0,0],
    [0,0,0,0,0,2,0],
    [1,0,0,2,0,0,0],
    [0,0,2,3,1,0,1],
    [0,0,0,1,0,0,0],
    [0,1,0,0,0,1,0],
    [0,0,0,0,1,0,0],
];

function drawSprite(ctx, pixels, palette, offsetX, offsetY, px) {
    for (let y = 0; y < pixels.length; y++) {
        for (let x = 0; x < pixels[y].length; x++) {
            let val = pixels[y][x];
            if (val !== 0 && palette[val]) {
                ctx.fillStyle = palette[val];
                ctx.fillRect(offsetX + x * px, offsetY + y * px, px, px);
            }
        }
    }
}

function drawArena() {
    let canvas = document.getElementById('arenaCanvas');
    if (!canvas) return;
    let ctx = canvas.getContext('2d');
    let px = 5;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSprite(ctx, fighterA, colorsA, 0, 22, px);
    drawSprite(ctx, fighterB, colorsB, 110, 22, px);

    if (showImpact) {
        drawSprite(ctx, impact, colorsFX, 67, 48, px);
    }

    ctx.fillStyle = '#ffdd00';
    ctx.font = '12px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 8;
    ctx.fillText('VS', 85, 14);
    ctx.shadowBlur = 0;
}

// Blink impact sparks every 400ms
setInterval(function() {
    showImpact = !showImpact;
    drawArena();
}, 400);

// ==========================================
// Initialization
// ==========================================

loadScores();
loadNames();
document.fonts.ready.then(drawArena);
