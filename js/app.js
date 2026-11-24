const rawCategoryMap = [{"category_id": "1", "category_name": "پنیر", "business": "لبنیات"}, {"category_id": "2", "category_name": "آژیل", "business": "لبنیات"}, {"category_id": "3", "category_name": "دسر", "business": "لبنیات"}, {"category_id": "4", "category_name": "چربی", "business": "لبنیات"}, {"category_id": "5", "category_name": "کاتلا", "business": "لبنیات"}, {"category_id": "6", "category_name": "شیر", "business": "لبنیات"}, {"category_id": "7", "category_name": "ماست", "business": "لبنیات"}, {"category_id": "8", "category_name": "CSD_CRB", "business": "نوشیدنی"}, {"category_id": "9", "category_name": "دوغ", "business": "نوشیدنی"}, {"category_id": "10", "category_name": "انرژی زا", "business": "نوشیدنی"}, {"category_id": "11", "category_name": "آبمیوه", "business": "نوشیدنی"}, {"category_id": "12", "category_name": "مالت", "business": "نوشیدنی"}, {"category_id": "13", "category_name": "آب", "business": "نوشیدنی"}, {"category_id": "14", "category_name": "بار", "business": "قنادی"}, {"category_id": "15", "category_name": "شکلات", "business": "قنادی"}, {"category_id": "16", "category_name": "کرم قنادی", "business": "قنادی"}, {"category_id": "17", "category_name": "آردی قنادی", "business": "قنادی"}, {"category_id": "18", "category_name": "پایه آبی", "business": "قنادی"}, {"category_id": "19", "category_name": "گوشتی کاپو", "business": "کاپو"}, {"category_id": "20", "category_name": "پیتزا", "business": "کاپو"}, {"category_id": "21", "category_name": "ساندویچ", "business": "کاپو"}, {"category_id": "22", "category_name": "نان پیتزا", "business": "کاپو"}, {"category_id": "23", "category_name": "تغذیه کودک", "business": "سلامت"}, {"category_id": "24", "category_name": "سلینو", "business": "سلامت"}, {"category_id": "25", "category_name": "قهوه", "business": "سلامت"}, {"category_id": "26", "category_name": "کاله پرو", "business": "سلامت"}, {"category_id": "27", "category_name": "فله", "business": "بستنی"}, {"category_id": "28", "category_name": "اقتصادی", "business": "بستنی"}, {"category_id": "29", "category_name": "کیک دسر انجمادی", "business": "بستنی"}, {"category_id": "30", "category_name": "پریمیوم", "business": "بستنی"}, {"category_id": "31", "category_name": "کنتاکی", "business": "غذای آماده"}, {"category_id": "32", "category_name": "برگر و بیف", "business": "غذای آماده"}, {"category_id": "33", "category_name": "مرغ", "business": "غذای آماده"}, {"category_id": "34", "category_name": "دونر", "business": "غذای آماده"}, {"category_id": "35", "category_name": "سیب زمینی", "business": "غذای آماده"}, {"category_id": "36", "category_name": "سس", "business": "غذای آماده"}, {"category_id": "37", "category_name": "سوسیس و بلونیا", "business": "غذای آماده"}, {"category_id": "38", "category_name": "غذای دریایی", "business": "غذای آماده"}, {"category_id": "39", "category_name": "فینگر فود و اسنک", "business": "غذای آماده"}, {"category_id": "40", "category_name": "سبزیجات", "business": "غذای آماده"}, {"category_id": "41", "category_name": "لبنیات عمومی", "business": "لبنیات"}, {"category_id": "42", "category_name": "خمیر آشپزی و شیرینی", "business": "کاپو"}, {"category_id": "43", "category_name": "خمیر پیراشکی", "business": "کاپو"}, {"category_id": "44", "category_name": "دیپ و حمص", "business": "کاپو"}, {"category_id": "45", "category_name": "سالاد الویه", "business": "کاپو"}, {"category_id": "46", "category_name": "اسنک و تنقلات", "business": "کاپو"}];

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
    { id: 1, business: 'لبنیات', name: 'پنیر', icon: '🧀' },
    { id: 2, business: 'لبنیات', name: 'آژیل', icon: '🥜' },
    { id: 3, business: 'لبنیات', name: 'دسر', icon: '🍮' },
    { id: 4, business: 'لبنیات', name: 'چربی', icon: '🧈' },
    { id: 5, business: 'لبنیات', name: 'کاتلا', icon: '🍯' },
    { id: 6, business: 'لبنیات', name: 'شیر', icon: '🥛' },
    { id: 7, business: 'لبنیات', name: 'ماست', icon: '🥣' },
    { id: 8, business: 'نوشیدنی', name: 'CSD_CRB', icon: '🥤' },
    { id: 9, business: 'نوشیدنی', name: 'دوغ', icon: '🍶' },
    { id: 10, business: 'نوشیدنی', name: 'انرژی زا', icon: '⚡' },
    { id: 11, business: 'نوشیدنی', name: 'آبمیوه', icon: '🧃' },
    { id: 12, business: 'نوشیدنی', name: 'مالت', icon: '🍺' },
    { id: 13, business: 'نوشیدنی', name: 'آب', icon: '💧' },
    { id: 14, business: 'قنادی', name: 'بار', icon: '🍫' },
    { id: 15, business: 'قنادی', name: 'شکلات', icon: '🍬' },
    { id: 16, business: 'قنادی', name: 'کرم قنادی', icon: '🧁' },
    { id: 17, business: 'قنادی', name: 'آردی قنادی', icon: '🥐' },
    { id: 18, business: 'قنادی', name: 'پایه آبی', icon: '🍧' },
    { id: 19, business: 'کاپو', name: 'گوشتی کاپو', icon: '🥩' },
    { id: 20, business: 'کاپو', name: 'پیتزا', icon: '🍕' },
    { id: 21, business: 'کاپو', name: 'ساندویچ', icon: '🥪' },
    { id: 22, business: 'کاپو', name: 'نان پیتزا', icon: '🫓' },
    { id: 23, business: 'سلامت', name: 'تغذیه کودک', icon: '🍼' },
    { id: 24, business: 'سلامت', name: 'سلینو', icon: '🌾' },
    { id: 25, business: 'سلامت', name: 'قهوه', icon: '☕' },
    { id: 26, business: 'سلامت', name: 'کاله پرو', icon: '💪' },
    { id: 27, business: 'بستنی', name: 'فله', icon: '🍨' },
    { id: 28, business: 'بستنی', name: 'اقتصادی', icon: '🍦' },
    { id: 29, business: 'بستنی', name: 'کیک دسر انجمادی', icon: '🎂' },
    { id: 30, business: 'بستنی', name: 'پریمیوم', icon: '✨' },
    { id: 31, business: 'غذای آماده', name: 'کنتاکی', icon: '🍗' },
    { id: 32, business: 'غذای آماده', name: 'برگر و بیف', icon: '🍔' },
    { id: 33, business: 'غذای آماده', name: 'مرغ', icon: '🍖' },
    { id: 34, business: 'غذای آماده', name: 'دونر', icon: '🥙' },
    { id: 35, business: 'غذای آماده', name: 'سیب زمینی', icon: '🍟' },
    { id: 36, business: 'غذای آماده', name: 'سس', icon: '🥫' },
    { id: 37, business: 'غذای آماده', name: 'سوسیس و بلونیا', icon: '🌭' },
    { id: 38, business: 'غذای آماده', name: 'غذای دریایی', icon: '🐟' },
    { id: 39, business: 'غذای آماده', name: 'فینگر فود و اسنک', icon: '🌮' },
    { id: 40, business: 'غذای آماده', name: 'سبزیجات', icon: '🥦' },
    { id: 41, business: 'لبنیات', name: 'لبنیات عمومی', icon: '🥛' },
    { id: 42, business: 'کاپو', name: 'خمیر آشپزی و شیرینی', icon: '🥐' },
    { id: 43, business: 'کاپو', name: 'خمیر پیراشکی', icon: '🥟' },
    { id: 44, business: 'کاپو', name: 'دیپ و حمص', icon: '🫕' },
    { id: 45, business: 'کاپو', name: 'سالاد الویه', icon: '🥗' },
    { id: 46, business: 'کاپو', name: 'اسنک و تنقلات', icon: '🍿' },
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
        flushPendingReports();

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
                    <button class="btn-list-report" title="ثبت اصلاحیه کالا" onclick="event.stopPropagation(); openReportModalForProduct(${idx})">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
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

