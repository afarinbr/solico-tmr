/**
 * ============================================================================
 * Google Apps Script Webhook Receiver for Solico TMR Flashcards
 * ============================================================================
 * 
 * Instructions for IT / Marketing Team:
 * 1. Open Google Sheets (https://sheets.new) and name it: "Solico TMR Product Reports"
 * 2. Click "Extensions" (افزونه‌ها) > "Apps Script"
 * 3. Replace the entire code with this script.
 * 4. Click "Deploy" (استقرار) > "New deployment" (استقرار جدید)
 * 5. Select type: "Web app" (وب‌اپلیکیشن)
 * 6. Set:
 *    - Execute as: "Me" (خود من)
 *    - Who has access: "Anyone" (هر کسی)
 * 7. Click "Deploy", authorize permissions, and copy the Web App URL.
 * 8. Paste the Web App URL into REPORT_WEBHOOK_URL in js/app.js
 * ============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var rawContent = e.postData.contents;
    var data = JSON.parse(rawContent);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Reports") || ss.getActiveSheet();
    sheet.setName("Reports");

    // Initialize Header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Report ID",
        "Timestamp (UTC)",
        "Status",
        "Product ID",
        "SKU",
        "Product Name",
        "Current Business Unit",
        "Current Category ID",
        "Current Category Name",
        "Issue Types",
        "Target CSV Columns",
        "Problem Text",
        "Current Values (JSON)",
        "Suggested Replacements (JSON)",
        "Has Image",
        "Image Link (Google Drive)"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#0f766e").setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }

    // Handle Image upload if present
    var imageDriveUrl = "";
    if (data.image_replacement && data.image_replacement.has_image && data.image_replacement.base64_data) {
      try {
        var folderName = "TMR_Product_Reports_Images";
        var folders = DriveApp.getFoldersByName(folderName);
        var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
        
        var decodedBytes = Utilities.base64Decode(data.image_replacement.base64_data);
        var mimeType = data.image_replacement.mime_type || "image/jpeg";
        var filename = data.image_replacement.filename || ("product_" + data.product_id + "_report.jpg");
        var blob = Utilities.newBlob(decodedBytes, mimeType, filename);
        var driveFile = folder.createFile(blob);
        driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        imageDriveUrl = driveFile.getUrl();
      } catch (imgErr) {
        imageDriveUrl = "Error saving image: " + imgErr.toString();
      }
    }

    // Format fields for Google Sheets
    var issueTypesStr = Array.isArray(data.issue_types) ? data.issue_types.join(", ") : (data.issue_types || "");
    var targetColsStr = Array.isArray(data.target_csv_columns) ? data.target_csv_columns.join(", ") : (data.target_csv_columns || "");
    var currentValsStr = typeof data.current_values_json === "object" ? JSON.stringify(data.current_values_json, null, 2) : (data.current_values_json || "");
    var suggestedValsStr = typeof data.suggested_replacements_json === "object" ? JSON.stringify(data.suggested_replacements_json, null, 2) : (data.suggested_replacements_json || "");

    var row = [
      data.report_id || ("REP-" + Date.now()),
      data.timestamp || new Date().toISOString(),
      data.status || "PENDING",
      data.product_id || "",
      data.sku || "",
      data.product_name_raw || "",
      data.current_business_unit || "",
      data.current_category_id || "",
      data.current_category_name || "",
      issueTypesStr,
      targetColsStr,
      data.problem_text || "",
      currentValsStr,
      suggestedValsStr,
      (data.image_replacement && data.image_replacement.has_image) ? "YES" : "NO",
      imageDriveUrl
    ];

    sheet.appendRow(row);

    // Apply auto-formatting to new row
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 3).setBackground("#fef3c7").setFontColor("#92400e"); // Status highlight

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      report_id: data.report_id,
      row: lastRow,
      image_url: imageDriveUrl
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Solico TMR Product Issue Webhook",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}
