const rawCategoryMap = [{"category_id":"1","category_name":"پنیر","business":"لبنیات"},{"category_id":"2","category_name":"آژیل","business":"لبنیات"},{"category_id":"3","category_name":"دسر","business":"لبنیات"},{"category_id":"4","category_name":"چربی","business":"لبنیات"},{"category_id":"5","category_name":"کاتلا","business":"لبنیات"},{"category_id":"6","category_name":"شیر","business":"لبنیات"},{"category_id":"7","category_name":"ماست","business":"لبنیات"},{"category_id":"8","category_name":"CSD_CRB","business":"نوشیدنی"},{"category_id":"9","category_name":"دوغ","business":"نوشیدنی"},{"category_id":"10","category_name":"انرژی زا","business":"نوشیدنی"},{"category_id":"11","category_name":"آبمیوه","business":"نوشیدنی"},{"category_id":"12","category_name":"مالت","business":"نوشیدنی"},{"category_id":"13","category_name":"آب","business":"نوشیدنی"},{"category_id":"14","category_name":"بار","business":"قنادی"},{"category_id":"15","category_name":"شکلات","business":"قنادی"},{"category_id":"16","category_name":"کرم قنادی","business":"قنادی"},{"category_id":"17","category_name":"آردی قنادی","business":"قنادی"},{"category_id":"18","category_name":"پایه آبی","business":"قنادی"},{"category_id":"19","category_name":"گوشتی کاپو","business":"کاپو"},{"category_id":"20","category_name":"پیتزا","business":"کاپو"},{"category_id":"21","category_name":"اسنک و دیپ","business":"کاپو"},{"category_id":"22","category_name":"غذای آماده","business":"کاپو"},{"category_id":"23","category_name":"تغذیه کودک","business":"سلامت"},{"category_id":"24","category_name":"سلینو","business":"سلامت"},{"category_id":"25","category_name":"قهوه","business":"سلامت"},{"category_id":"26","category_name":"کاله پرو","business":"سلامت"},{"category_id":"27","category_name":"فله","business":"بستنی"},{"category_id":"28","category_name":"اقتصادی","business":"بستنی"},{"category_id":"29","category_name":"کیک دسر انجمادی","business":"بستنی"},{"category_id":"30","category_name":"پریمیوم","business":"بستنی"},{"category_id":"31","category_name":"کنتاکی","business":"غذای آماده"},{"category_id":"32","category_name":"برگر و بیف","business":"غذای آماده"},{"category_id":"33","category_name":"مرغ","business":"غذای آماده"},{"category_id":"34","category_name":"دونر","business":"غذای آماده"},{"category_id":"35","category_name":"سیب زمینی","business":"غذای آماده"},{"category_id":"36","category_name":"سس","business":"غذای آماده"},{"category_id":"37","category_name":"سوسیس و بلونیا","business":"غذای آماده"},{"category_id":"38","category_name":"غذای دریایی","business":"غذای آماده"},{"category_id":"39","category_name":"فینگر فود و اسنک","business":"غذای آماده"},{"category_id":"40","category_name":"سبزیجات","business":"غذای آماده"}];

// Custom Business Themes
const BUSINESS_THEMES = {
    'dairy': {
        primary: '#0ea5a8',
        secondary: '#7ce7e1',
        glow: 'rgba(14, 165, 168, .22)',
        gradient: 'linear-gradient(135deg, #0ea5a8 0%, #7ce7e1 100%)'
    },
    'beverage': {
        primary: '#2f8f46',
        secondary: '#b7e66d',
        glow: 'rgba(183, 230, 109, .24)',
        gradient: 'linear-gradient(135deg, #2f8f46 0%, #b7e66d 100%)'
    },
    'confectionary': {
        primary: '#7b4b2a',
        secondary: '#c58a62',
        glow: 'rgba(197, 138, 98, .20)',
        gradient: 'linear-gradient(135deg, #7b4b2a 0%, #c58a62 100%)'
    },
    'capo': {
        primary: '#c89b16',
        secondary: '#f3d56b',
        glow: 'rgba(243, 213, 107, .24)',
        gradient: 'linear-gradient(135deg, #c89b16 0%, #f3d56b 100%)'
    },
    'health': {
        primary: '#143a7b',
        secondary: '#4f7bd6',
        glow: 'rgba(79, 123, 214, .22)',
        gradient: 'linear-gradient(135deg, #143a7b 0%, #4f7bd6 100%)'
    },
    'icecream': {
        primary: '#d74f8f',
        secondary: '#f1a0c8',
        glow: 'rgba(241, 160, 200, .22)',
        gradient: 'linear-gradient(135deg, #d74f8f 0%, #f1a0c8 100%)'
    },
    'readymeal': {
        primary: '#b92a2a',
        secondary: '#f06c61',
        glow: 'rgba(240, 108, 97, .22)',
        gradient: 'linear-gradient(135deg, #b92a2a 0%, #f06c61 100%)'
    }
};