/* ==========================================================================
   Product Issue Reporting & Replacement Suggestion Subsystem (Survey Flow)
   ========================================================================== */

// Configurable Webhook URL for Google Sheets / Google Apps Script
const REPORT_WEBHOOK_URL = window.SOLICO_REPORT_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbw9Tgu6HZfVz0-HWLOJ-c8oRysY515Oi5sLWaLvuoQCUYg17QtW2wmCtiRi7s_AbP__HA/exec';
const PENDING_REPORTS_KEY = 'solico_tmr_pending_reports';

let activeReportProduct = null;
let currentReportCategory = null; // 'WRONG_CONTENT' | 'WRONG_CATEGORY' | 'WRONG_IMAGE' | 'DISCONTINUED' | 'OTHER'
let currentContentChapter = 'chap_basic'; // 'chap_basic' | 'chap_pitch' | 'chap_ops' | 'chap_nutrition' | 'chap_negotiation'
let isReportModalOpen = false;
let currentReportImage = {
    hasImage: false,
    mimeType: '',
    filename: '',
    base64Data: '',
    dataUrl: ''
};

/**
 * Toast Notification System
 */
function showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('appToastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `app-toast ${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'warning') icon = '⚠️';
    if (type === 'error') icon = '❌';

    toast.innerHTML = `<span style="font-size:1.1rem; line-height:1;">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = '0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Opens report modal for a product at specific index in currentProducts.
 */
function openReportModalForProduct(index) {
    if (index >= 0 && index < currentProducts.length) {
        currentIndex = index;
        openReportModal(currentProducts[index]);
    }
}

/**
 * Opens the RTL Bottom-Sheet Modal and displays Step 1 (Survey Categories).
 */
function openReportModal(product = null) {
    const p = product || (currentProducts && currentProducts[currentIndex]);
    if (!p) {
        showToast('محصولی برای گزارش انتخاب نشده است.', 'warning');
        return;
    }

    activeReportProduct = p;
    currentReportCategory = null;
    currentContentChapter = 'chap_basic';
    isReportModalOpen = true;

    // Apply product BU theme to sheet if applicable
    if (p.business) {
        applyTheme(p.business);
    }

    // 1. Populate auto-detected product banner
    const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\'><text x=\'50%\' y=\'50%\' font-size=\'10\' text-anchor=\'middle\' fill=\'%23888\'>بدون تصویر</text></svg>`;
    const bannerThumb = document.getElementById('repBannerThumb');
    const bannerTitle = document.getElementById('repBannerTitle');
    const bannerSku = document.getElementById('repBannerSku');
    const bannerCat = document.getElementById('repBannerCategory');

    if (bannerThumb) bannerThumb.src = p.image || fallbackSvg;
    if (bannerTitle) bannerTitle.innerText = p.title || p.product_name_raw || 'بدون نام';
    if (bannerSku) bannerSku.innerText = `SKU: ${p.sku || 'نامشخص'}`;
    if (bannerCat) bannerCat.innerText = `${p.business || '-'} › ${p.category_name || '-'}`;

    // Reset views: Show Step 1, hide others
    const viewCat = document.getElementById('repViewCategories');
    const viewDet = document.getElementById('repViewDetails');
    const viewSuc = document.getElementById('repViewSuccessPrompt');
    const btnBack = document.getElementById('btnRepSheetBack');

    if (viewCat) viewCat.style.display = 'block';
    if (viewDet) viewDet.style.display = 'none';
    if (viewSuc) viewSuc.style.display = 'none';
    if (btnBack) btnBack.style.display = 'none';

    // Reset all inputs
    resetAllReportInputs();

    // Reset submit button state
    setSubmitButtonState('idle');

    // Open Bottom Sheet
    const overlay = document.getElementById('reportModalOverlay');
    const sheet = document.getElementById('reportSheet');
    if (overlay && sheet) {
        overlay.classList.add('active');
        sheet.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    // Flush any pending reports in background
    flushPendingReports();
}

/**
 * Resets all input fields across all detail subforms.
 */
function resetAllReportInputs() {
    const problemInput = document.getElementById('repProblemText');
    if (problemInput) problemInput.value = '';

    // Basic
    ['Title', 'Weights', 'Sku', 'Slogan'].forEach(f => {
        const el = document.getElementById(`repInput${f}`);
        if (el) el.value = '';
    });

    // Nutrition
    ['Energy', 'Protein', 'Fat', 'Sugar', 'Salt', 'ShelfLife'].forEach(f => {
        const el = document.getElementById(`repInput${f}`);
        if (el) el.value = '';
    });
    const inIng = document.getElementById('repInputIngredients');
    if (inIng) inIng.value = '';

    // Competitor
    const inComp = document.getElementById('repInputCompetitor');
    if (inComp) inComp.value = '';

    // Category
    const customCat = document.getElementById('repCustomCategoryInput');
    if (customCat) customCat.value = '';

    // Image
    removeReportImage();

    // Discontinued & Other
    const chkDisc = document.getElementById('repCheckDiscontinued');
    if (chkDisc) chkDisc.checked = true;
    const inDisc = document.getElementById('repInputDiscontinuedNotes');
    if (inDisc) inDisc.value = '';
    const inOther = document.getElementById('repInputOtherNotes');
    if (inOther) inOther.value = '';
}

/**
 * Closes the Bottom-Sheet Modal.
 */
function closeReportModal() {
    const overlay = document.getElementById('reportModalOverlay');
    const sheet = document.getElementById('reportSheet');
    if (overlay && sheet) {
        overlay.classList.remove('active');
        sheet.classList.remove('open');
        document.body.style.overflow = '';
    }
    isReportModalOpen = false;
    activeReportProduct = null;
    currentReportCategory = null;
    removeReportImage();
}

function handleReportOverlayClick(e) {
    if (e.target && e.target.id === 'reportModalOverlay') {
        closeReportModal();
    }
}

/**
 * Step 1 -> Step 2: Transition when user selects a report category.
 */
function selectReportCategory(categoryKey) {
    const p = activeReportProduct;
    if (!p) return;

    currentReportCategory = categoryKey;

    const viewCat = document.getElementById('repViewCategories');
    const viewDet = document.getElementById('repViewDetails');
    const viewSuc = document.getElementById('repViewSuccessPrompt');
    const btnBack = document.getElementById('btnRepSheetBack');
    const detailTitle = document.getElementById('repDetailTitle');
    const scrollContainer = document.getElementById('repSheetScroll');

    if (viewCat) viewCat.style.display = 'none';
    if (viewDet) viewDet.style.display = 'block';
    if (viewSuc) viewSuc.style.display = 'none';
    if (btnBack) btnBack.style.display = 'inline-flex';
    if (scrollContainer) scrollContainer.scrollTop = 0;

    // Hide all detail sections
    ['section_WRONG_CONTENT', 'section_WRONG_CATEGORY', 'section_WRONG_IMAGE', 'section_DISCONTINUED', 'section_OTHER'].forEach(id => {
        const sec = document.getElementById(id);
        if (sec) sec.style.display = 'none';
    });

    // Show selected section and populate contextual data
    if (categoryKey === 'WRONG_CONTENT') {
        if (detailTitle) detailTitle.innerText = 'اصلاح متن و محتوای محصول';
        const sec = document.getElementById('section_WRONG_CONTENT');
        if (sec) sec.style.display = 'block';

        populateContentForm(p);
        switchContentChapter(currentContentChapter || 'chap_basic');

    } else if (categoryKey === 'WRONG_CATEGORY') {
        if (detailTitle) detailTitle.innerText = 'اصلاح گروه کسب‌وکار یا دسته‌بندی';
        const sec = document.getElementById('section_WRONG_CATEGORY');
        if (sec) sec.style.display = 'block';

        populateCategorySubform(p);

    } else if (categoryKey === 'WRONG_IMAGE') {
        if (detailTitle) detailTitle.innerText = 'جایگزینی یا ارسال تصویر محصول';
        const sec = document.getElementById('section_WRONG_IMAGE');
        if (sec) sec.style.display = 'block';

        populateImageSubform(p);

    } else if (categoryKey === 'DISCONTINUED') {
        if (detailTitle) detailTitle.innerText = 'گزارش توقف تولید محصول (Discontinued)';
        const sec = document.getElementById('section_DISCONTINUED');
        if (sec) sec.style.display = 'block';

        const chk = document.getElementById('repCheckDiscontinued');
        if (chk) chk.checked = true;

    } else if (categoryKey === 'OTHER') {
        if (detailTitle) detailTitle.innerText = 'سایر پیشنهادات و نکات تکمیلی';
        const sec = document.getElementById('section_OTHER');
        if (sec) sec.style.display = 'block';
    }

    setSubmitButtonState('idle');
}

/**
 * Navigation back to Step 1 (Survey Categories).
 */
function goBackToCategoriesView() {
    const viewCat = document.getElementById('repViewCategories');
    const viewDet = document.getElementById('repViewDetails');
    const viewSuc = document.getElementById('repViewSuccessPrompt');
    const btnBack = document.getElementById('btnRepSheetBack');
    const scrollContainer = document.getElementById('repSheetScroll');

    if (viewCat) viewCat.style.display = 'block';
    if (viewDet) viewDet.style.display = 'none';
    if (viewSuc) viewSuc.style.display = 'none';
    if (btnBack) btnBack.style.display = 'none';
    if (scrollContainer) scrollContainer.scrollTop = 0;

    currentReportCategory = null;
}

/**
 * Switching content chapters in Step 2 for WRONG_CONTENT.
 */
function switchContentChapter(chapId) {
    currentContentChapter = chapId;

    // Update tab button styles
    document.querySelectorAll('.rep-chap-btn').forEach(btn => {
        if (btn.getAttribute('data-chap') === chapId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update pane visibility
    const panes = ['chap_basic', 'chap_pitch', 'chap_ops', 'chap_nutrition', 'chap_negotiation'];
    panes.forEach(paneName => {
        const pane = document.getElementById(`pane_${paneName}`);
        if (pane) {
            if (paneName === chapId) {
                pane.style.display = 'block';
                pane.classList.add('active');
            } else {
                pane.style.display = 'none';
                pane.classList.remove('active');
            }
        }
    });
}

/**
 * Populates all WRONG_CONTENT sections and bullets from active product.
 */
function populateContentForm(p) {
    // 1. Basic Info Badges & Inputs
    const setBadge = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerText = val || '-';
    };

    setBadge('repCurTitleBadge', p.title || p.product_name_raw);
    setBadge('repCurWeightsBadge', p.weights);
    setBadge('repCurSkuBadge', p.sku);
    setBadge('repCurSloganBadge', p.slogan);

    // 2. Sales Pitch Bullets
    renderBulletInputs('claims', p.claims);
    renderBulletInputs('targets', p.targets);

    // 3. TMR Ops Bullets
    renderBulletInputs('tips', p.tips);
    renderBulletInputs('sampling', p.sampling);
    renderBulletInputs('plano', p.plano);

    // 4. Nutrition
    const setCurNutri = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerText = `(${val || '-'})`;
    };
    setCurNutri('repCurEnergy', p.energy);
    setCurNutri('repCurProtein', p.protein ? `${p.protein}g` : '-');
    setCurNutri('repCurFat', p.fat ? `${p.fat}g` : '-');
    setCurNutri('repCurSugar', p.sugar ? `${p.sugar}g` : '-');
    setCurNutri('repCurSalt', p.salt ? `${p.salt}g` : '-');
    setCurNutri('repCurShelfLife', p.shelf_life);
    setBadge('repCurIngredientsBadge', p.ingredients);

    // 5. Negotiation
    setBadge('repCurCompetitorBadge', p.competitor);
    renderBulletInputs('negotiation', p.negotiation);
}

/**
 * Converts bullet arrays or pipe-strings to individual isolated input boxes.
 */
function renderBulletInputs(field, data) {
    const container = document.getElementById(`repBulletsList_${field}`);
    if (!container) return;

    let items = [];
    if (Array.isArray(data)) {
        items = data.map(s => String(s).trim()).filter(Boolean);
    } else if (typeof data === 'string' && data.trim()) {
        items = data.split(/[\r\n|]+/).map(s => s.trim()).filter(Boolean);
    }

    if (items.length === 0) {
        items = [''];
    }

    container.innerHTML = items.map((val, idx) => `
        <div class="rep-bullet-item">
            <span class="rep-bullet-num">مورد ${idx + 1}</span>
            <input type="text" class="rep-input rep-bullet-input" value="${escapeHtml(val)}" placeholder="متن سطر ${idx + 1}...">
            <button type="button" class="btn-remove-bullet" onclick="removeBulletInput('${field}', this)" title="حذف این سطر">✕</button>
        </div>
    `).join('');
}

/**
 * Dynamically appends a new bullet item to the field's container.
 */
function addBulletInput(field) {
    const container = document.getElementById(`repBulletsList_${field}`);
    if (!container) return;

    const count = container.querySelectorAll('.rep-bullet-item').length + 1;
    const item = document.createElement('div');
    item.className = 'rep-bullet-item';
    item.innerHTML = `
        <span class="rep-bullet-num">مورد ${count}</span>
        <input type="text" class="rep-input rep-bullet-input" value="" placeholder="متن سطر ${count}...">
        <button type="button" class="btn-remove-bullet" onclick="removeBulletInput('${field}', this)" title="حذف این سطر">✕</button>
    `;
    container.appendChild(item);

    const input = item.querySelector('input');
    if (input) input.focus();
}

/**
 * Removes a bullet item and re-indexes the numbers.
 */
function removeBulletInput(field, btn) {
    const container = document.getElementById(`repBulletsList_${field}`);
    if (!container) return;

    const item = btn.closest('.rep-bullet-item');
    if (item) item.remove();

    // Renumber remaining items
    const items = container.querySelectorAll('.rep-bullet-item');
    if (items.length === 0) {
        // Always keep at least one row
        addBulletInput(field);
        return;
    }

    items.forEach((it, idx) => {
        const num = it.querySelector('.rep-bullet-num');
        if (num) num.innerText = `مورد ${idx + 1}`;
    });
}

/**
 * Collects values from individual bullet input boxes and joins with ' | '.
 */
function collectBulletValues(field) {
    const container = document.getElementById(`repBulletsList_${field}`);
    if (!container) return '';

    const inputs = container.querySelectorAll('.rep-bullet-input');
    const values = [];
    inputs.forEach(inp => {
        const v = inp.value.trim();
        if (v) values.push(v);
    });

    return values.join(' | ');
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/**
 * Subform 1: Populate Category & Cascading Dropdowns
 */
function populateCategorySubform(p) {
    const curCatDisplay = document.getElementById('repCurCatDisplay');
    const buSelect = document.getElementById('repSelectBU');
    const catSelect = document.getElementById('repSelectCategory');
    const customWrap = document.getElementById('repCustomCategoryWrap');
    const customInput = document.getElementById('repCustomCategoryInput');

    if (curCatDisplay) {
        curCatDisplay.innerText = `${p.business || 'نامشخص'} › ${p.category_name || 'نامشخص'} (شناسه: ${p.category_id || '-'})`;
    }

    if (!buSelect || !catSelect) return;

    // Populate BUs
    buSelect.innerHTML = `
        <option value="">-- انتخاب واحد تجاری صحیح --</option>
        ${BUSINESS_LIST.map(b => `<option value="${b.name}">${b.icon} ${b.name}</option>`).join('')}
        <option value="OTHER">سایر / گروه جدید (Other)</option>
    `;

    if (p.business) {
        buSelect.value = p.business;
    }

    function syncCategories() {
        const selectedBU = buSelect.value;
        if (selectedBU === 'OTHER') {
            catSelect.innerHTML = `<option value="OTHER">سایر / دسته‌بندی جدید (Other)</option>`;
            catSelect.value = 'OTHER';
            if (customWrap) customWrap.style.display = 'block';
            return;
        }

        const categoriesInBU = (rawCategoryMap || []).filter(c => c.business === selectedBU);
        catSelect.innerHTML = `
            <option value="">-- انتخاب دسته‌بندی صحیح --</option>
            ${categoriesInBU.map(c => `<option value="${c.category_id}" data-name="${c.category_name}">${c.category_name}</option>`).join('')}
            <option value="OTHER">سایر / دسته‌بندی جدید (Other)</option>
        `;

        if (p.business === selectedBU && p.category_id) {
            catSelect.value = String(p.category_id);
        }

        checkCustomField();
    }

    function checkCustomField() {
        if (!customWrap) return;
        if (buSelect.value === 'OTHER' || catSelect.value === 'OTHER') {
            customWrap.style.display = 'block';
        } else {
            customWrap.style.display = 'none';
        }
    }

    buSelect.onchange = syncCategories;
    catSelect.onchange = checkCustomField;

    syncCategories();
    if (customInput) customInput.value = '';
}

/**
 * Subform 2: Populate Image Preview & Upload Logic
 */
function populateImageSubform(p) {
    const curImg = document.getElementById('repCurImgPreview');
    const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\'><text x=\'50%\' y=\'50%\' font-size=\'10\' text-anchor=\'middle\' fill=\'%23888\'>بدون تصویر</text></svg>`;
    if (curImg) curImg.src = p.image || fallbackSvg;
    removeReportImage();
}

/**
 * Client-Side Image Compression using HTML5 Canvas
 * Resizes max 800x800, JPEG quality 0.75, lightweight <150KB
 */
function compressImageFile(file, maxWidth = 800, maxHeight = 800, quality = 0.75) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > maxWidth || height > maxHeight) {
                    if (width / height > maxWidth / maxHeight) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    } else {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');

                resolve({
                    dataUrl,
                    base64Data,
                    mimeType: 'image/jpeg',
                    width,
                    height,
                    approxSizeKb: Math.round(base64Data.length * 0.75 / 1024)
                });
            };
            img.onerror = () => reject(new Error('امکان بارگذاری تصویر وجود ندارد.'));
            img.src = readerEvent.target.result;
        };
        reader.onerror = () => reject(new Error('امکان خواندن فایل وجود ندارد.'));
        reader.readAsDataURL(file);
    });
}

