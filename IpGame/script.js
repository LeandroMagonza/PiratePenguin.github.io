let exercise = null;

document.getElementById('generateBtn').addEventListener('click', generateExercise);
document.getElementById('checkBtn').addEventListener('click', checkExercise);
document.getElementById('showAnswerToggle').addEventListener('change', toggleDebugInfo);

function toggleDebugInfo() {
    const debugInfos = document.querySelectorAll('.debug-info');
    const isChecked = document.getElementById('showAnswerToggle').checked;
    debugInfos.forEach(info => {
        info.style.display = isChecked ? 'inline' : 'none';
    });
}

function hideDebugInfo() {
    const debugInfos = document.querySelectorAll('.debug-info');
    debugInfos.forEach(info => {
        info.style.display = 'none';
    });
    document.getElementById('showAnswerToggle').checked = false;
}

function generateExercise() {
    const difficulty = parseInt(document.getElementById('difficulty').value);
    let { ipClass, initialIP, initialMask } = generateIPAndMask(difficulty);
    let maxDevices = 2 ** (32 - initialMask);

    let attempts = 0;
    let success = false;

    while (!success && attempts < 10) {
        attempts++;
        exercise = {
            initialIP: initialIP,
            initialMask: initialMask,
            ipClass: ipClass,
            routers: []
        };

        let totalDevices = 0;
        let usedDeviceCounts = new Set();

      
        
        for (let i = 0; i < difficulty; i++) {
            let devices;
            let attempts = 0;
            do {
                const baseExponent = randomRange(2, difficulty + 3);
                devices = Math.floor(2 ** baseExponent * (Math.random() + 1));
                attempts++;
                if (attempts > 50) break; // Evitar bucle infinito
            } while (usedDeviceCounts.has(devices));
        
            if (attempts > 50) continue; // Si no encontramos un valor único, saltamos esta iteración
        
            usedDeviceCounts.add(devices);
        
            const rangeSize = getNextPowerOfTwo(devices + 3);
            if (totalDevices + rangeSize > maxDevices) break;
            
            exercise.routers.push({
                devices: devices,
                rangeSize: rangeSize,
                userInput: {
                    initialIP: '',
                    finalIP: '',
                    rangeSize: '',
                    lastUsedIP: ''
                }
            });
            totalDevices += rangeSize;
        }

        if (exercise.routers.length === difficulty) {
            success = true;
        } else {
            // Si no se pudieron generar suficientes routers, intentamos con una red más grande
            ({ ipClass, initialIP, initialMask } = generateIPAndMask(difficulty, true));
            maxDevices = 2 ** (32 - initialMask);
        }
    }

    if (!success) {
        console.error("No se pudo generar un ejercicio válido después de varios intentos.");
        alert("Error al generar el ejercicio. Por favor, inténtalo de nuevo.");
        return;
    }

    exercise.routers.sort((a, b) => b.devices - a.devices);
    assignIPsToRouters();
    shuffleRouters();
    hideDebugInfo();
    displayExercise();
}

function generateIPAndMask(difficulty, forcelarger = false) {
    let ipClass, initialIP, initialMask;

    if (difficulty <= 3 && !forcelarger) {
        ipClass = 'C';
        initialIP = `192.168.${Math.floor(Math.random() * 256)}.0`;
        initialMask = Math.floor(Math.random() * (28 - 24 + 1)) + 24; // Entre /24 y /28
    } else if (difficulty <= 6 && !forcelarger) {
        ipClass = 'B';
        initialIP = `172.${16 + Math.floor(Math.random() * 16)}.0.0`;
        initialMask = Math.floor(Math.random() * (24 - 16 + 1)) + 16; // Entre /16 y /24
    } else {
        ipClass = 'A';
        initialIP = `10.${Math.floor(Math.random() * 256)}.0.0`;
        initialMask = Math.floor(Math.random() * (24 - 8 + 1)) + 8; // Entre /8 y /24
    }

    return { ipClass, initialIP, initialMask };
}

