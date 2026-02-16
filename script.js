let scoreA = 0;
let scoreB = 0;

function increment(team) {
    if (team === 'A') {
        scoreA++;
        document.getElementById('scoreA').textContent = scoreA;
    } else {
        scoreB++;
        document.getElementById('scoreB').textContent = scoreB;
    }
    updateBars(team);
    saveScores();
}

function decrement(team) {
    if (team === 'A' && scoreA > 0) {
        scoreA--;
        document.getElementById('scoreA').textContent = scoreA;
    } else if (team === 'B' && scoreB > 0) {
        scoreB--;
        document.getElementById('scoreB').textContent = scoreB;
    }
    updateBars(team);
    saveScores();
}

function updateBars(team) {
    let count = team === 'A' ? scoreA : scoreB;
    let barsContainer = document.getElementById('bars' + team);

    let barsHTML = '';
    for (let i = 0; i < count; i++) {
        barsHTML += '<div class="bar"></div>';
    }

    barsContainer.innerHTML = barsHTML;
}

function saveScores() {
    localStorage.setItem('scoreA', scoreA);
    localStorage.setItem('scoreB', scoreB);
}

function loadScores() {
    let savedA = localStorage.getItem('scoreA');
    let savedB = localStorage.getItem('scoreB');

    if (savedA !== null) {
        scoreA = parseInt(savedA);
        document.getElementById('scoreA').textContent = scoreA;
    }
    if (savedB !== null) {
        scoreB = parseInt(savedB);
        document.getElementById('scoreB').textContent = scoreB;
    }

    updateBars('A');
    updateBars('B');
}

let showImpact = true;

function drawArena() {
    let canvas = document.getElementById('arenaCanvas');
    if (!canvas) return;
    let ctx = canvas.getContext('2d');
    let px = 5;

    let colorsA = { 1: '#ff3322', 2: '#ff6644', 3: '#ffffff', 4: '#111111', 5: '#ffcc00' };
    let colorsB = { 1: '#2255ff', 2: '#55aaff', 3: '#ffffff', 4: '#111111', 5: '#00ffcc' };
    let colorsFX = { 1: '#ffcc00', 2: '#ffffff', 3: '#ff6600' };

    let fighterA = [
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

    let fighterB = [
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

    let impact = [
        [0,0,1,0,0,0,0],
        [0,0,0,0,0,2,0],
        [1,0,0,2,0,0,0],
        [0,0,2,3,1,0,1],
        [0,0,0,1,0,0,0],
        [0,1,0,0,0,1,0],
        [0,0,0,0,1,0,0],
    ];

    function drawSprite(pixels, palette, offsetX, offsetY) {
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSprite(fighterA, colorsA, 0, 22);
    drawSprite(fighterB, colorsB, 110, 22);

    if (showImpact) {
        drawSprite(impact, colorsFX, 67, 48);
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

setInterval(function() {
    showImpact = !showImpact;
    drawArena();
}, 400);

loadScores();
document.fonts.ready.then(drawArena);