const BIZ_MAP = {
    'لبنیات': 'dairy',
    'نوشیدنی': 'beverage',
    'قنادی': 'confectionary',
    'کاپو': 'capo',
    'سلامت': 'health',
    'بستنی': 'icecream',
    'غذای آماده': 'readymeal'
};

// 7 Business Units with Icons
const BUSINESS_LIST = [
    { key: 'dairy',         name: 'لبنیات',     icon: '🧀' },
    { key: 'readymeal',     name: 'غذای آماده', icon: '🍗' },
    { key: 'confectionary', name: 'قنادی',     icon: '🍫' },
    { key: 'capo',          name: 'کاپو',      icon: '🍕' },
    { key: 'health',        name: 'سلامت',     icon: '🥗' },
    { key: 'icecream',      name: 'بستنی',     icon: '🍦' },
    { key: 'beverage',      name: 'نوشیدنی',   icon: '🧃' }
];

// 40 Exact Categories with Icons
const CATEGORIES_TAXONOMY = [
    { id: 1,  business: 'لبنیات',     name: 'پنیر',              icon: '🧀' },
    { id: 2,  business: 'لبنیات',     name: 'آژیل',              icon: '🥜' },
    { id: 3,  business: 'لبنیات',     name: 'دسر',               icon: '🍮' },
    { id: 4,  business: 'لبنیات',     name: 'چربی',              icon: '🧈' },
    { id: 5,  business: 'لبنیات',     name: 'کاتلا',             icon: '🍯' },
    { id: 6,  business: 'لبنیات',     name: 'شیر',               icon: '🥛' },
    { id: 7,  business: 'لبنیات',     name: 'ماست',              icon: '🥣' },

    { id: 8,  business: 'نوشیدنی',   name: 'CSD_CRB',           icon: '🥤' },
    { id: 9,  business: 'نوشیدنی',   name: 'دوغ',               icon: '🍶' },
    { id: 10, business: 'نوشیدنی',   name: 'انرژی زا',          icon: '⚡' },
    { id: 11, business: 'نوشیدنی',   name: 'آبمیوه',            icon: '🧃' },
    { id: 12, business: 'نوشیدنی',   name: 'مالت',              icon: '🍺' },
    { id: 13, business: 'نوشیدنی',   name: 'آب',                icon: '💧' },

    { id: 14, business: 'قنادی',     name: 'بار',               icon: '🍫' },
    { id: 15, business: 'قنادی',     name: 'شکلات',             icon: '🍬' },
    { id: 16, business: 'قنادی',     name: 'کرم قنادی',         icon: '🧁' },
    { id: 17, business: 'قنادی',     name: 'آردی قنادی',        icon: '🥐' },
    { id: 18, business: 'قنادی',     name: 'پایه آبی',          icon: '🍧' },

    { id: 19, business: 'کاپو',      name: 'گوشتی کاپو',        icon: '🥩' },
    { id: 20, business: 'کاپو',      name: 'پیتزا',              icon: '🍕' },
    { id: 21, business: 'کاپو',      name: 'اسنک و دیپ',        icon: '🍟' },
    { id: 22, business: 'کاپو',      name: 'غذای آماده',        icon: '🍲' },

    { id: 23, business: 'سلامت',     name: 'تغذیه کودک',        icon: '🍼' },
    { id: 24, business: 'سلامت',     name: 'سلینو',             icon: '🌾' },
    { id: 25, business: 'سلامت',     name: 'قهوه',              icon: '☕' },
    { id: 26, business: 'سلامت',     name: 'کاله پرو',           icon: '💪' },

    { id: 27, business: 'بستنی',     name: 'فله',               icon: '🍨' },
    { id: 28, business: 'بستنی',     name: 'اقتصادی',           icon: '🍦' },
    { id: 29, business: 'بستنی',     name: 'کیک دسر انجمادی',   icon: '🎂' },
    { id: 30, business: 'بستنی',     name: 'پریمیوم',           icon: '✨' },

    { id: 31, business: 'غذای آماده', name: 'کنتاکی',            icon: '🍗' },
    { id: 32, business: 'غذای آماده', name: 'برگر و بیف',        icon: '🍔' },
    { id: 33, business: 'غذای آماده', name: 'مرغ',               icon: '🍖' },
    { id: 34, business: 'غذای آماده', name: 'دونر',              icon: '🥙' },
    { id: 35, business: 'غذای آماده', name: 'سیب زمینی',        icon: '🍟' },
    { id: 36, business: 'غذای آماده', name: 'سس',                icon: '🥫' },
    { id: 37, business: 'غذای آماده', name: 'سوسیس و بلونیا',   icon: '🌭' },
    { id: 38, business: 'غذای آماده', name: 'غذای دریایی',      icon: '🐟' },
    { id: 39, business: 'غذای آماده', name: 'فینگر فود و اسنک', icon: '🌮' },
    { id: 40, business: 'غذای آماده', name: 'سبزیجات',          icon: '🥦' }
];

window.CATEGORIES_TAXONOMY = CATEGORIES_TAXONOMY;

const FAVORITES_STORAGE_KEY = 'solico_tmr_favs_v2';
const VIEW_MODE_STORAGE_KEY = 'solico_tmr_view_mode';

