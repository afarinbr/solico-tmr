import urllib.request
import json
import base64
import io
import time

# Create a tiny 100x100 real valid JPEG in memory
from PIL import Image
img = Image.new('RGB', (100, 100), color=(2, 132, 199))
buf = io.BytesIO()
img.save(buf, format='JPEG', quality=85)
base64_sample_jpg = base64.b64encode(buf.getvalue()).decode('utf-8')

webhook_url = 'https://script.google.com/macros/s/AKfycbw9Tgu6HZfVz0-HWLOJ-c8oRysY515Oi5sLWaLvuoQCUYg17QtW2wmCtiRi7s_AbP__HA/exec'

reports = [
    # 1. WRONG_CATEGORY
    {
        'report_id': f'REP-{int(time.time()*1000)}-1',
        'timestamp': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        'status': 'PENDING',
        'product_id': 1,
        'sku': 'TEMP1',
        'product_name_raw': 'بستنی جیتو شاتوت 105 سی سی',
        'current_business_unit': 'بستنی',
        'current_category_id': 28,
        'current_category_name': 'اقتصادی',
        'issue_types': ['WRONG_CATEGORY'],
        'content_chapter': None,
        'problem_text': 'این محصول نباید در دسته اقتصادی باشد؛ فرمولاسیون و قیمت مصرف‌کننده آن در رده پریمیوم قرار دارد.',
        'target_csv_columns': ['category_id'],
        'current_values_json': {'category_id': 28, 'business_unit': 'بستنی'},
        'suggested_replacements_json': {
            'business_unit': 'بستنی',
            'category_id': 29,
            'category_name': 'پریمیوم',
            'custom_category_other': ''
        },
        'image_replacement': {'has_image': False}
    },
    # 2. WRONG_IMAGE (with real JPEG Base64 to test Google Drive upload)
    {
        'report_id': f'REP-{int(time.time()*1000)+1}-8',
        'timestamp': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        'status': 'PENDING',
        'product_id': 8,
        'sku': 'TEMP8',
        'product_name_raw': 'کشک 250 gr',
        'current_business_unit': 'لبنیات',
        'current_category_id': 1,
        'current_category_name': 'کشک',
        'issue_types': ['WRONG_IMAGE'],
        'content_chapter': None,
        'problem_text': 'عکس فعلی در شلف مات است و طراحی لیبل جدید سال ۱۴۰۵ روی آن اعمال نشده است. عکس باکیفیت پیوست شد.',
        'target_csv_columns': ['image_urls'],
        'current_values_json': {'image_urls': 'https://api.bonnychow.ir/Files/Doc/51fc78b0ad8844c791e122e4b9825767.webp'},
        'suggested_replacements_json': {'image_note': 'تصویر باکیفیت جدید در گوگل درایو بارگذاری شد'},
        'image_replacement': {
            'has_image': True,
            'mime_type': 'image/jpeg',
            'filename': 'product_8_kashk_pack_new.jpg',
            'base64_data': base64_sample_jpg
        }
    },
    # 3. WRONG_CONTENT - Chapter 1: Basic Info & Slogan
    {
        'report_id': f'REP-{int(time.time()*1000)+2}-9',
        'timestamp': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        'status': 'PENDING',
        'product_id': 9,
        'sku': 'TEMP9',
        'product_name_raw': 'ماست طعمدار بادمجان 750 گرمی',
        'current_business_unit': 'لبنیات',
        'current_category_id': 7,
        'current_category_name': 'ماست',
        'issue_types': ['WRONG_CONTENT'],
        'content_chapter': 'chap_basic',
        'problem_text': 'تعداد در کارتن از ۶ عددی به ۸ عددی تغییر کرده و کد SKU رسمی در سیستم بازاریابی باید اصلاح شود.',
        'target_csv_columns': ['product_name_raw', 'weights', 'sku', 'slogan'],
        'current_values_json': {
            'product_name_raw': 'ماست طعمدار بادمجان 750 گرمی',
            'weights': '750 گرم (کارتن 6 عددی)',
            'sku': 'TEMP9',
            'slogan': 'طعم اصیل بادمجان کبابی در بافت خامه‌ای ماست تازه کاله'
        },
        'suggested_replacements_json': {
            'product_name_raw': 'ماست همزده بادمجان دودی 750 گرم',
            'weights': '750 گرم (کارتن 8 عددی)',
            'sku': 'SKU-YOG-EGG-750',
            'slogan': 'طعم اصیل بادمجان کبابی و دودی در بافت خامه‌ای و مخملی کاله'
        },
        'image_replacement': {'has_image': False}
    },
    # 4. WRONG_CONTENT - Chapter 2: Sales Pitch (Claims & Targets with bullet delimiters)
    {
        'report_id': f'REP-{int(time.time()*1000)+3}-1',
        'timestamp': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        'status': 'PENDING',
        'product_id': 1,
        'sku': 'TEMP1',
        'product_name_raw': 'بستنی جیتو شاتوت 105 سی سی',
        'current_business_unit': 'بستنی',
        'current_category_id': 28,
        'current_category_name': 'اقتصادی',
        'issue_types': ['WRONG_CONTENT'],
        'content_chapter': 'chap_pitch',
        'problem_text': 'پیام‌های فروش نیاز به تاکید بیشتر روی پوره طبیعی و خنک‌کنندگی سریع دارد.',
        'target_csv_columns': ['claims', 'targets'],
        'current_values_json': {
            'claims': 'تهیه شده از کنسانتره طبیعی میوه شاتوت|چربی صفر و انرژی مناسب برای خنک‌کنندگی سریع|قیمت اقتصادی و گردش فروش بالا در فروشگاه',
            'targets': 'کودکان و نوجوانان علاقه‌مند به طعم‌های میوه‌ای ترش و شیرین|جوانان و دانشجویان به عنوان میان‌وعده خنک و اقتصادی|خانواده‌ها جهت خرید اقتصادی و حجمی برای روزهای گرم'
        },
        'suggested_replacements_json': {
            'claims': 'تهیه شده از پوره ۱۰۰٪ طبیعی شاتوت دست‌چین | بدون چربی ترانس و کالری بهینه برای رژیم | قیمت اقتصادی با کشش تقاضای فوق‌العاده در تابستان',
            'targets': 'نوجوانان و جوانان دوستدار طعم ترش میوه‌ای | مشتریان پرانرژی برای تجدید قوای روزانه | سبد خرید خنک هفتگی خانواده‌ها'
        },
        'image_replacement': {'has_image': False}
    },
    # 5. WRONG_CONTENT - Chapter 3: TMR Operations & Shelf (Tips, Sampling, Plano)
    {
        'report_id': f'REP-{int(time.time()*1000)+4}-8',
        'timestamp': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        'status': 'PENDING',
        'product_id': 8,
        'sku': 'TEMP8',
        'product_name_raw': 'کشک 250 gr',
        'current_business_unit': 'لبنیات',
        'current_category_id': 1,
        'current_category_name': 'کشک',
        'issue_types': ['WRONG_CONTENT'],
        'content_chapter': 'chap_ops',
        'problem_text': 'نکات پرزنت و نحوه سمپلینگ برای هایپرمارکت‌ها در آخر هفته به‌روزرسانی شد.',
        'target_csv_columns': ['tips', 'sampling', 'plano'],
        'current_values_json': {
            'tips': 'به مغازه‌دار پیشنهاد دهید این محصول را کنار کشک‌بادمجون آماده و آش‌های بسته‌بندی بچیند|روی تازگی و پاستوریزه بودن محصول تأکید کنید',
            'sampling': 'ارائه مقدار کمی کشک روی تکه نان خشک به همراه نعناع داغ برای مشتریان در هایپرمارکت‌ها',
            'plano': 'چیدمان در طبقه دید چشم در یخچال لبنیات روزانه|رعایت اصول فایفو و قرار دادن تاریخ‌های جدیدتر در پشت قفسه'
        },
        'suggested_replacements_json': {
            'tips': 'تاکید به فروشگاه‌دار روی تاریخ انقضای ۱۲۰ روزه و ضایعات صفر کاله | پیشنهاد چیدمان مشترک کنار بخش بادمجان و تره‌بار فروشگاه | معرفی به عنوان چاشنی ممتاز آشپزی اصیل',
            'sampling': 'سرو تست کشک غلیظ با نان ترد کنجدی و پیازداغ در روزهای پنج‌شنبه و جمعه عصر',
            'plano': 'حداقل ۳ فیسینگ در طبقه دوم یخچال ایستاده لبنیات | چیدمان عمودی کنار پنیر فتا و خامه پاستوریزه کاله'
        },
        'image_replacement': {'has_image': False}
    },
    # 6. WRONG_CONTENT - Chapter 4: Nutrition & Ingredients
    {
        'report_id': f'REP-{int(time.time()*1000)+5}-8',
        'timestamp': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        'status': 'PENDING',
        'product_id': 8,
        'sku': 'TEMP8',
        'product_name_raw': 'کشک 250 gr',
        'current_business_unit': 'لبنیات',
        'current_category_id': 1,
        'current_category_name': 'کشک',
        'issue_types': ['WRONG_CONTENT'],
        'content_chapter': 'chap_nutrition',
        'problem_text': 'جدول تغذیه‌ای طبق آنالیز آزمایشگاه کنترل کیفیت بهار ۱۴۰۵ اصلاح شد.',
        'target_csv_columns': ['energy', 'protein', 'fat', 'salt', 'shelf_life', 'ingredients'],
        'current_values_json': {
            'energy': '114',
            'protein': '',
            'fat': '2',
            'salt': '1',
            'shelf_life': '120',
            'ingredients': ''
        },
        'suggested_replacements_json': {
            'energy': '118 kcal',
            'protein': '11 g',
            'fat': '2 g',
            'salt': '1.1 g',
            'shelf_life': '90 روز',
            'ingredients': 'شیر تازه پاستوریزه گاو | نمک طعام تصفیه شده | مایه کشک اختصاصی و استارتر بیوتکنولوژی کاله'
        },
        'image_replacement': {'has_image': False}
    },
    # 7. WRONG_CONTENT - Chapter 5: Competitor & Negotiation
    {
        'report_id': f'REP-{int(time.time()*1000)+6}-9',
        'timestamp': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        'status': 'PENDING',
        'product_id': 9,
        'sku': 'TEMP9',
        'product_name_raw': 'ماست طعمدار بادمجان 750 گرمی',
        'current_business_unit': 'لبنیات',
        'current_category_id': 7,
        'current_category_name': 'ماست',
        'issue_types': ['WRONG_CONTENT'],
        'content_chapter': 'chap_negotiation',
        'problem_text': 'اطلاعات برندهای رقیب و پاسخ به اعتراض قیمت بالا برای بازاریابان تکمیل شد.',
        'target_csv_columns': ['competitor', 'negotiation'],
        'current_values_json': {
            'competitor': 'محصولات سنتی و محلی فاقد استاندارد؛ مزیت کاله: کیفیت صنعتی پایدار، بهداشت تضمین‌شده و طعم استاندارد',
            'negotiation': 'تضمین مرجوعی در صورت عدم فروش برای اطمینان خاطر خرده‌فروش|پیشنهاد خرید سبدی به همراه نان‌های سنتی و خشک'
        },
        'suggested_replacements_json': {
            'competitor': 'ماست بادمجان صباح و هراز؛ مزیت کاله: تکه‌های واقعی و درشت‌تر بادمجان کبابی، عدم آب‌اندازی در طول مدت مصرف و پاستوریزاسیون تضمینی',
            'negotiation': 'پیشنهاد خرید پکیج ماست طعم‌دار با ۵ درصد تخفیف نقدی روی فاکتور | توجیه حاشیه سود ۲۰ درصدی برای خرده‌فروشی | ارایه استند اختصاصی ماست‌های پیش‌غذا'
        },
        'image_replacement': {'has_image': False}
    },
    # 8. DISCONTINUED
    {
        'report_id': f'REP-{int(time.time()*1000)+7}-2',
        'timestamp': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        'status': 'PENDING',
        'product_id': 2,
        'sku': 'TEMP2',
        'product_name_raw': 'بستنی جیتو کولا 105 سی سی',
        'current_business_unit': 'بستنی',
        'current_category_id': 28,
        'current_category_name': 'اقتصادی',
        'issue_types': ['DISCONTINUED'],
        'content_chapter': None,
        'problem_text': 'تولید این طعم از انتهای مهرماه متوقف شده است و باید از چرخه سفارش‌گیری سوپرمارکت‌ها حذف گردد.',
        'target_csv_columns': ['status'],
        'current_values_json': {'is_discontinued': False},
        'suggested_replacements_json': {
            'is_discontinued': True,
            'discontinued_notes': 'توقف کامل تولید به علت جایگزینی با طعم بلوبری انبه در کارخانه آمل'
        },
        'image_replacement': {'has_image': False}
    },
    # 9. OTHER
    {
        'report_id': f'REP-{int(time.time()*1000)+8}-8',
        'timestamp': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        'status': 'PENDING',
        'product_id': 8,
        'sku': 'TEMP8',
        'product_name_raw': 'کشک 250 gr',
        'current_business_unit': 'لبنیات',
        'current_category_id': 1,
        'current_category_name': 'کشک',
        'issue_types': ['OTHER'],
        'content_chapter': None,
        'problem_text': 'پیشنهاد تغییر در درب قوطی برای مصرف بهداشتی‌تر در کمپینگ و سفر.',
        'target_csv_columns': ['other_notes'],
        'current_values_json': {},
        'suggested_replacements_json': {
            'other_notes': 'مشتریان تقاضای بسته‌بندی فشاری (Squeeze Tube) یا درب آسان‌بازشو دارند تا بدون نیاز به قاشق در سفره استفاده شود.'
        },
        'image_replacement': {'has_image': False}
    }
]

print(f"Submitting {len(reports)} diverse reports to Google Sheets webhook...")

for i, rep in enumerate(reports, 1):
    payload_bytes = json.dumps(rep).encode('utf-8')
    req = urllib.request.Request(webhook_url, data=payload_bytes, headers={'Content-Type': 'text/plain;charset=utf-8'}, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            resp_body = resp.read().decode('utf-8')
            issue_type = rep['issue_types'][0]
            chapter = rep.get('content_chapter') or '-'
            print(f"[{i}/{len(reports)}] Sent: {rep['report_id']} | Type: {issue_type} ({chapter}) -> Response: {resp_body[:90]}")
    except Exception as e:
        print(f"[{i}/{len(reports)}] Failed {rep['report_id']}: {e}")
    time.sleep(1)

print("All reports successfully submitted!")
