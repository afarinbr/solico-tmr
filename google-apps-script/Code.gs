/**
 * ==============================================================================
 * Solico TMR Flashcards - Product Issue Reporting & Revision Webhook
 * سامانه دریافت و مدیریت گزارش‌های اصلاح اطلاعات کالا (سولیکو کاله)
 * ==============================================================================
 * 
 * این اسکریپت بر روی Google Sheets متصل شده و به عنوان یک Web App اجرا می‌شود.
 * گزارش‌های ارسالی از نرم‌افزار TMR Flashcards PWA را به صورت ساختاریافته دریافت
 * کرده، تصاویر را در Google Drive ذخیره می‌کند و جدول را برای بازبینی آسان آماده می‌سازد.
 */

// نام برگه پیش‌فرض در گوگل شیت
const SHEET_NAME = 'گزارش‌های اصلاح کالا';
// نام پوشه ذخیره تصاویر آپلودشده در گوگل درایو
const DRIVE_FOLDER_NAME = 'Solico_TMR_Report_Images';

/**
 * ایجاد منوی اختصاصی در گوگل شیت هنگام باز شدن فایل
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('سولیکو TMR ⚡')
    .addItem('تنظیم مجدد فرمت و سرستون‌های برگه', 'setupSheet')
    .addSeparator()
    .addItem('استخراج اصلاحات تاییدشده برای CSV', 'exportApprovedChangesModal')
    .addItem('آمار گزارش‌ها', 'showReportStatsModal')
    .addToUi();
}

/**
 * متد GET: برای تست سلامت وب‌هوک از طریق مرورگر
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    const totalRows = sheet ? Math.max(0, sheet.getLastRow() - 1) : 0;

    const htmlOutput = `
      <!DOCTYPE html>
      <html dir="rtl" lang="fa">
      <head>
        <meta charset="utf-8">
        <title>سرویس وب‌هوک سولیکو کاله</title>
        <style>
          body { font-family: Tahoma, 'Vazirmatn', sans-serif; background:#f8fafc; color:#1e293b; padding:40px; text-align:center; }
          .card { background:#fff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.06); max-width:550px; margin:0 auto; padding:30px; border-top:5px solid #0284c7; }
          .badge { display:inline-block; background:#dcfce7; color:#166534; padding:6px 14px; border-radius:20px; font-weight:bold; font-size:14px; margin-bottom:15px; }
          h2 { margin:10px 0; color:#0f172a; }
          p { color:#64748b; line-height:1.6; font-size:14px; }
          .stats { background:#f1f5f9; border-radius:8px; padding:15px; margin:20px 0; font-size:15px; font-weight:bold; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">● وب‌هوک فعال است</div>
          <h2>سامانه ثبت بازخورد و اصلاح کاتالوگ سولیکو کاله</h2>
          <p>این آدرس وب‌هوک آماده دریافت داده‌های گزارش نقص و اصلاح از اپلیکیشن فلش‌کارت TMR می‌باشد.</p>
          <div class="stats">تعداد گزارش‌های ثبت‌شده تا کنون: ${totalRows} مورد</div>
          <p style="font-size:12px; color:#94a3b8;">نسخه سرویس: 2.0 (Survey Edition) | آماده پذیرش درخواست‌های POST</p>
        </div>
      </body>
      </html>
    `;
    return HtmlService.createHtmlOutput(htmlOutput).setTitle('Solico TMR Webhook');
  } catch (err) {
    return ContentService.createTextOutput("Webhook is running. Error loading stats: " + err.message);
  }
}

/**
 * متد POST: دریافت اطلاعات فرم از PWA
 */