let allProducts = [];
window.allProducts = allProducts;
let currentProducts = [];
let currentIndex = 0;
let selectedBusiness = '';
let selectedCategory = '';
let isSearching = false;
let favOnly = false;
let viewMode = 'card'; // 'card' | 'list'
let favorites = [];

// Load state from localStorage on script parse
function loadSavedState() {
    try {
        const rawFavs = localStorage.getItem(FAVORITES_STORAGE_KEY) || localStorage.getItem('kalleh_tmr_favs_v2');
        favorites = rawFavs ? JSON.parse(rawFavs) : [];
        if (!Array.isArray(favorites)) favorites = [];
        favorites = favorites.map(id => String(id));
    } catch (e) {
        console.warn('Error reading favorites from localStorage:', e);
        favorites = [];
    }

    try {
        const savedView = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
        if (savedView === 'list' || savedView === 'card') {
            viewMode = savedView;
        }
    } catch (e) {
        viewMode = 'card';
    }
}

function saveFavorites() {
    try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
        // Keep backwards-compatibility with legacy key
        localStorage.setItem('kalleh_tmr_favs_v2', JSON.stringify(favorites));
    } catch (e) {
        console.error('Error saving favorites to localStorage:', e);
    }
}

function updateFavBadge() {
    const badge = document.getElementById('favCount');
    if (badge) {
        badge.innerText = favorites.length;
    }
}

function applyTheme(businessName) {
    const root = document.documentElement;
    const key = BIZ_MAP[businessName];
    const theme = BUSINESS_THEMES[key];

    if (theme) {
        root.style.setProperty('--theme-primary', theme.primary);
        root.style.setProperty('--theme-secondary', theme.secondary);
        root.style.setProperty('--theme-glow', theme.glow);
        root.style.setProperty('--theme-gradient', theme.gradient);
    } else {
        root.style.setProperty('--theme-primary', 'var(--app-default-primary)');
        root.style.setProperty('--theme-secondary', 'var(--app-default-secondary)');
        root.style.setProperty('--theme-glow', 'var(--app-default-glow)');
        root.style.setProperty('--theme-gradient', 'linear-gradient(135deg, var(--app-default-primary) 0%, var(--app-default-secondary) 100%)');
    }
}

function splitPipes(val) {
    return val ? String(val).split('|').map(s => s.trim()).filter(Boolean) : [];
}

// ============================================================================
// Solico Cryptographic Engine (Web Crypto API - AES-256-GCM)
// ============================================================================
const VAULT_CONFIG = {
    iterations: 100000,
    hash: 'SHA-256',
    saltLength: 16,
    ivLength: 12,
    keyLength: 256
};

/**
 * Derives an AES-GCM CryptoKey from user passcode and salt using PBKDF2.
 * @param {string} passcode 
 * @param {Uint8Array} salt 
 * @returns {Promise<CryptoKey>}
 */
async function deriveDecryptionKey(passcode, salt) {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        encoder.encode(passcode),
        'PBKDF2',
        false,
        ['deriveKey']
    );

    return await window.crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: VAULT_CONFIG.iterations,
            hash: VAULT_CONFIG.hash
        },
        keyMaterial,
        {
            name: 'AES-GCM',
            length: VAULT_CONFIG.keyLength
        },
        false,
        ['decrypt']
    );
}

/**
 * Decrypts an AES-256-GCM encrypted binary payload directly in device RAM.
 * Binary Structure:
 *   [0..15]   - 16 bytes: PBKDF2 Salt
 *   [16..27]  - 12 bytes: AES-GCM IV (Nonce)
 *   [28..end] - Variable: AES-GCM Ciphertext + 16-byte Auth Tag
 * 
 * @param {ArrayBuffer} encryptedBuffer - Raw binary buffer of products.enc
 * @param {string} passcode - User-provided PIN or password
 * @returns {Promise<any>} Parsed JSON data directly in RAM
 */
async function decryptProductsPayload(encryptedBuffer, passcode) {
    if (!passcode || typeof passcode !== 'string') {
        throw new Error('رمز عبور وارد نشده است.');
    }
    if (!encryptedBuffer || encryptedBuffer.byteLength < (VAULT_CONFIG.saltLength + VAULT_CONFIG.ivLength + 16)) {
        throw new Error('فایل رمزنگاری‌شده ناقص یا نامعتبر است.');
    }

    const salt = new Uint8Array(encryptedBuffer, 0, VAULT_CONFIG.saltLength);
    const iv = new Uint8Array(encryptedBuffer, VAULT_CONFIG.saltLength, VAULT_CONFIG.ivLength);
    const ciphertext = new Uint8Array(encryptedBuffer, VAULT_CONFIG.saltLength + VAULT_CONFIG.ivLength);

    try {
        const key = await deriveDecryptionKey(passcode, salt);
        const decryptedBuffer = await window.crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            ciphertext
        );

        // Decode UTF-8 string directly in RAM; never write to disk or storage
        const jsonString = new TextDecoder('utf-8').decode(decryptedBuffer);
        return JSON.parse(jsonString);
    } catch (err) {
        // OperationError in Web Crypto indicates authentication tag mismatch (wrong password or corrupted data)
        if (err.name === 'OperationError') {
            throw new Error('رمز عبور وارد شده نادرست است.');
        }
        throw new Error(`خطا در رمزگشایی داده‌ها: ${err.message}`);
    }
}

