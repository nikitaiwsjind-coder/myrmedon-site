// ========================================
// MOBILE MENU TOGGLE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    var toggleBtn = document.getElementById('mobileToggle');
    var mainNav = document.getElementById('mainNav');

    if (toggleBtn && mainNav) {
        toggleBtn.addEventListener('click', function() {
            mainNav.classList.toggle('open');
        });

        mainNav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                mainNav.classList.remove('open');
            });
        });
    }

    updateCartCount();
});

// ========================================
// CART FUNCTIONS
// ========================================
function getCart() {
    try {
        var cart = localStorage.getItem('myrmedon_cart');
        return cart ? JSON.parse(cart) : [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem('myrmedon_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    var cart = getCart();
    var count = 0;
    for (var i = 0; i < cart.length; i++) {
        count = count + cart[i].quantity;
    }
    var elements = document.querySelectorAll('.cart-count');
    for (var j = 0; j < elements.length; j++) {
        elements[j].textContent = count;
    }
}

function addToCart(productId) {
    var products = {
        '1': { name: 'Camponotus japonicus', price: 429, desc: 'Велика чорна мураха' },
        '2': { name: 'Camponotus pseudoirritans', price: 799, desc: 'Червоний черевець' },
        '3': { name: 'Ectomomyrmex zhengii', price: 1129, desc: 'Агресивні мисливці' },
        '4': { name: 'Messor structor', price: 490, desc: 'Жниварі для початківців' },
        '5': { name: 'Camponotus vagus', price: 890, desc: 'Чорні лісові велетні' },
        '6': { name: 'Atta cephalotes', price: 2990, desc: 'Мурахи-листорізи' }
    };

    var product = products[productId];
    if (!product) {
        return;
    }

    var cart = getCart();
    var existing = null;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            existing = cart[i];
            break;
        }
    }

    if (existing) {
        existing.quantity = existing.quantity + 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            desc: product.desc,
            quantity: 1
        });
    }

    saveCart(cart);
    showNotification(product.name + ' додано в кошик! 🐜');
}

function showNotification(message) {
    var existing = document.querySelector('.notification-toast');
    if (existing) {
        existing.remove();
    }

    var toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.innerHTML = '<i class="fas fa-check-circle" style="color: var(--primary);"></i> ' + message;

    toast.style.cssText = [
        'position: fixed',
        'bottom: 30px',
        'right: 30px',
        'background: #f5f7f8',
        'border: 1px solid #2c3e50',
        'border-radius: 12px',
        'padding: 16px 28px',
        'color: #1a1a2e',
        'font-family: Rajdhani, sans-serif',
        'font-size: 15px',
        'z-index: 9999',
        'box-shadow: 0 10px 40px rgba(0,0,0,0.08)',
        'display: flex',
        'align-items: center',
        'gap: 12px',
        'max-width: 400px',
        'animation: slideIn 0.4s ease'
    ].join(';');

    if (!document.getElementById('toast-styles')) {
        var style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = [
            '@keyframes slideIn {',
            '    from { transform: translateX(100px); opacity: 0; }',
            '    to { transform: translateX(0); opacity: 1; }',
            '}',
            '@keyframes slideOut {',
            '    from { transform: translateX(0); opacity: 1; }',
            '    to { transform: translateX(100px); opacity: 0; }',
            '}'
        ].join('');
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    setTimeout(function() {
        toast.style.animation = 'slideOut 0.4s ease forwards';
        setTimeout(function() {
            toast.remove();
        }, 500);
    }, 2500);
}