function doPost(e) {
  // استفاده از Lock جهت جلوگیری از تداخل ارسال‌های همزمان پرسنل
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000); // تا ۱۵ ثانیه منتظر صف می‌ماند
  } catch (err) {
    return createJsonResponse({
      status: 'error',
      message: 'سرور در حال حاضر شلوغ است. لطفاً چند لحظه بعد تلاش کنید.'
    }, 429);
  }

  try {
    let payload = null;

    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e && e.parameter && e.parameter.payload) {
      payload = JSON.parse(e.parameter.payload);
    }

    if (!payload) {
      throw new Error('محتوای درخواست معتبر نمی‌باشد (پیلود خالی است).');
    }

    // باز کردن یا ساخت شیت مورد نظر
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = setupSheet();
    }

    // ذخیره تصویر در درایو (در صورت وجود)
    let imageUrl = '';
    let imageFormula = '';
    if (payload.image_replacement && payload.image_replacement.has_image && payload.image_replacement.base64_data) {
      try {
        imageUrl = saveImageToDrive(payload.image_replacement, payload.sku || payload.product_id);
        if (imageUrl) {
          imageFormula = `=HYPERLINK("${imageUrl}"; "مشاهده در درایو")`;
        }
      } catch (imgErr) {
        imageUrl = `خطا در ذخیره تصویر: ${imgErr.message}`;
        imageFormula = imageUrl;
      }
    }

    // قالب‌بندی مقادیر فعلی و مقادیر پیشنهادی به صورت متنی خوانا
    const formattedCurrentValues = formatValuesSummary(payload.current_values_json);
    const formattedSuggestedReplacements = formatValuesSummary(payload.suggested_replacements_json);

    // ترجمه سرفصل و دسته‌بندی گزارش به فارسی خوانا
    const issueCategoryPersian = translateIssueCategory(payload.issue_types);
    const chapterPersian = translateChapter(payload.content_chapter);
    const targetColsPersian = (payload.target_csv_columns || []).join(', ');

    // سطر جدید برای درج در جدول
    const rowData = [
      payload.report_id || `REP-${Date.now()}`,                 // ۱. کد پیگیری
      formatPersianDate(new Date(payload.timestamp || Date.now())), // ۲. تاریخ و زمان ثبت
      'در انتظار بررسی (PENDING)',                                 // ۳. وضعیت بررسی (با دراپ‌داون)
      payload.product_id || '',                                 // ۴. شناسه کالا (ID)
      payload.sku || '',                                        // ۵. کد محصول (SKU)
      payload.product_name_raw || '',                           // ۶. نام کالا
      payload.current_business_unit || '',                      // ۷. واحد تجاری فعلی
      payload.current_category_name || '',                      // ۸. دسته‌بندی فعلی
      issueCategoryPersian,                                     // ۹. موضوع گزارش
      chapterPersian,                                           // ۱۰. سرفصل محتوا
      targetColsPersian,                                        // ۱۱. ستون‌های هدف CSV
      formattedCurrentValues,                                   // ۱۲. مقادیر فعلی
      formattedSuggestedReplacements,                           // ۱۳. مقادیر اصلاحی جدید
      payload.problem_text || '',                               // ۱۴. توضیح و علت گزارش
      imageFormula,                                             // ۱۵. لینک تصویر در درایو
      '',                                                       // ۱۶. یادداشت مدیر بازبین
      JSON.stringify(payload)                                   // ۱۷. پیلود کامل JSON (پشتیبان فنی)
    ];

    sheet.appendRow(rowData);

    // اعمال فرمت و استایل بر روی سطر جدید
    const lastRow = sheet.getLastRow();
    applyRowFormatting(sheet, lastRow);

    return createJsonResponse({
      status: 'success',
      report_id: payload.report_id,
      message: 'گزارش با موفقیت در سیستم مرکزی سولیکو کاله ثبت شد.'
    });

  } catch (error) {
    console.error('Error processing report:', error);
    return createJsonResponse({
      status: 'error',
      message: `خطای پردازش در سرور: ${error.message}`
    }, 500);

  } finally {
    lock.releaseLock();
  }
}