/**
 * Fetches the encrypted products.enc file as an ArrayBuffer.
 * Supports fallback paths for root and subpath deployments.
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchEncryptedProducts() {
    const candidatePaths = [
        './data/products.enc',
        '/data/products.enc',
        'data/products.enc'
    ];

    let lastError = null;
    for (const path of candidatePaths) {
        try {
            const response = await fetch(path);
            if (response.ok) {
                return await response.arrayBuffer();
            }
        } catch (err) {
            lastError = err;
        }
    }
    throw new Error(lastError ? `امکان بارگذاری فایل رمزنگاری‌شده وجود ندارد: ${lastError.message}` : 'امکان بارگذاری فایل رمزنگاری‌شده وجود ندارد.');
}

/**
 * Ingests decrypted raw product objects and initializes the application catalog.
 * @param {Array<any>} rawProducts
 */
function populateProductsCatalog(rawProducts) {
    const catMap = new Map((rawCategoryMap || []).map(c => [String(c.category_id), c]));

    allProducts = (Array.isArray(rawProducts) ? rawProducts : []).map(p => {
        const cat = catMap.get(String(p.category_id)) || {};
        return {
            ...p,
            id: String(p.id),
            title: p.title || p.product_name_raw || '',
            image: p.image || (p.image_urls ? p.image_urls.split('|')[0].trim() : ''),
            business: p.business || cat.business || '',
            category_name: p.category_name || cat.category_name || '',
            claims: splitPipes(p.claims),
            targets: splitPipes(p.targets),
            tips: splitPipes(p.tips),
            sampling: splitPipes(p.sampling),
            plano: splitPipes(p.plano)
        };
    });
    window.allProducts = allProducts;

    renderBusinesses();

    requestAnimationFrame(() => {
        lockHomeHeight(true);
    });
    if (document.fonts) {
        document.fonts.ready.then(() => {
            const homeView = document.getElementById('viewHome');
            if (homeView && homeView.classList.contains('active')) {
                lockHomeHeight(true);
            }
        });
    }
}

/**
 * Core cryptographic loading function: fetches products.enc and decrypts it into RAM.
 * @param {string} passcode
 * @returns {Promise<boolean>}
 */
async function loadAndDecryptProducts(passcode) {
    const encryptedBuffer = await fetchEncryptedProducts();
    const rawProducts = await decryptProductsPayload(encryptedBuffer, passcode);
    populateProductsCatalog(rawProducts);
    return true;
}

// Expose cryptographic API for testing and Step 2 UI binding
window.SolicoVault = {
    fetchEncryptedProducts,
    decryptProductsPayload,
    loadAndDecryptProducts,
    deriveDecryptionKey
};

let isUnlocked = false;

function showLockError(message) {
    const errorEl = document.getElementById('lockError');
    const input = document.getElementById('lockPasscode');
    if (errorEl) {
        errorEl.innerText = message;
        errorEl.style.display = 'flex';
    }
    if (input) {
        input.style.borderColor = 'var(--corp-red, #f43f5e)';
        setTimeout(() => {
            input.style.borderColor = '';
        }, 2500);
    }
}

/**
 * Attempts to unlock the application using the passcode entered in the lock screen.
 * Decrypts products.enc directly into RAM and renders the core application ONLY upon success.
 */
async function attemptUnlock() {
    const input = document.getElementById('lockPasscode');
    const errorEl = document.getElementById('lockError');
    const submitBtn = document.getElementById('btnUnlock');
    const btnText = document.getElementById('btnUnlockText');
    const btnIcon = document.getElementById('btnUnlockIcon');

    if (!input) return;
    const passcode = input.value.trim();

    if (!passcode) {
        showLockError('لطفاً رمز عبور سازمانی را وارد نمایید.');
        input.focus();
        return;
    }

    // Set UI Loading State
    if (errorEl) errorEl.style.display = 'none';
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.innerText = 'در حال رمزگشایی و اعتبارسنجی...';
    if (btnIcon) btnIcon.innerText = '⏳';

    try {
        // Core execution: fetch & decrypt into device RAM using Web Crypto API
        await loadAndDecryptProducts(passcode);

        // Success: Mark as unlocked and persist session in sessionStorage
        isUnlocked = true;
        sessionStorage.setItem('solico_auth_pass', passcode);

        // Reveal protected UI controls
        const favBtn = document.getElementById('favBtn');
        if (favBtn) favBtn.style.display = 'flex';
        const searchBox = document.getElementById('mainSearchBox') || document.querySelector('.search-box');
        if (searchBox) searchBox.style.display = 'block';

        // Initialize core application state and render home DOM
        loadSavedState();
        updateFavBadge();
        openHome();

        console.log('✅ [Solico Vault] Application unlocked successfully.');
    } catch (err) {
        console.error('❌ [Solico Vault] Unlock failed:', err.message);
        showLockError(err.message || 'رمز عبور وارد شده نادرست است.');
        input.value = '';
        input.focus();
    } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.innerText = 'ورود به سامانه';
        if (btnIcon) btnIcon.innerText = '🔓';
    }
}