async function handleReportImageSelect(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    try {
        showToast('در حال بهینه‌سازی و فشرده‌سازی تصویر...', 'info', 2000);
        const compressed = await compressImageFile(file);

        currentReportImage = {
            hasImage: true,
            mimeType: compressed.mimeType,
            filename: `product_${activeReportProduct ? activeReportProduct.id : 'unknown'}_replacement.jpg`,
            base64Data: compressed.base64Data,
            dataUrl: compressed.dataUrl
        };

        const previewImg = document.getElementById('repNewImgPreview');
        const uploadPrompt = document.getElementById('repUploadPrompt');
        const previewWrap = document.getElementById('repUploadPreviewWrap');

        if (previewImg) previewImg.src = compressed.dataUrl;
        if (uploadPrompt) uploadPrompt.style.display = 'none';
        if (previewWrap) previewWrap.style.display = 'flex';

        showToast(`تصویر با موفقیت بارگذاری شد (${compressed.approxSizeKb} KB)`, 'success', 2500);
    } catch (err) {
        showToast(`خطا در بارگذاری تصویر: ${err.message}`, 'error');
        removeReportImage();
    }
}

function removeReportImage() {
    currentReportImage = {
        hasImage: false,
        mimeType: '',
        filename: '',
        base64Data: '',
        dataUrl: ''
    };
    const fileInput = document.getElementById('repImageFileInput');
    if (fileInput) fileInput.value = '';
    const uploadPrompt = document.getElementById('repUploadPrompt');
    const previewWrap = document.getElementById('repUploadPreviewWrap');
    if (uploadPrompt) uploadPrompt.style.display = 'flex';
    if (previewWrap) previewWrap.style.display = 'none';
}