/**
 * ایجاد و آماده‌سازی شیت با سرستون‌های استاندارد و استایل حرفه‌ای
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // تنظیم جهت برگه از راست به چپ (RTL)
  sheet.setRightToLeft(true);

  // عناوین سرستون‌ها
  const headers = [
    'کد پیگیری (Report ID)',
    'تاریخ و زمان ثبت',
    'وضعیت بررسی',
    'شناسه (ID)',
    'کد کالا (SKU)',
    'نام محصول',
    'واحد تجاری',
    'دسته‌بندی فعلی',
    'موضوع گزارش',
    'فصل محتوا',
    'ستون‌های هدف CSV',
    'مقادیر فعلی در سامانه',
    'مقادیر پیشنهادی جدید',
    'توضیحات و علت گزارش',
    'تصویر جایگزین (Drive)',
    'یادداشت بازبین کاتالوگ',
    'داده خام (Raw JSON)'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // استایل سرستون‌ها
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange
    .setBackground('#1e293b') // اسلیت تیره رسمی
    .setFontColor('#ffffff')
    .setFontFamily('Vazirmatn, Tahoma, Arial')
    .setFontSize(10)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(false);

  sheet.setRowHeight(1, 40);
  sheet.setFrozenRows(1);

  // تنظیم عرض ستون‌ها برای خوانایی بهینه
  const colWidths = [
    140, // ۱. کد پیگیری
    130, // ۲. تاریخ و زمان
    160, // ۳. وضعیت بررسی
    75,  // ۴. شناسه کالا
    100, // ۵. کد SKU
    220, // ۶. نام محصول
    100, // ۷. واحد تجاری
    110, // ۸. دسته‌بندی
    140, // ۹. موضوع گزارش
    120, // ۱۰. فصل محتوا
    130, // ۱۱. ستون‌های CSV
    230, // ۱۲. مقادیر فعلی
    260, // ۱۳. مقادیر پیشنهادی
    240, // ۱۴. توضیحات
    130, // ۱۵. لینک تصویر
    160, // ۱۶. یادداشت بازبین
    100  // ۱۷. داده خام
  ];

  colWidths.forEach((width, index) => {
    sheet.setColumnWidth(index + 1, width);
  });

  // تنظیم اعتبارسنجی دراپ‌داون وضعیت (PENDING / APPROVED / REJECTED / IN_REVIEW)
  setupStatusValidationAndRules(sheet);

  SpreadsheetApp.flush();
  return sheet;
}

/**
 * تنظیم منوی دراپ‌داون و رنگ‌بندی شرطی برای ستون «وضعیت بررسی»
 */
function setupStatusValidationAndRules(sheet) {
  const statusOptions = [
    'در انتظار بررسی (PENDING)',
    'تایید و اعمال شد (APPROVED)',
    'رد شد (REJECTED)',
    'نیاز به بررسی بیشتر (IN_REVIEW)'
  ];

  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(statusOptions, true)
    .setAllowInvalid(false)
    .build();

  // اعمال دراپ‌داون به تمام ردیف‌های ستون ۳ (از ردیف ۲ تا ۱۰۰۰)
  sheet.getRange(2, 3, 999, 1).setDataValidation(rule);

  // ایجاد فرمت‌های شرطی رنگی بر اساس وضعیت
  const statusRange = sheet.getRange("C2:C1000");
  const rules = [];

  // رنگ زرد برای موارد در انتظار بررسی
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('PENDING')
    .setBackground('#fef3c7')
    .setFontColor('#92400e')
    .setRanges([statusRange])
    .build());

  // رنگ سبز برای موارد تاییدشده
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('APPROVED')
    .setBackground('#dcfce7')
    .setFontColor('#166534')
    .setRanges([statusRange])
    .build());

  // رنگ قرمز برای موارد ردشده
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('REJECTED')
    .setBackground('#fee2e2')
    .setFontColor('#991b1b')
    .setRanges([statusRange])
    .build());

  // رنگ آبی برای موارد در حال بررسی بیشتر
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('IN_REVIEW')
    .setBackground('#e0f2fe')
    .setFontColor('#075985')
    .setRanges([statusRange])
    .build());

  sheet.setConditionalFormatRules(rules);
}

/**
 * اعمال فرمت و چیدمان بر روی سطر تازه اضافه‌شده
 */
function applyRowFormatting(sheet, rowNum) {
  const rowRange = sheet.getRange(rowNum, 1, 1, 17);
  
  rowRange
    .setFontFamily('Tahoma, Arial')
    .setFontSize(9)
    .setVerticalAlignment('middle');

  // چپ‌چین برای کدهای سیستمی
  sheet.getRange(rowNum, 1).setHorizontalAlignment('left'); // Report ID
  sheet.getRange(rowNum, 4).setHorizontalAlignment('center'); // Product ID
  sheet.getRange(rowNum, 5).setHorizontalAlignment('left'); // SKU
  sheet.getRange(rowNum, 11).setHorizontalAlignment('left'); // CSV columns

  // شکست متن برای فیلدهای متنی بلند
  sheet.getRange(rowNum, 12, 1, 3).setWrap(true); // مقادیر فعلی، پیشنهادی و توضیحات

  sheet.setRowHeight(rowNum, 36);
}