window.attemptUnlock = attemptUnlock;

function lockApp() {
    isUnlocked = false;
    sessionStorage.removeItem('solico_auth_pass');
    allProducts = [];
    window.allProducts = [];
    const favBtn = document.getElementById('favBtn');
    if (favBtn) favBtn.style.display = 'none';
    const searchBox = document.getElementById('mainSearchBox') || document.querySelector('.search-box');
    if (searchBox) searchBox.style.display = 'none';
    switchView('viewLock');
    const passInput = document.getElementById('lockPasscode');
    if (passInput) {
        passInput.value = '';
        passInput.focus();
    }
}
window.lockApp = lockApp;

async function init() {
    window.addEventListener('resize', () => {
        const homeView = document.getElementById('viewHome');
        if (homeView && homeView.classList.contains('active')) {
            lockHomeHeight(true);
        }
    });

    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            if (isUnlocked) {
                handleSearch(e.target.value.trim());
            }
        });
    }

    // Check for existing active session in this browser tab
    const savedPass = sessionStorage.getItem('solico_auth_pass');
    if (savedPass) {
        try {
            await loadAndDecryptProducts(savedPass);
            isUnlocked = true;
            const favBtn = document.getElementById('favBtn');
            if (favBtn) favBtn.style.display = 'flex';
            const searchBox = document.getElementById('mainSearchBox') || document.querySelector('.search-box');
            if (searchBox) searchBox.style.display = 'block';
            loadSavedState();
            updateFavBadge();
            openHome();
            return;
        } catch (e) {
            sessionStorage.removeItem('solico_auth_pass');
        }
    }

    // Default Entry Point: Strict Lock Screen
    isUnlocked = false;
    switchView('viewLock');
    const passInput = document.getElementById('lockPasscode');
    if (passInput) {
        setTimeout(() => passInput.focus(), 150);
    }
}

let homeFrameHeight = 0;

function lockHomeHeight(force = false) {
    const frame = document.getElementById('appFrame') || document.querySelector('.app-frame');
    const homeView = document.getElementById('viewHome');
    if (!frame || !homeView) return;

    if (homeView.classList.contains('active')) {
        frame.style.height = '';
        frame.style.minHeight = '';
        const h = frame.offsetHeight;
        if (h > 400 && (!homeFrameHeight || force)) {
            homeFrameHeight = h;
        }
        if (homeFrameHeight > 0) {
            frame.style.height = `${homeFrameHeight}px`;
            frame.style.minHeight = `${homeFrameHeight}px`;
        }
    } else if (homeFrameHeight > 0) {
        frame.style.height = `${homeFrameHeight}px`;
        frame.style.minHeight = `${homeFrameHeight}px`;
    }
}

function switchView(id) {
    if (!isUnlocked && id !== 'viewLock') {
        return; // Guard against navigating away from viewLock before authentication
    }
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
    lockHomeHeight();
}

function openHome() {
    if (!isUnlocked) {
        switchView('viewLock');
        return;
    }
    selectedBusiness = '';
    selectedCategory = '';
    isSearching = false;
    favOnly = false;
    const favBtn = document.getElementById('favBtn');
    if (favBtn) favBtn.classList.remove('active');
    applyTheme('');
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) searchInput.value = '';
    renderBusinesses();
    switchView('viewHome');
}

// Render Home: 7 Business Cards
function renderBusinesses() {
    const grid = document.getElementById('businessGrid');
    if (!grid) return;
    grid.innerHTML = '';

    BUSINESS_LIST.forEach(b => {
        const count = allProducts.filter(p => (p.business || '').trim() === b.name).length;
        const card = document.createElement('div');
        const theme = BUSINESS_THEMES[b.key] || {};
        card.className = 'category-card';
        card.onclick = () => selectBusiness(b.name);
        
        card.innerHTML = `
            <div class="cat-icon">${b.icon}</div>
            <div class="cat-name" style="color:${theme.primary || 'var(--text-primary)'}">${b.name}</div>
            <div class="cat-count">${count} محصول</div>
        `;
        grid.appendChild(card);
    });
}