/**
 * Offline Queue Utilities
 */
function getPendingReports() {
    try {
        const raw = localStorage.getItem(PENDING_REPORTS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error('Error reading offline pending reports:', e);
        return [];
    }
}

function savePendingReports(reports) {
    try {
        localStorage.setItem(PENDING_REPORTS_KEY, JSON.stringify(reports));
    } catch (e) {
        console.error('Error saving offline pending reports:', e);
    }
}

function queueOfflineReport(payload) {
    const queue = getPendingReports();
    queue.push(payload);
    savePendingReports(queue);
    console.log(`[TMR Report] Queued report offline (${payload.report_id}). Total in queue: ${queue.length}`);
}

/**
 * Flushes queued offline reports when back online.
 */
async function flushPendingReports() {
    if (!navigator.onLine) return;
    const isPlaceholderUrl = !REPORT_WEBHOOK_URL || REPORT_WEBHOOK_URL.includes('placeholder');
    if (isPlaceholderUrl) return;

    const queue = getPendingReports();
    if (!queue || queue.length === 0) return;

    console.log(`[TMR Report] Attempting to flush ${queue.length} offline report(s)...`);
    const remaining = [];
    let sentCount = 0;

    for (const report of queue) {
        try {
            const response = await fetch(REPORT_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(report)
            });

            if (response.ok) {
                sentCount++;
            } else {
                remaining.push(report);
            }
        } catch (err) {
            remaining.push(report);
        }
    }

    savePendingReports(remaining);
    if (sentCount > 0) {
        showToast(`${sentCount} گزارش ثبت‌شده در حالت آفلاین، با موفقیت به سرور ارسال گردید.`, 'success', 4000);
    }
}

