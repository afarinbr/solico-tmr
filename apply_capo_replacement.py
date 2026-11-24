# -*- coding: utf-8 -*-
"""
Solico Group - Capo Business Unit Full Replacement & Integration Script
Replaces old Capo products with 85 new normalized & AI-enriched Capo products.
Updates categories to 9 Capo categories (46 total categories).
Syncs to MVP_Flashcard, solico-tmr-flashcards, and dist folders.
"""

import csv
import json
import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"D:\Solico\TM Skills\MVP_Flashcard"
GIT_DIR = r"D:\Solico\TM Skills\MVP_Flashcard\solico-tmr-flashcards"
DIST_DIR = r"D:\Solico\TM Skills\MVP_Flashcard\dist"
CAPO_NEW_CSV = r"D:\Solico\TM Skills\Content\capo_generated_flashcards.csv"

# 1. Define the complete 46 categories taxonomy
CATEGORIES_46 = [
    {"category_id": "1",  "category_name": "پنیر",                 "business": "لبنیات",    "icon": "🧀"},
    {"category_id": "2",  "category_name": "آژیل",                 "business": "لبنیات",    "icon": "🥜"},
    {"category_id": "3",  "category_name": "دسر",                  "business": "لبنیات",    "icon": "🍮"},
    {"category_id": "4",  "category_name": "چربی",                 "business": "لبنیات",    "icon": "🧈"},
    {"category_id": "5",  "category_name": "کاتلا",                "business": "لبنیات",    "icon": "🍯"},
    {"category_id": "6",  "category_name": "شیر",                  "business": "لبنیات",    "icon": "🥛"},
    {"category_id": "7",  "category_name": "ماست",                 "business": "لبنیات",    "icon": "🥣"},
    {"category_id": "8",  "category_name": "CSD_CRB",              "business": "نوشیدنی",   "icon": "🥤"},
    {"category_id": "9",  "category_name": "دوغ",                  "business": "نوشیدنی",   "icon": "🍶"},
    {"category_id": "10", "category_name": "انرژی زا",             "business": "نوشیدنی",   "icon": "⚡"},
    {"category_id": "11", "category_name": "آبمیوه",               "business": "نوشیدنی",   "icon": "🧃"},
    {"category_id": "12", "category_name": "مالت",                 "business": "نوشیدنی",   "icon": "🍺"},
    {"category_id": "13", "category_name": "آب",                   "business": "نوشیدنی",   "icon": "💧"},
    {"category_id": "14", "category_name": "بار",                  "business": "قنادی",     "icon": "🍫"},
    {"category_id": "15", "category_name": "شکلات",                "business": "قنادی",     "icon": "🍬"},
    {"category_id": "16", "category_name": "کرم قنادی",            "business": "قنادی",     "icon": "🧁"},
    {"category_id": "17", "category_name": "آردی قنادی",           "business": "قنادی",     "icon": "🥐"},
    {"category_id": "18", "category_name": "پایه آبی",             "business": "قنادی",     "icon": "🍧"},
    
    # 9 Capo Categories
    {"category_id": "19", "category_name": "گوشتی کاپو",           "business": "کاپو",      "icon": "🥩"},
    {"category_id": "20", "category_name": "پیتزا",                 "business": "کاپو",      "icon": "🍕"},
    {"category_id": "21", "category_name": "ساندویچ",               "business": "کاپو",      "icon": "🥪"},
    {"category_id": "22", "category_name": "نان پیتزا",            "business": "کاپو",      "icon": "🫓"},
    
    {"category_id": "23", "category_name": "تغذیه کودک",           "business": "سلامت",     "icon": "🍼"},
    {"category_id": "24", "category_name": "سلینو",                "business": "سلامت",     "icon": "🌾"},
    {"category_id": "25", "category_name": "قهوه",                 "business": "سلامت",     "icon": "☕"},
    {"category_id": "26", "category_name": "کاله پرو",              "business": "سلامت",     "icon": "💪"},
    {"category_id": "27", "category_name": "فله",                  "business": "بستنی",     "icon": "🍨"},
    {"category_id": "28", "category_name": "اقتصادی",              "business": "بستنی",     "icon": "🍦"},
    {"category_id": "29", "category_name": "کیک دسر انجمادی",      "business": "بستنی",     "icon": "🎂"},
    {"category_id": "30", "category_name": "پریمیوم",              "business": "بستنی",     "icon": "✨"},
    {"category_id": "31", "category_name": "کنتاکی",               "business": "غذای آماده", "icon": "🍗"},
    {"category_id": "32", "category_name": "برگر و بیف",           "business": "غذای آماده", "icon": "🍔"},
    {"category_id": "33", "category_name": "مرغ",                  "business": "غذای آماده", "icon": "🍖"},
    {"category_id": "34", "category_name": "دونر",                 "business": "غذای آماده", "icon": "🥙"},
    {"category_id": "35", "category_name": "سیب زمینی",           "business": "غذای آماده", "icon": "🍟"},
    {"category_id": "36", "category_name": "سس",                   "business": "غذای آماده", "icon": "🥫"},
    {"category_id": "37", "category_name": "سوسیس و بلونیا",      "business": "غذای آماده", "icon": "🌭"},
    {"category_id": "38", "category_name": "غذای دریایی",         "business": "غذای آماده", "icon": "🐟"},
    {"category_id": "39", "category_name": "فینگر فود و اسنک",    "business": "غذای آماده", "icon": "🌮"},
    {"category_id": "40", "category_name": "سبزیجات",             "business": "غذای آماده", "icon": "🥦"},
    {"category_id": "41", "category_name": "لبنیات عمومی",         "business": "لبنیات",    "icon": "🥛"},
    
    # Capo additional categories
    {"category_id": "42", "category_name": "خمیر آشپزی و شیرینی",  "business": "کاپو",      "icon": "🥐"},
    {"category_id": "43", "category_name": "خمیر پیراشکی",         "business": "کاپو",      "icon": "🥟"},
    {"category_id": "44", "category_name": "دیپ و حمص",            "business": "کاپو",      "icon": "🫕"},
    {"category_id": "45", "category_name": "سالاد الویه",          "business": "کاپو",      "icon": "🥗"},
    {"category_id": "46", "category_name": "اسنک و تنقلات",        "business": "کاپو",      "icon": "🍿"},
]

