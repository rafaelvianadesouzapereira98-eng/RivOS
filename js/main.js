// --- Lógica do RivOS (JavaScript) ---

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initStartMenu();
});

// 1. Relógio do Sistema em tempo real
function initClock() {
    const clockElement = document.getElementById('tray-clock');
    
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}`;
    }

    updateTime();
    setInterval(updateTime, 1000); // Atualiza a cada 1 segundo
}

// 2. Comportamento do Botão Iniciar (Menu RivOS)
function initStartMenu() {
    const startBtn = document.getElementById('start-btn');
    
    document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initStartMenu();
});

function initClock() {
    const clockElement = document.getElementById('tray-clock');
    
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}`;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

// Lógica da Gaveta de Apps no Botão Iniciar
function initStartMenu() {
    const startBtn = document.getElementById('start-btn');
    const startMenu = document.getElementById('start-menu');
    
    // Alternar visibilidade ao clicar no botão Iniciar
    startBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Impede que o clique feche na mesma hora
        startMenu.classList.toggle('hidden');
    });

    // Fechar a gaveta se clicar em qualquer lugar fora dela
    document.addEventListener('click', (event) => {
        if (!startMenu.contains(event.target) && !startBtn.contains(event.target)) {
            startMenu.classList.add('hidden');
        }
    });
}
        }
    });
}