window.addEventListener('online', () => {
    showToast('اتصال اینترنت برقرار شد. همگام‌سازی گزارش‌ها...', 'info', 2000);
    flushPendingReports();
});

/**
 * Dispatches payload to Webhook or queues offline if network fails.
 */
async function sendReportPayload(payload) {
    if (!navigator.onLine) {
        queueOfflineReport(payload);
        return {
            success: true,
            offline: true,
            message: 'دستگاه در حالت آفلاین است. گزارش شما در حافظه ذخیره شد و به محض اتصال به اینترنت ارسال خواهد شد.'
        };
    }

    const isPlaceholderUrl = !REPORT_WEBHOOK_URL || REPORT_WEBHOOK_URL.includes('placeholder');

    if (isPlaceholderUrl) {
        queueOfflineReport(payload);
        console.log('[TMR Report System - Demo Mode] Payload generated & saved locally:', payload);
        return {
            success: true,
            offline: false,
            isDemo: true,
            message: 'گزارش اصلاح با موفقیت ثبت شد (حالت آزمایشی / ذخیره محلی).'
        };
    }

    try {
        const response = await fetch(REPORT_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            return {
                success: true,
                offline: false,
                message: 'گزارش اصلاح با موفقیت برای تیم بازاریابی و IT ارسال شد.'
            };
        } else {
            throw new Error(`Server returned HTTP ${response.status}`);
        }
    } catch (err) {
        console.warn('[TMR Report] Network transmission failed, queueing offline:', err);
        queueOfflineReport(payload);
        return {
            success: true,
            offline: true,
            message: 'ارسال با خطای شبکه مواجه شد. گزارش در صف آفلاین ذخیره گردید و مجدداً تلاش خواهد شد.'
        };
    }
}