print("1. Updating products.csv...")
orig_csv = os.path.join(BASE_DIR, "assets", "products.csv")
with open(orig_csv, mode='r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    orig_rows = list(reader)

print(f"  Original products: {len(orig_rows)}")

# Filter out all Capo products (19, 20, 21, 22, 42, 43, 44, 45, 46)
non_capo_rows = [r for r in orig_rows if r.get('category_id') not in ('19', '20', '21', '22', '42', '43', '44', '45', '46')]
print(f"  Non-Capo products retained: {len(non_capo_rows)} (purged {len(orig_rows) - len(non_capo_rows)} old Capo items)")

# Load new 85 Capo products
with open(CAPO_NEW_CSV, mode='r', encoding='utf-8-sig') as f:
    new_capo_rows = list(csv.DictReader(f))
print(f"  New Capo products loaded: {len(new_capo_rows)}")

# Combine and re-index IDs cleanly (1 to 1804)
combined_products = []
new_id = 1
for r in non_capo_rows:
    r_copy = dict(r)
    r_copy['id'] = str(new_id)
    combined_products.append(r_copy)
    new_id += 1

for r in new_capo_rows:
    r_copy = dict(r)
    r_copy['id'] = str(new_id)
    combined_products.append(r_copy)
    new_id += 1

print(f"  Total combined products: {len(combined_products)}")

# Write updated products.csv to all targets
for target_dir in [BASE_DIR, GIT_DIR, DIST_DIR]:
    target_csv = os.path.join(target_dir, "assets", "products.csv")
    os.makedirs(os.path.dirname(target_csv), exist_ok=True)
    with open(target_csv, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(combined_products)
    print(f"  [OK] Saved: {target_csv}")

# 2. Update categories.json (clean format without icons for standard backend schema)
clean_categories_json = [
    {"category_id": c["category_id"], "category_name": c["category_name"], "business": c["business"]}
    for c in CATEGORIES_46
]

for target_dir in [BASE_DIR, GIT_DIR, DIST_DIR]:
    cat_file = os.path.join(target_dir, "data", "categories.json")
    os.makedirs(os.path.dirname(cat_file), exist_ok=True)
    with open(cat_file, mode='w', encoding='utf-8') as f:
        json.dump(clean_categories_json, f, ensure_ascii=False, indent=2)
    print(f"  [OK] Saved categories.json: {cat_file}")

# 3. Update js/app.js (both rawCategoryMap and CATEGORIES_TAXONOMY)
raw_cat_map_str = json.dumps(clean_categories_json, ensure_ascii=False)

tax_lines = []
for c in CATEGORIES_46:
    tax_lines.append(f"    {{ id: {c['category_id']}, business: '{c['business']}', name: '{c['category_name']}', icon: '{c['icon']}' }},")
tax_taxonomy_str = "\n".join(tax_lines)

for target_dir in [BASE_DIR, GIT_DIR, DIST_DIR]:
    app_js_path = os.path.join(target_dir, "js", "app.js")
    with open(app_js_path, mode='r', encoding='utf-8') as f:
        content = f.read()

    # Replace rawCategoryMap at Line 1
    content = re.sub(
        r'const rawCategoryMap = \[.*?\];',
        f'const rawCategoryMap = {raw_cat_map_str};',
        content,
        count=1
    )

    # Replace CATEGORIES_TAXONOMY
    content = re.sub(
        r'const CATEGORIES_TAXONOMY = \[.*?\];',
        f'const CATEGORIES_TAXONOMY = [\n{tax_taxonomy_str}\n];',
        content,
        count=1,
        flags=re.DOTALL
    )

    with open(app_js_path, mode='w', encoding='utf-8') as f:
        f.write(content)
    print(f"  [OK] Updated app.js: {app_js_path}")

# 4. Bump Cache in service-worker.js to v31-capo-upgrade
NEW_CACHE_NAME = "tmr-app-v31-capo-upgrade"
for target_dir in [BASE_DIR, GIT_DIR, DIST_DIR]:
    sw_path = os.path.join(target_dir, "service-worker.js")
    with open(sw_path, mode='r', encoding='utf-8') as f:
        sw_content = f.read()
    sw_content = re.sub(r"const CACHE_NAME = 'tmr-app-[^']+';", f"const CACHE_NAME = '{NEW_CACHE_NAME}';", sw_content)
    with open(sw_path, mode='w', encoding='utf-8') as f:
        f.write(sw_content)
    print(f"  [OK] Updated service-worker.js cache: {sw_path}")

# 5. Bump index.html script tag version to v20261124-v20
for target_dir in [BASE_DIR, GIT_DIR, DIST_DIR]:
    idx_path = os.path.join(target_dir, "index.html")
    with open(idx_path, mode='r', encoding='utf-8') as f:
        idx_content = f.read()
    idx_content = re.sub(r'app\.js\?v=[^"]+', 'app.js?v=20261124-v20', idx_content)
    with open(idx_path, mode='w', encoding='utf-8') as f:
        f.write(idx_content)
    print(f"  [OK] Updated index.html version param: {idx_path}")

# 6. Generate data/products.json and encrypt to data/products.enc
print("\n6. Converting products.csv -> products.json and generating products.enc...")
for target_dir in [BASE_DIR, GIT_DIR, DIST_DIR]:
    json_path = os.path.join(target_dir, "data", "products.json")
    with open(json_path, mode='w', encoding='utf-8') as f:
        json.dump(combined_products, f, ensure_ascii=False, indent=2)
    print(f"  [OK] Wrote: {json_path}")

    # Run encrypt-products.js
    enc_script = os.path.join(BASE_DIR, "encrypt-products.js")
    enc_output = os.path.join(target_dir, "data", "products.enc")
    cmd = ["node", enc_script, json_path, enc_output, "Solico@2026!"]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"  [OK] Encrypted: {enc_output}")
    else:
        print(f"  [ERROR] Encryption failed for {target_dir}: {res.stderr}")

print("\n[ALL DATABASE & APP FILES SUCCESSFULLY SYNCHRONIZED!]")