// Render Categories View
function selectBusiness(bizName) {
    selectedBusiness = bizName;
    applyTheme(bizName);
    const breadcrumb = document.getElementById('catBreadcrumb');
    if (breadcrumb) breadcrumb.innerText = bizName;
    const grid = document.getElementById('categoryGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const subCats = CATEGORIES_TAXONOMY.filter(c => c.business === bizName);
    const rowCount = Math.ceil(subCats.length / 2);

    grid.classList.remove('grid-fit-5', 'compact-grid');
    if (rowCount >= 5) {
        grid.classList.add('grid-fit-5');
    }

    subCats.forEach(c => {
        const count = allProducts.filter(p => {
            const matchBiz = (p.business || '').trim() === bizName;
            const matchCat = (p.category_name || '').trim() === c.name || (String(p.category_id) === String(c.id));
            return matchBiz && matchCat;
        }).length;

        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = () => selectCategory(c.name, c.id);
        card.innerHTML = `
            <div class="cat-icon">${c.icon}</div>
            <div class="cat-name">${c.name}</div>
            <div class="cat-count">${count} محصول</div>
        `;
        grid.appendChild(card);
    });

    switchView('viewCategories');
}

// Render Products (Flashcard / List View)
function selectCategory(catName, catId) {
    selectedCategory = catName;
    isSearching = false;

    let list = allProducts.filter(p => {
        const matchBiz = !selectedBusiness || (p.business || '').trim() === selectedBusiness;
        const matchCat = (p.category_name || '').trim() === catName || (String(p.category_id) === String(catId));
        return matchBiz && matchCat;
    });

    if (favOnly) {
        list = list.filter(p => favorites.includes(String(p.id)));
    }

    if (list.length === 0) {
        document.getElementById('emptyMsg').innerText = favOnly
            ? `هیچ محصول علاقه‌مندی در دسته «${catName}» وجود ندارد.`
            : `هیچ محصولی در دسته «${catName}» موجود نیست.`;
        switchView('viewEmpty');
        return;
    }

    currentProducts = list;
    currentIndex = 0;
    renderActiveView();
    switchView('viewFlashcards');
}

function backFromCards() {
    if (isSearching) {
        openHome();
    } else if (favOnly && !selectedBusiness && !selectedCategory) {
        openHome();
    } else if (selectedBusiness) {
        selectBusiness(selectedBusiness);
    } else {
        openHome();
    }
}

// Layout Switching (Card vs List)
function setViewMode(mode) {
    viewMode = mode;
    try {
        localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode);
    } catch (e) {}

    const btnCard = document.getElementById('btnToggleCard');
    const btnList = document.getElementById('btnToggleList');
    const cardContainer = document.getElementById('flashcardModeContainer');
    const listContainer = document.getElementById('listModeContainer');

    if (btnCard) btnCard.classList.toggle('active', mode === 'card');
    if (btnList) btnList.classList.toggle('active', mode === 'list');

    if (mode === 'card') {
        if (cardContainer) {
            cardContainer.style.display = 'flex';
            cardContainer.style.setProperty('display', 'flex', 'important');
        }
        if (listContainer) {
            listContainer.style.display = 'none';
            listContainer.style.setProperty('display', 'none', 'important');
        }
        renderCard();
    } else {
        if (cardContainer) {
            cardContainer.style.display = 'none';
            cardContainer.style.setProperty('display', 'none', 'important');
        }
        if (listContainer) {
            listContainer.style.display = 'flex';
            listContainer.style.setProperty('display', 'flex', 'important');
        }
        renderList();
    }
}

function toggleViewMode() {
    setViewMode(viewMode === 'card' ? 'list' : 'card');
}

function renderActiveView() {
    const p = currentProducts[currentIndex] || currentProducts[0];
    if (p && p.business) {
        applyTheme(p.business);
    } else if (selectedBusiness) {
        applyTheme(selectedBusiness);
    }

    const breadcrumb = document.getElementById('productBreadcrumb');
    if (breadcrumb) {
        if (selectedBusiness && selectedCategory) {
            breadcrumb.innerText = `${selectedBusiness} › ${selectedCategory}`;
        } else if (selectedCategory) {
            breadcrumb.innerText = selectedCategory;
        } else if (p) {
            breadcrumb.innerText = `${p.business || ''} › ${p.category_name || ''}`;
        }
    }

    setViewMode(viewMode);
}