/**
 * ذخیره تصویر base64 در پوشه اختصاصی گوگل درایو و بازگرداندن لینک عمومی
 */
function saveImageToDrive(imageObj, identifier) {
  const base64Data = imageObj.base64_data;
  if (!base64Data) return '';

  const mimeType = imageObj.mime_type || 'image/jpeg';
  const extension = mimeType.includes('png') ? 'png' : 'jpg';
  const decoded = Utilities.base64Decode(base64Data);
  const blob = Utilities.newBlob(decoded, mimeType, `TMR_Report_${identifier}_${Date.now()}.${extension}`);

  // پیدا کردن یا ساخت پوشه در روت درایو
  let folder;
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    folder = DriveApp.createFolder(DRIVE_FOLDER_NAME);
  }

  const file = folder.createFile(blob);
  
  // تنظیم دسترسی مشاهده با لینک جهت بازبینی سریع تیم
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (e) {
    console.warn('Could not set public sharing for image file:', e);
  }

  return file.getUrl();
}

/**
 * تبدیل دیکشنری مقادیر به متن خوانا و تمیز جهت درج در سلول شیت
 */
function formatValuesSummary(valuesObj) {
  if (!valuesObj || typeof valuesObj !== 'object') return '-';
  const keys = Object.keys(valuesObj);
  if (keys.length === 0) return '-';

  const labelsMap = {
    product_name_raw: 'نام کالا',
    weights: 'وزن/بسته‌بندی',
    sku: 'کد SKU',
    slogan: 'شعار',
    claims: 'پیام‌های فروش',
    targets: 'بازار هدف',
    tips: 'نکات TMR',
    sampling: 'سمپلینگ',
    plano: 'چیدمان/پلانو',
    energy: 'انرژی',
    protein: 'پروتئین',
    fat: 'چربی',
    sugar: 'قند',
    salt: 'نمک',
    shelf_life: 'ماندگاری',
    ingredients: 'ترکیبات',
    competitor: 'رقبا',
    negotiation: 'مذاکره',
    business_unit: 'واحد تجاری',
    category_id: 'شناسه دسته',
    category_name: 'نام دسته‌بندی',
    custom_category_other: 'دسته‌بندی جدید پیشنهادی',
    is_discontinued: 'توقف تولید',
    discontinued_notes: 'توضیحات توقف تولید',
    other_notes: 'پیشنهاد / یادداشت'
  };

  const lines = [];
  keys.forEach(k => {
    const val = valuesObj[k];
    if (val !== undefined && val !== null && val !== '') {
      const fLabel = labelsMap[k] || k;
      lines.push(`• ${fLabel}: ${val}`);
    }
  });

  return lines.length > 0 ? lines.join('\n') : '-';
}

/**
 * ترجمه فارسی موضوع گزارش
 */
function translateIssueCategory(issueTypes) {
  if (!issueTypes) return '-';
  const arr = Array.isArray(issueTypes) ? issueTypes : [issueTypes];
  const map = {
    'WRONG_CONTENT': 'اصلاح متن و محتوا',
    'WRONG_CATEGORY': 'دسته‌بندی / واحد تجاری اشتباه',
    'WRONG_IMAGE': 'تصویر اشتباه یا بی‌کیفیت',
    'DISCONTINUED': 'توقف تولید کالا (Discontinued)',
    'OTHER': 'پیشنهاد و بازخورد تکمیلی'
  };

  return arr.map(i => map[i] || i).join(' + ');
}

/**
 * ترجمه فارسی فصل محتوا
 */
function translateChapter(chapKey) {
  if (!chapKey) return '-';
  const map = {
    'chap_basic': 'فصل ۱: پایه و شعار',
    'chap_pitch': 'فصل ۲: پیام‌های فروش',
    'chap_ops': 'فصل ۳: عملیات TMR',
    'chap_nutrition': 'فصل ۴: ارزش غذایی',
    'chap_negotiation': 'فصل ۵: مذاکره و رقبا'
  };
  return map[chapKey] || chapKey;
}

