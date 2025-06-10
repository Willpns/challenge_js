let money = 0; // Initialisation de la monnaie
let cps = 0; // Initialisation des clics par seconde
let owned = {
    "upgrade1": 0,
    "upgrade2": 0,
    "upgrade3": 0,
    "upgrade4": 0
};
let selectedQuantity = 1;
let lastClickTime = 0;
let maxBackgroundPizzas = 20; // Limite le nombre de pizzas en arrière-plan
let multiplier = 1; // Multiplicateur temporaire

// Améliorations possibles pour la pizza d'or
const goldenUpgrades = [
    { name: "Pizza x2", effect: () => { money *= 2; } },
    { name: "PPS x2", effect: () => { cps *= 2; } },
    { name: "Pizza x10", effect: () => { money *= 10; } },
    { name: "PPS x10", effect: () => { cps *= 10; } },
    { name: "Pizza x100", effect: () => { money *= 100; } },
    { name: "PPS x100", effect: () => { cps *= 100; } },
    { name: "Pizza x1000", effect: () => { money *= 1000; } },
    { name: "PPS x1000", effect: () => { cps *= 1000; } },
    { 
        name: "Boost x3 (1min)", 
        effect: () => {
            multiplier = 3;
            // Afficher un message de début
            showMessage("Boost x3 activé !");
            // Réinitialiser le multiplicateur après 1 minute
            setTimeout(() => {
                multiplier = 1;
                showMessage("Boost x3 terminé !");
            }, 60000);
        }
    }
];

// Créer une pizza flottante (pour les clics manuels)
function createFloatingPizza(x, y) {
    const pizza = document.createElement('img');
    pizza.src = 'images/pizza.avif';
    pizza.className = 'floating-pizza';
    
    // Positionner la pizza par rapport au conteneur de la pizza
    const cookieContainer = document.querySelector('.cookie-container');
    const containerRect = cookieContainer.getBoundingClientRect();
    
    pizza.style.left = `${containerRect.left + x}px`;
    pizza.style.top = `${containerRect.top + y}px`;
    
    document.getElementById('floating-pizzas').appendChild(pizza);
    
    // Supprimer la pizza après l'animation
    pizza.addEventListener('animationend', () => {
        pizza.remove();
    });
}

// Créer une pizza qui tombe (pour les clics automatiques)
function createFallingPizza() {
    const backgroundContainer = document.getElementById('background-pizzas');
    const currentPizzas = backgroundContainer.children.length;
    
    // Limiter le nombre de pizzas en arrière-plan à 50 maximum
    if (currentPizzas >= 50) {
        // Supprimer la plus ancienne pizza si on atteint la limite
        const oldestPizza = backgroundContainer.firstChild;
        if (oldestPizza) {
            oldestPizza.remove();
        }
    }

    const pizza = document.createElement('img');
    pizza.src = 'images/pizza.avif';
    pizza.className = 'falling-pizza';
    
    // Position aléatoire horizontale
    const x = Math.random() * window.innerWidth;
    pizza.style.left = `${x}px`;
    
    backgroundContainer.appendChild(pizza);
    
    // Supprimer la pizza après l'animation
    pizza.addEventListener('animationend', () => {
        pizza.remove();
    });
}

// Créer une pizza d'or
function createGoldenPizza() {
    const container = document.getElementById('golden-pizza-container');
    const pizza = document.createElement('img');
    pizza.src = 'images/pizzaor.png';
    pizza.className = 'golden-pizza';
    
    // Position aléatoire
    const x = Math.random() * (window.innerWidth - 60);
    const y = Math.random() * (window.innerHeight - 60);
    pizza.style.left = `${x}px`;
    pizza.style.top = `${y}px`;
    
    // Ajouter l'événement de clic
    pizza.addEventListener('click', () => {
        // Sélectionner une amélioration aléatoire
        const upgrade = goldenUpgrades[Math.floor(Math.random() * goldenUpgrades.length)];
        upgrade.effect();
        
        // Afficher un message
        const message = document.createElement('div');
        message.textContent = `Amélioration obtenue : ${upgrade.name}`;
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        message.style.color = 'gold';
        message.style.padding = '20px';
        message.style.borderRadius = '10px';
        message.style.zIndex = '1000';
        document.body.appendChild(message);
        
        // Supprimer le message après 2 secondes
        setTimeout(() => message.remove(), 2000);
        
        // Supprimer la pizza
        pizza.remove();
        updateUI();
    });
    
    container.appendChild(pizza);
    
    // Supprimer la pizza après 1 minute
    setTimeout(() => {
        if (pizza.parentNode) {
            pizza.remove();
        }
    }, 60000);
}

// Planifier l'apparition des pizzas d'or
function scheduleGoldenPizza() {
    const delay = Math.random() * (40 - 15) * 60000 + 15 * 60000; // Entre 15 et 40 minutes
    setTimeout(() => {
        createGoldenPizza();
        scheduleGoldenPizza(); // Planifier la prochaine pizza
    }, delay);
}

// Démarrer le cycle des pizzas d'or
scheduleGoldenPizza();

// Charger les données sauvegardées
function loadGame() {
    if (localStorage.getItem("money")) {
        money = parseInt(localStorage.getItem("money"));
    }
    if (localStorage.getItem("cps")) {
        cps = parseInt(localStorage.getItem("cps"));
    }
    if (localStorage.getItem("owned")) {
        owned = JSON.parse(localStorage.getItem("owned"));
    }
    updateUI();
}

// Sauvegarder les données
function saveGame() {
    localStorage.setItem("money", money);
    localStorage.setItem("cps", cps);
    localStorage.setItem("owned", JSON.stringify(owned));
}