function setSubmitButtonState(state) {
    const btn = document.getElementById('btnSubmitReport');
    const icon = document.getElementById('repSubmitIcon');
    const text = document.getElementById('repSubmitText');
    if (!btn || !text || !icon) return;

    if (state === 'loading') {
        btn.disabled = true;
        icon.innerText = '⏳';
        text.innerText = 'در حال ارسال گزارش...';
    } else if (state === 'success') {
        btn.disabled = true;
        icon.innerText = '✅';
        text.innerText = 'ارسال با موفقیت انجام شد';
    } else {
        btn.disabled = false;
        icon.innerText = '📤';
        text.innerText = 'ارسال این گزارش';
    }
}

/**
 * Submits the single active report and transitions to Step 3 (Survey Loop Prompt).
 */
async function submitSingleReport() {
    if (!activeReportProduct) {
        showToast('خطا: محصولی انتخاب نشده است.', 'error');
        return;
    }

    if (!currentReportCategory) {
        showToast('لطفاً نوع گزارش را مشخص فرمایید.', 'warning');
        return;
    }

    const p = activeReportProduct;
    const problemText = (document.getElementById('repProblemText')?.value || '').trim();

    const payload = {
        report_id: `REP-${Date.now()}-${p.id || '0'}`,
        timestamp: new Date().toISOString(),
        status: 'PENDING',
        product_id: Number(p.id) || p.id,
        sku: p.sku || '',
        product_name_raw: p.title || p.product_name_raw || '',
        current_business_unit: p.business || '',
        current_category_id: Number(p.category_id) || (p.category_id !== undefined ? p.category_id : null),
        current_category_name: p.category_name || '',
        issue_types: [currentReportCategory],
        content_chapter: currentReportCategory === 'WRONG_CONTENT' ? currentContentChapter : null,
        problem_text: problemText,
        target_csv_columns: [],
        current_values_json: {},
        suggested_replacements_json: {},
        image_replacement: {
            has_image: currentReportCategory === 'WRONG_IMAGE' && currentReportImage.hasImage,
            mime_type: currentReportImage.mimeType,
            filename: currentReportImage.filename,
            base64_data: currentReportImage.base64Data
        }
    };

    let hasValidInput = false;

    // Collect data per category
    if (currentReportCategory === 'WRONG_CONTENT') {
        // Chapter 1: Basic
        const inTitle = (document.getElementById('repInputTitle')?.value || '').trim();
        const inWeights = (document.getElementById('repInputWeights')?.value || '').trim();
        const inSku = (document.getElementById('repInputSku')?.value || '').trim();
        const inSlogan = (document.getElementById('repInputSlogan')?.value || '').trim();

        if (inTitle) {
            payload.target_csv_columns.push('product_name_raw');
            payload.current_values_json['product_name_raw'] = p.title || p.product_name_raw;
            payload.suggested_replacements_json['product_name_raw'] = inTitle;
            hasValidInput = true;
        }
        if (inWeights) {
            payload.target_csv_columns.push('weights');
            payload.current_values_json['weights'] = p.weights;
            payload.suggested_replacements_json['weights'] = inWeights;
            hasValidInput = true;
        }
        if (inSku) {
            payload.target_csv_columns.push('sku');
            payload.current_values_json['sku'] = p.sku;
            payload.suggested_replacements_json['sku'] = inSku;
            hasValidInput = true;
        }
        if (inSlogan) {
            payload.target_csv_columns.push('slogan');
            payload.current_values_json['slogan'] = p.slogan || '';
            payload.suggested_replacements_json['slogan'] = inSlogan;
            hasValidInput = true;
        }

        // Chapter 2: Pitch (Isolated bullet boxes)
        const claimsVal = collectBulletValues('claims');
        const origClaims = Array.isArray(p.claims) ? p.claims.join(' | ') : (p.claims || '');
        if (claimsVal && claimsVal !== origClaims) {
            payload.target_csv_columns.push('claims');
            payload.current_values_json['claims'] = origClaims;
            payload.suggested_replacements_json['claims'] = claimsVal;
            hasValidInput = true;
        }

        const targetsVal = collectBulletValues('targets');
        const origTargets = Array.isArray(p.targets) ? p.targets.join(' | ') : (p.targets || '');
        if (targetsVal && targetsVal !== origTargets) {
            payload.target_csv_columns.push('targets');
            payload.current_values_json['targets'] = origTargets;
            payload.suggested_replacements_json['targets'] = targetsVal;
            hasValidInput = true;
        }

        // Chapter 3: Ops (Isolated bullet boxes)
        const tipsVal = collectBulletValues('tips');
        const origTips = Array.isArray(p.tips) ? p.tips.join(' | ') : (p.tips || '');
        if (tipsVal && tipsVal !== origTips) {
            payload.target_csv_columns.push('tips');
            payload.current_values_json['tips'] = origTips;
            payload.suggested_replacements_json['tips'] = tipsVal;
            hasValidInput = true;
        }

        const samplingVal = collectBulletValues('sampling');
        const origSampling = Array.isArray(p.sampling) ? p.sampling.join(' | ') : (p.sampling || '');
        if (samplingVal && samplingVal !== origSampling) {
            payload.target_csv_columns.push('sampling');
            payload.current_values_json['sampling'] = origSampling;
            payload.suggested_replacements_json['sampling'] = samplingVal;
            hasValidInput = true;
        }

        const planoVal = collectBulletValues('plano');
        const origPlano = Array.isArray(p.plano) ? p.plano.join(' | ') : (p.plano || '');
        if (planoVal && planoVal !== origPlano) {
            payload.target_csv_columns.push('plano');
            payload.current_values_json['plano'] = origPlano;
            payload.suggested_replacements_json['plano'] = planoVal;
            hasValidInput = true;
        }

        // Chapter 4: Nutrition
        const nutriMap = [
            { col: 'energy', id: 'repInputEnergy' },
            { col: 'protein', id: 'repInputProtein' },
            { col: 'fat', id: 'repInputFat' },
            { col: 'sugar', id: 'repInputSugar' },
            { col: 'salt', id: 'repInputSalt' },
            { col: 'shelf_life', id: 'repInputShelfLife' }
        ];
        nutriMap.forEach(({ col, id }) => {
            const val = (document.getElementById(id)?.value || '').trim();
            if (val) {
                payload.target_csv_columns.push(col);
                payload.current_values_json[col] = p[col] || '';
                payload.suggested_replacements_json[col] = val;
                hasValidInput = true;
            }
        });

        const inIng = (document.getElementById('repInputIngredients')?.value || '').trim();
        if (inIng) {
            payload.target_csv_columns.push('ingredients');
            payload.current_values_json['ingredients'] = p.ingredients || '';
            payload.suggested_replacements_json['ingredients'] = inIng;
            hasValidInput = true;
        }

        // Chapter 5: Negotiation
        const inComp = (document.getElementById('repInputCompetitor')?.value || '').trim();
        if (inComp) {
            payload.target_csv_columns.push('competitor');
            payload.current_values_json['competitor'] = p.competitor || '';
            payload.suggested_replacements_json['competitor'] = inComp;
            hasValidInput = true;
        }

        const negVal = collectBulletValues('negotiation');
        const origNeg = Array.isArray(p.negotiation) ? p.negotiation.join(' | ') : (p.negotiation || '');
        if (negVal && negVal !== origNeg) {
            payload.target_csv_columns.push('negotiation');
            payload.current_values_json['negotiation'] = origNeg;
            payload.suggested_replacements_json['negotiation'] = negVal;
            hasValidInput = true;
        }

    } else if (currentReportCategory === 'WRONG_CATEGORY') {
        const buSelect = document.getElementById('repSelectBU');
        const catSelect = document.getElementById('repSelectCategory');
        const customCat = (document.getElementById('repCustomCategoryInput')?.value || '').trim();
        const selBU = buSelect?.value || '';
        const selCatVal = catSelect?.value || '';
        const selCatOption = catSelect?.selectedOptions ? catSelect.selectedOptions[0] : null;
        const selCatName = selCatOption ? selCatOption.getAttribute('data-name') || selCatVal : '';

        payload.target_csv_columns.push('category_id');
        payload.current_values_json['category_id'] = p.category_id;
        payload.current_values_json['business_unit'] = p.business;

        payload.suggested_replacements_json['business_unit'] = selBU;
        payload.suggested_replacements_json['category_id'] = (selCatVal && selCatVal !== 'OTHER') ? (Number(selCatVal) || selCatVal) : 'OTHER';
        payload.suggested_replacements_json['category_name'] = selCatName;
        payload.suggested_replacements_json['custom_category_other'] = customCat;

        if (selBU || selCatVal || customCat) {
            hasValidInput = true;
        }

    } else if (currentReportCategory === 'WRONG_IMAGE') {
        if (currentReportImage.hasImage) {
            payload.target_csv_columns.push('image_urls');
            payload.current_values_json['image_urls'] = p.image || '';
            hasValidInput = true;
        }

    } else if (currentReportCategory === 'DISCONTINUED') {
        const isDiscontinued = document.getElementById('repCheckDiscontinued')?.checked;
        const discNotes = (document.getElementById('repInputDiscontinuedNotes')?.value || '').trim();

        payload.target_csv_columns.push('status');
        payload.current_values_json['is_discontinued'] = false;
        payload.suggested_replacements_json['is_discontinued'] = Boolean(isDiscontinued);
        if (discNotes) {
            payload.suggested_replacements_json['discontinued_notes'] = discNotes;
        }
        hasValidInput = true;

    } else if (currentReportCategory === 'OTHER') {
        const otherNotes = (document.getElementById('repInputOtherNotes')?.value || '').trim();
        if (otherNotes) {
            payload.target_csv_columns.push('other_notes');
            payload.suggested_replacements_json['other_notes'] = otherNotes;
            hasValidInput = true;
        }
    }

    // Require either a suggested correction or an explanation
    if (!hasValidInput && !problemText) {
        showToast('لطفاً مقدار اصلاحی را وارد کرده یا در بخش توضیحات علت را بنویسید.', 'warning');
        return;
    }

    setSubmitButtonState('loading');

    try {
        const result = await sendReportPayload(payload);
        setSubmitButtonState('idle');

        // Transition to Step 3: Success & Survey Loop Prompt
        const viewCat = document.getElementById('repViewCategories');
        const viewDet = document.getElementById('repViewDetails');
        const viewSuc = document.getElementById('repViewSuccessPrompt');
        const btnBack = document.getElementById('btnRepSheetBack');
        const trackingText = document.getElementById('repSuccessTrackingText');
        const scrollContainer = document.getElementById('repSheetScroll');

        if (viewCat) viewCat.style.display = 'none';
        if (viewDet) viewDet.style.display = 'none';
        if (viewSuc) viewSuc.style.display = 'block';
        if (btnBack) btnBack.style.display = 'none';
        if (scrollContainer) scrollContainer.scrollTop = 0;

        if (trackingText) {
            trackingText.innerText = result.offline
                ? `گزارش در حافظه آفلاین ثبت شد (کد: ${payload.report_id}) و پس از اتصال اینترنت ارسال خواهد شد.`
                : `کد پیگیری: ${payload.report_id} | اطلاعات برای تیم بازاریابی و IT ارسال شد.`;
        }

        showToast('گزارش با موفقیت ثبت گردید.', 'success', 3000);

    } catch (err) {
        setSubmitButtonState('idle');
        showToast(`خطا در ثبت گزارش: ${err.message}`, 'error');
    }
}