function getNextPowerOfTwo(n) {
    return 2 ** Math.ceil(Math.log2(n));
}

function assignIPsToRouters() {
    let currentIP = ipToInt(exercise.initialIP);
    exercise.routers.forEach((router, index) => {
        router.initialIP = intToIP(currentIP);
        router.finalIP = intToIP(currentIP + router.rangeSize - 1);
        router.lastUsedIP = intToIP(currentIP + router.devices + 1); // +1 para el router, +1 para empezar desde la siguiente IP
        currentIP += router.rangeSize;
    });
}

function ipToInt(ip) {
    return ip.split('.').reduce((int, oct) => (int << 8) + parseInt(oct, 10), 0) >>> 0;
}

function intToIP(int) {
    return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.');
}

function shuffleRouters() {
    for (let i = exercise.routers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [exercise.routers[i], exercise.routers[j]] = [exercise.routers[j], exercise.routers[i]];
    }
}

function displayExercise() {
    document.getElementById('initialIP').textContent = exercise.initialIP;
    document.getElementById('initialMask').textContent = '/' + exercise.initialMask;

    const tbody = document.getElementById('routerTableBody');
    tbody.innerHTML = '';

    exercise.routers.forEach((router, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td class="router-info">
                <span class="drag-handle"></span>
                <span class="router-name">Subnet ${index + 1}</span>
                <span class="device-count">(${router.devices})</span>
            </td>
            <td>
                <input type="text" class="ip-input" data-router="${index}" data-field="initialIP">
                <span class="debug-info">${router.initialIP}</span>
            </td>
            <td>
                <input type="text" class="ip-input" data-router="${index}" data-field="finalIP">
                <span class="debug-info">${router.finalIP}</span>
            </td>
            <td>
                <input type="text" class="ip-input" data-router="${index}" data-field="rangeSize">
                <span class="debug-info">${router.rangeSize}</span>
            </td>
            <td>
                <input type="text" class="ip-input" data-router="${index}" data-field="lastUsedIP">
                <span class="debug-info">${router.lastUsedIP}</span>
            </td>
        `;
    });

    makeTableRowsDraggable();
}

function makeTableRowsDraggable() {
    const tbody = document.getElementById('routerTableBody');
    new Sortable(tbody, {
        animation: 150,
        handle: '.drag-handle', // Usa el nuevo ícono como handle
        onEnd: function(evt) {
            // Actualizar el orden de los routers en el objeto exercise
            const newOrder = Array.from(tbody.rows).map(row => parseInt(row.cells[0].textContent.match(/\d+/)[0]) - 1);
            exercise.routers = newOrder.map(index => exercise.routers[index]);
        }
    });
}

function checkExercise() {
    let allCorrect = true;
    const inputs = document.querySelectorAll('.ip-input');

    inputs.forEach(input => {
        const routerIndex = parseInt(input.dataset.router);
        const field = input.dataset.field;
        const userValue = input.value.trim();
        
        // Obtener el valor correcto del span de depuración en la misma celda
        const debugSpan = input.nextElementSibling;
        const correctValue = debugSpan.textContent.trim();

        const isCorrect = userValue === correctValue;

        input.classList.toggle('incorrect', !isCorrect);
        if (!isCorrect) allCorrect = false;
    });

    document.getElementById('result').textContent = allCorrect ? 'Correcto!' : 'Incorrecto. Revisa los campos marcados en rojo.';
}

function verifyInput(routerIndex, field, value) {
    const router = exercise.routers[routerIndex];
    switch(field) {
        case 'initialIP':
            return value === router.initialIP;
        case 'finalIP':
            return value === router.finalIP;
        case 'rangeSize':
            return parseInt(value) === router.rangeSize;
        case 'lastUsedIP':
            return value === router.lastUsedIP;
        default:
            return false;
    }
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

generateExercise();