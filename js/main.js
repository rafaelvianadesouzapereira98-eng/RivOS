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
    
    startBtn.addEventListener('click', () => {
        // Por enquanto, um alerta de teste para provar que o JS está controlando o elemento do HTML
        alert('Menu Iniciar do RivOS acionado via JavaScript!');
    });
}