// Backward-compatible alias
const submitReport = submitSingleReport;

/**
 * Survey Loop: User clicks "بله، ثبت گزارش دیگر برای همین محصول"
 * Resets form fields and returns to Step 1 without closing or changing product.
 */
function startAnotherReportForCurrentProduct() {
    const p = activeReportProduct;
    if (!p) {
        closeReportModal();
        return;
    }

    currentReportCategory = null;
    currentContentChapter = 'chap_basic';
    resetAllReportInputs();

    const viewCat = document.getElementById('repViewCategories');
    const viewDet = document.getElementById('repViewDetails');
    const viewSuc = document.getElementById('repViewSuccessPrompt');
    const btnBack = document.getElementById('btnRepSheetBack');
    const scrollContainer = document.getElementById('repSheetScroll');

    if (viewCat) viewCat.style.display = 'block';
    if (viewDet) viewDet.style.display = 'none';
    if (viewSuc) viewSuc.style.display = 'none';
    if (btnBack) btnBack.style.display = 'none';
    if (scrollContainer) scrollContainer.scrollTop = 0;

    showToast('لطفاً بخش جدید را جهت گزارش انتخاب فرمایید.', 'info', 2000);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isReportModalOpen) {
        closeReportModal();
        return;
    }
    if (isReportModalOpen) return;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    if (!isUnlocked) return;
    const flashcardView = document.getElementById('viewFlashcards');
    if (!flashcardView || !flashcardView.classList.contains('active')) return;
    if (viewMode !== 'card') return;

    if (e.code === 'Space') { e.preventDefault(); flipCard(); }
    if (e.code === 'ArrowRight' || e.code === 'ArrowDown') nextCard();
    if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') prevCard();
});

init();