// Calculer le coût d'un upgrade
function calculateCost(baseCost, owned) {
    // Augmentation de 15% par niveau, mais avec un plafond pour éviter les prix trop élevés
    const inflation = Math.min(1.15, 1 + (0.15 * Math.log10(owned + 1)));
    return Math.floor(baseCost * Math.pow(inflation, owned));
}

// Fonction pour formater les grands nombres
function formatNumber(number) {
    if (number >= 1000000000000) {
        return (number / 1000000000000).toFixed(1) + 'T';
    }
    if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + 'B';
    }
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    }
    if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    }
    return Math.floor(number);
}

// Met à jour l'interface utilisateur
function updateUI() {
    document.getElementById("money").textContent = formatNumber(money);
    document.getElementById("cps").textContent = formatNumber(cps);

    // Mettre à jour les prix et les quantités possédées
    document.querySelectorAll(".shop-item").forEach((item, index) => {
        const upgradeId = `upgrade${index + 1}`;
        const baseCost = parseInt(item.getAttribute("data-base-cost"));
        const currentCost = calculateCost(baseCost, owned[upgradeId]);
        const totalCost = currentCost * selectedQuantity;
        
        item.querySelector(".cost").textContent = formatNumber(totalCost);
        item.querySelector(".owned").textContent = formatNumber(owned[upgradeId]);
        
        // Désactiver le bouton si pas assez d'argent
        const buyButton = item.querySelector(".buy-btn");
        buyButton.disabled = money < totalCost;
    });
}

// Fonction pour afficher les messages
function showMessage(text) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    message.style.color = 'gold';
    message.style.padding = '20px';
    message.style.borderRadius = '10px';
    message.style.zIndex = '1000';
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 2000);
}

// Gérer les clics sur la pizza
document.getElementById("cookie-img").addEventListener("click", (event) => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime >= 50) {
        money += multiplier; // Appliquer le multiplicateur
        
        // Calculer la position relative au conteneur de la pizza
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        createFloatingPizza(x, y);
        updateUI();
        lastClickTime = currentTime;
    }
});

// Gérer le sélecteur de quantité
document.querySelectorAll(".quantity-btn").forEach(button => {
    button.addEventListener("click", () => {
        // Retirer la classe active de tous les boutons
        document.querySelectorAll(".quantity-btn").forEach(btn => {
            btn.classList.remove("active");
        });
        // Ajouter la classe active au bouton cliqué
        button.classList.add("active");
        // Mettre à jour la quantité sélectionnée
        selectedQuantity = parseInt(button.getAttribute("data-quantity"));
        updateUI();
    });
});

// Gérer les achats dans le magasin
document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", () => {
        const parent = button.closest(".shop-item");
        const index = Array.from(parent.parentNode.children).indexOf(parent);
        const upgradeId = `upgrade${index + 1}`;
        const baseCost = parseInt(parent.getAttribute("data-base-cost"));
        const cpsGain = parseInt(parent.getAttribute("data-cps"));
        
        const currentCost = calculateCost(baseCost, owned[upgradeId]);
        const totalCost = currentCost * selectedQuantity;

        if (money >= totalCost) {
            money -= totalCost;
            // Calculer le gain total de PPS pour cette amélioration
            const totalCpsGain = cpsGain * selectedQuantity;
            cps += totalCpsGain;
            owned[upgradeId] += selectedQuantity;
            updateUI();
            saveGame(); // Sauvegarder immédiatement après l'achat
        }
    });
});

// Bouton de réinitialisation
document.getElementById("resetButton").addEventListener("click", () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser le jeu ?")) {
        money = 0;
        cps = 0;
        owned = {
            "upgrade1": 0,
            "upgrade2": 0,
            "upgrade3": 0,
            "upgrade4": 0
        };
        localStorage.clear();
        // Nettoyer les pizzas en arrière-plan
        document.getElementById('background-pizzas').innerHTML = '';
        updateUI();
    }
});

// Générer des pizzas automatiquement
let lastAutoUpdate = Date.now();
let pizzaQueue = 0; // Pour gérer les fractions de pizza
const MAX_VISIBLE_PPS = 50; // Nombre maximum de pizzas visibles par seconde

setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastAutoUpdate) / 1000;
    lastAutoUpdate = currentTime;

    if (cps > 0) {
        const pizzasToAdd = cps * deltaTime * multiplier; // Appliquer le multiplicateur
        money += pizzasToAdd;
        
        // Ajouter les pizzas à la file d'attente
        pizzaQueue += pizzasToAdd;
        
        // Calculer le nombre de pizzas à afficher en fonction du PPS
        const visiblePPS = Math.min(cps, MAX_VISIBLE_PPS);
        
        // Créer une pizza si on a accumulé suffisamment de pizzas
        if (pizzaQueue >= 1) {
            createFallingPizza();
            pizzaQueue -= 1;
        }
        
        updateUI();
    }
}, 50);

// Sauvegarde automatique
setInterval(saveGame, 5000);

// Charger le jeu au démarrage
loadGame();

// Codes de triche
console.log("Codes de triche disponibles :");
console.log("givePizzas(1000) - Donne 1000 pizzas");
console.log("givePPS(100) - Donne 100 PPS");
console.log("spawnGoldenPizza() - Fait apparaître une pizza d'or");

// Fonction pour donner des pizzas
function givePizzas(amount) {
    money += amount;
    updateUI();
    saveGame();
}

// Fonction pour donner des PPS
function givePPS(amount) {
    cps += amount;
    updateUI();
    saveGame();
}

// Fonction pour faire apparaître une pizza d'or
function spawnGoldenPizza() {
    createGoldenPizza();
}