// 1. Render Flashcard
function renderCard() {
    const flashcardEl = document.getElementById('flashcard');
    if (flashcardEl) flashcardEl.classList.remove('flipped');

    const p = currentProducts[currentIndex];
    if (!p) return;

    if (p.business) {
        applyTheme(p.business);
    }

    const cardCounter = document.getElementById('cardCounter');
    if (cardCounter) {
        cardCounter.innerText = `${currentIndex + 1} از ${currentProducts.length}`;
    }

    const breadcrumb = document.getElementById('productBreadcrumb');
    if (breadcrumb) {
        breadcrumb.innerText = `${p.business || selectedBusiness || ''} › ${p.category_name || selectedCategory || ''}`;
    }

    const isFav = favorites.includes(String(p.id));
    const likeBtn = document.getElementById('likeBtn');
    if (likeBtn) {
        likeBtn.innerHTML = isFav ? '❤️' : '🤍';
        likeBtn.classList.toggle('liked', isFav);
        likeBtn.title = isFav ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها';
    }

    const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\'><text x=\'50%\' y=\'50%\' font-size=\'10\' text-anchor=\'middle\' fill=\'%23888\'>بدون تصویر</text></svg>`;
    const fImg = document.getElementById('f_img');
    if (fImg) {
        fImg.src = p.image || fallbackSvg;
        fImg.alt = p.title || '';
    }

    document.getElementById('f_title').innerText = p.title || '';
    document.getElementById('f_slogan').innerText = p.slogan || '';
    document.getElementById('f_weights').innerText = p.weights || '-';

    document.getElementById('f_claims').innerHTML = (p.claims || []).map(c => `<li>${c}</li>`).join('');
    document.getElementById('f_targets').innerHTML = (p.targets || []).map(t => `<li>${t}</li>`).join('');

    document.getElementById('b_tips').innerHTML = (p.tips || []).map(t => `<li>${t}</li>`).join('');
    document.getElementById('b_sampling').innerHTML = (p.sampling || []).map(s => `<li>${s}</li>`).join('');
    document.getElementById('b_plano').innerHTML = (p.plano || []).map(pl => `<li>${pl}</li>`).join('');

    // Planogram image
    const planoContainer = document.getElementById('b_plano_img_container');
    const planoImage = document.getElementById('b_plano_img');
    const planoImageUrl = (p.plano_image || '').trim();

    if (planoContainer && planoImage) {
        if (planoImageUrl) {
            planoImage.src = planoImageUrl;
            planoImage.alt = `پلانوگرام ${p.title || ''}`;
            planoContainer.style.display = 'flex';
        } else {
            planoImage.removeAttribute('src');
            planoContainer.style.display = 'none';
        }
    }

    document.getElementById('b_ingredients').innerText = p.ingredients || '-';
    document.getElementById('b_competitor').innerText = p.competitor || '-';
    const negotiationElement = document.getElementById('b_negotiation');
    if (negotiationElement) {
        const items = Array.isArray(p.negotiation)
            ? p.negotiation
            : (p.negotiation ? String(p.negotiation).split('|').map(s => s.trim()).filter(Boolean) : []);
        
        negotiationElement.innerHTML = items.length
            ? '<ul style="margin:0; padding-right:1rem; line-height:1.6;">' + items.map(it => `<li style="margin:0.2rem 0; list-style:disc;">${it}</li>`).join('') + '</ul>'
            : '-';
    }

    document.getElementById('b_nutrition').innerHTML = `
        <div class="nutrition-item"><div class="val">${p.energy || '-'}</div><div class="lbl">انرژی</div></div>
        <div class="nutrition-item"><div class="val">${p.protein ? p.protein + 'g' : '-'}</div><div class="lbl">پروتئین</div></div>
        <div class="nutrition-item"><div class="val">${p.fat ? p.fat + 'g' : '-'}</div><div class="lbl">چربی</div></div>
        <div class="nutrition-item"><div class="val">${p.sugar ? p.sugar + 'g' : '-'}</div><div class="lbl">قند</div></div>
        <div class="nutrition-item"><div class="val">${p.salt ? p.salt + 'g' : '-'}</div><div class="lbl">نمک</div></div>
        <div class="nutrition-item"><div class="val">${p.shelf_life || '-'}</div><div class="lbl">ماندگاری</div></div>
    `;

    switchTab('tab-tmr');
}

