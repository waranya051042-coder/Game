/**
 * ==============================================================================
 * BACKEND GOOGLE APPS SCRIPT: Verb to Be Adventure (Code.gs)
 * ==============================================================================
 * เชื่อมต่อ Google Spreadsheet ID: 1W0AMGO70jS-VjNAgf2lVyxvLVJagzyJUWYs4ky-rbiE
 * จัดการบันทึกผลการเล่นเกม และส่งตารางอันดับคะแนนผู้เล่น (Leaderboard)
 */

const SPREADSHEET_ID = "1W0AMGO70jS-VjNAgf2lVyxvLVJagzyJUWYs4ky-rbiE";
const SHEET_NAME = "Game_Results";

/**
 * ฟังก์ชันสร้างหรือดึงแผ่นงาน Game_Results พร้อมจัดรูปแบบคอลัมน์อัตโนมัติ
 */
function getOrCreateSheet() {
  let ss;
  try {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (err) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);

    // 8 คอลัมน์ตามข้อกำหนด
    const headers = [
      "วันเวลา",
      "ชื่อ",
      "ชั้น",
      "เลขที่",
      "คะแนน",
      "ด่านที่ไปถึง",
      "จำนวนครั้งที่ตอบผิด",
      "สถานะผ่าน/ไม่ผ่าน"
    ];

    sheet.appendRow(headers);

    // ตกแต่งหัวตาราง
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#2563eb")
               .setFontColor("#ffffff")
               .setFontWeight("bold")
               .setHorizontalAlignment("center")
               .setVerticalAlignment("middle");

    sheet.setRowHeight(1, 38);
    sheet.setFrozenRows(1);

    sheet.setColumnWidth(1, 175); // วันเวลา
    sheet.setColumnWidth(2, 220); // ชื่อ
    sheet.setColumnWidth(3, 100); // ชั้น
    sheet.setColumnWidth(4, 80);  // เลขที่
    sheet.setColumnWidth(5, 100); // คะแนน
    sheet.setColumnWidth(6, 110); // ด่านที่ไปถึง
    sheet.setColumnWidth(7, 140); // จำนวนครั้งที่ตอบผิด
    sheet.setColumnWidth(8, 220); // สถานะผ่าน/ไม่ผ่าน
  }
  return sheet;
}

/**
 * ตรวจสอบความถูกต้องของข้อมูลเบื้องต้น
 */
function validateData(data) {
  if (!data) return false;
  const score = Number(data.score);
  if (isNaN(score) || score < 0 || score > 100) return false;
  const stage = Number(data.stageReached);
  if (isNaN(stage) || stage < 1 || stage > 10) return false;
  return true;
}

/**
 * จัดการคำขอแบบ POST: บันทึกผลการเล่น (เมื่อตอบผิด หรือเมื่อชนะเกม)
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    let payload;
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      payload = e.parameter;
    } else {
      return createJsonResponse({ success: false, message: "No data received" });
    }

    if (!validateData(payload)) {
      return createJsonResponse({ success: false, message: "Validation failed" });
    }

    const sheet = getOrCreateSheet();
    const formattedDate = Utilities.formatDate(
      new Date(),
      "Asia/Bangkok",
      "dd/MM/yyyy HH:mm:ss"
    );

    // บันทึกแถวใหม่ (8 คอลัมน์)
    const newRow = [
      formattedDate,
      payload.name || "ไม่ระบุชื่อ",
      payload.className || "-",
      payload.studentNo || "-",
      Number(payload.score) || 0,
      Number(payload.stageReached) || 1,
      Number(payload.mistakes) || 0,
      payload.status || "กำลังเล่น"
    ];

    sheet.appendRow(newRow);

    return createJsonResponse({
      success: true,
      message: "Data saved successfully",
      saved: newRow
    });

  } catch (error) {
    return createJsonResponse({
      success: false,
      error: error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * จัดการคำขอแบบ GET: ดึงตารางอันดับคะแนนสูงสุด
 */
function doGet(e) {
  try {
    const sheet = getOrCreateSheet();
    const lastRow = sheet.getLastRow();

    if (lastRow <= 1) {
      return createJsonResponse({ success: true, leaderboard: [] });
    }

    const dataRange = sheet.getRange(2, 1, lastRow - 1, 8);
    const rows = dataRange.getValues();

    const results = rows.map(r => ({
      timestamp: r[0],
      name: r[1],
      className: r[2],
      studentNo: r[3],
      score: Number(r[4]) || 0,
      stageReached: Number(r[5]) || 1,
      mistakes: Number(r[6]) || 0,
      status: r[7]
    }));

    // เรียงอันดับ: คะแนนมากที่สุดก่อน ถ้าคะแนนเท่ากันให้คนตอบผิดน้อยกว่าอยู่บน
    results.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.mistakes - b.mistakes;
    });

    return createJsonResponse({
      success: true,
      leaderboard: results.slice(0, 15)
    });

  } catch (error) {
    return createJsonResponse({
      success: false,
      error: error.toString()
    });
  }
}

/**
 * ส่ง Response แบบ JSON พร้อมเปิด CORS
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