/**
 * قالب‌بندی تاریخ به فرمت محلی خوانا
 */
function formatPersianDate(d) {
  try {
    return Utilities.formatDate(d, 'Asia/Tehran', 'yyyy/MM/dd - HH:mm');
  } catch (e) {
    return d.toISOString();
  }
}

/**
 * ساخت پاسخ استاندارد JSON برای وب‌هوک
 */
function createJsonResponse(data, statusCode = 200) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * دیالوگ خروجی اصلاحات تاییدشده (Approved Replacements) برای اعمال در products.csv
 */
function exportApprovedChangesModal() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return;

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    SpreadsheetApp.getUi().alert('هیچ گزارشی در جدول ثبت نشده است.');
    return;
  }

  const approvedList = [];

  for (let i = 1; i < data.length; i++) {
    const status = String(data[i][2]); // ستون C: وضعیت
    if (status.includes('APPROVED')) {
      const reportId = data[i][0];
      const prodId = data[i][3];
      const sku = data[i][4];
      const prodName = data[i][5];
      const targetCols = data[i][10];
      const replacementsText = data[i][12];
      const rawJson = data[i][16];

      let rawObj = null;
      try {
        rawObj = JSON.parse(rawJson);
      } catch (e) {}

      approvedList.push({
        row: i + 1,
        report_id: reportId,
        product_id: prodId,
        sku: sku,
        product_name: prodName,
        target_columns: targetCols,
        suggested_replacements: rawObj ? rawObj.suggested_replacements_json : replacementsText
      });
    }
  }

  if (approvedList.length === 0) {
    SpreadsheetApp.getUi().alert('هنوز هیچ گزارشی به عنوان "تایید و اعمال شد (APPROVED)" علامت‌گذاری نشده است.');
    return;
  }

  const jsonStr = JSON.stringify(approvedList, null, 2);
  const html = `
    <!DOCTYPE html>
    <html dir="rtl">
    <head>
      <style>
        body { font-family: Tahoma, sans-serif; padding:15px; font-size:12px; }
        textarea { width:100%; height:260px; font-family:monospace; direction:ltr; font-size:11px; padding:8px; border-radius:6px; border:1px solid #cbd5e1; }
        p { color:#334155; margin-bottom:10px; }
        .badge { background:#dcfce7; color:#166534; padding:4px 8px; border-radius:4px; font-weight:bold; }
      </style>
    </head>
    <body>
      <p><span class="badge">${approvedList.length} مورد</span> تاییدشده پیدا شد. می‌توانید خروجی ساختاریافته زیر را برای اسکریپت به‌روزرسانی <code>products.csv</code> کپی کنید:</p>
      <textarea readonly onclick="this.select()">${jsonStr}</textarea>
    </body>
    </html>
  `;

  const output = HtmlService.createHtmlOutput(html).setWidth(600).setHeight(380);
  SpreadsheetApp.getUi().showModalDialog(output, 'استخراج اصلاحات تاییدشده برای کاتالوگ');
}

/**
 * نمایش خلاصه وضعیت و آمار گزارش‌ها
 */
function showReportStatsModal() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return;

  const data = sheet.getDataRange().getValues();
  let pending = 0, approved = 0, rejected = 0, inReview = 0;

  for (let i = 1; i < data.length; i++) {
    const s = String(data[i][2]);
    if (s.includes('PENDING')) pending++;
    else if (s.includes('APPROVED')) approved++;
    else if (s.includes('REJECTED')) rejected++;
    else if (s.includes('IN_REVIEW')) inReview++;
  }

  const total = data.length - 1;
  const msg = `📊 آمار کل گزارش‌های ثبت‌شده: ${total} مورد\n\n` +
              `⏳ در انتظار بررسی: ${pending} مورد\n` +
              `✅ تایید و اعمال شده: ${approved} مورد\n` +
              `🔍 در حال بررسی تکمیلی: ${inReview} مورد\n` +
              `❌ رد شده: ${rejected} مورد`;

  SpreadsheetApp.getUi().alert('آمار سیستم بازخورد و اصلاح کالا', msg, SpreadsheetApp.getUi().ButtonSet.OK);
}