// 2. Render List View
function renderList() {
    const listContainer = document.getElementById('productListContainer');
    if (!listContainer) return;

    const cardCounter = document.getElementById('cardCounter');
    if (cardCounter) {
        cardCounter.innerText = `${currentProducts.length} محصول`;
    }

    const breadcrumb = document.getElementById('productBreadcrumb');
    if (breadcrumb) {
        breadcrumb.innerText = `${selectedBusiness ? selectedBusiness + ' › ' : ''}${selectedCategory || 'محصولات'}`;
    }

    if (currentProducts.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-list-notice">
                <p>هیچ محصولی برای نمایش وجود ندارد.</p>
            </div>
        `;
        return;
    }

    const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\'><text x=\'50%\' y=\'50%\' font-size=\'9\' text-anchor=\'middle\' fill=\'%23999\'>بدون تصویر</text></svg>`;

    listContainer.innerHTML = currentProducts.map((p, idx) => {
        const isFav = favorites.includes(String(p.id));
        const imgUrl = p.image || fallbackSvg;

        return `
            <div class="product-list-card ${idx === currentIndex ? 'highlighted' : ''}" onclick="openCardFromList(${idx})">
                <div class="product-list-thumb">
                    <img src="${imgUrl}" alt="${p.title || ''}" loading="lazy" onerror="this.src='${fallbackSvg}'">
                </div>
                <div class="product-list-info">
                    <h4 class="product-list-title">${p.title || 'بدون نام'}</h4>
                    <p class="product-list-slogan">${p.slogan || 'بدون شعار تبلیغاتی'}</p>
                    <div class="product-list-badges">
                        ${p.weights ? `<span class="product-badge weight">⚖️ ${p.weights}</span>` : ''}
                        ${p.category_name ? `<span class="product-badge category">${p.category_name}</span>` : ''}
                    </div>
                </div>
                <div class="product-list-actions">
                    <button class="btn-list-like ${isFav ? 'liked' : ''}" title="${isFav ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}" onclick="event.stopPropagation(); toggleFavById('${p.id}')">
                        ${isFav ? '❤️' : '🤍'}
                    </button>
                    <span class="product-list-arrow">‹</span>
                </div>
            </div>
        `;
    }).join('');
}

function openCardFromList(index) {
    if (index >= 0 && index < currentProducts.length) {
        currentIndex = index;
        setViewMode('card');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function flipCard() {
    const flashcardEl = document.getElementById('flashcard');
    if (flashcardEl) flashcardEl.classList.toggle('flipped');
}

function nextCard() {
    if (currentProducts.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentProducts.length;
    renderCard();
}

function prevCard() {
    if (currentProducts.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentProducts.length) % currentProducts.length;
    renderCard();
}

// Persistent Favorites Management
function toggleFavById(productId) {
    const idStr = String(productId);
    const idx = favorites.indexOf(idStr);
    if (idx > -1) {
        favorites.splice(idx, 1);
    } else {
        favorites.push(idStr);
    }

    saveFavorites();
    updateFavBadge();

    // If currently filtered by favorites and item was unfavorited
    if (favOnly) {
        currentProducts = currentProducts.filter(p => favorites.includes(String(p.id)));
        if (currentProducts.length === 0) {
            document.getElementById('emptyMsg').innerText = 'لیست علاقه‌مندی‌های شما خالی شد.';
            switchView('viewEmpty');
            return;
        }
        if (currentIndex >= currentProducts.length) {
            currentIndex = Math.max(0, currentProducts.length - 1);
        }
    }

    if (viewMode === 'card') {
        renderCard();
    } else {
        renderList();
    }
}

function toggleCurrentFav() {
    const p = currentProducts[currentIndex];
    if (!p) return;
    toggleFavById(p.id);
}

function toggleFavOnly() {
    if (!isUnlocked) return;
    favOnly = !favOnly;
    const favBtn = document.getElementById('favBtn');
    if (favBtn) favBtn.classList.toggle('active', favOnly);
    
    const q = (document.getElementById('globalSearch')?.value || '').trim();
    if (q) {
        handleSearch(q);
        return;
    }
    
    if (favOnly) {
        let favList = allProducts.filter(p => favorites.includes(String(p.id)));
        if (selectedCategory) {
            favList = favList.filter(p => (p.category_name || '').trim() === selectedCategory);
        } else if (selectedBusiness) {
            favList = favList.filter(p => (p.business || '').trim() === selectedBusiness);
        }

        if (favList.length === 0) {
            document.getElementById('emptyMsg').innerText = 'لیست علاقه‌مندی‌های شما خالی است. با لمس آیکون قلب (🤍) روی هر محصول، آن را ذخیره کنید.';
            switchView('viewEmpty');
            return;
        }

        currentProducts = favList;
        currentIndex = 0;
        selectedCategory = selectedCategory || 'علاقه‌مندی‌ها';
        renderActiveView();
        switchView('viewFlashcards');
    } else {
        if (selectedCategory) {
            selectCategory(selectedCategory);
        } else if (selectedBusiness) {
            selectBusiness(selectedBusiness);
        } else {
            openHome();
        }
    }
}

function switchTab(tabId) {
    if (!isUnlocked) return;
    document.querySelectorAll('.tab-panel').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    const panel = document.getElementById(tabId);
    if (panel) panel.classList.add('active');

    const btns = document.querySelectorAll('.tab-btn');
    if (tabId === 'tab-tmr' && btns[0]) btns[0].classList.add('active');
    if (tabId === 'tab-nutrition' && btns[1]) btns[1].classList.add('active');
    if (tabId === 'tab-more' && btns[2]) btns[2].classList.add('active');
}

function handleSearch(query) {
    if (!isUnlocked) return;
    if (!query) {
        openHome();
        return;
    }

    isSearching = true;
    const q = query.toLowerCase();
    let matches = allProducts.filter(p => {
        const fullText = [p.title, p.sku, p.business, p.category_name, p.slogan, p.ingredients, p.competitor]
            .join(' ').toLowerCase();
        return fullText.includes(q);
    });

    if (favOnly) {
        matches = matches.filter(p => favorites.includes(String(p.id)));
    }

    if (matches.length === 0) {
        document.getElementById('emptyMsg').innerText = `نتیجه‌ای برای «${query}» یافت نشد.`;
        switchView('viewEmpty');
    } else {
        currentProducts = matches;
        currentIndex = 0;
        selectedCategory = `نتایج جستجو: «${query}»`;
        renderActiveView();
        switchView('viewFlashcards');
    }
}

document.addEventListener('keydown', (e) => {
    if (!isUnlocked) return;
    const flashcardView = document.getElementById('viewFlashcards');
    if (!flashcardView || !flashcardView.classList.contains('active')) return;
    if (viewMode !== 'card') return;

    if (e.code === 'Space') { e.preventDefault(); flipCard(); }
    if (e.code === 'ArrowRight' || e.code === 'ArrowDown') nextCard();
    if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') prevCard();
});

init();