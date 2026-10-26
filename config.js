/**
 * ==============================================================================
 * ไฟล์ตั้งค่าเกม: Verb to Be Adventure (config.js)
 * ==============================================================================
 * แยกการตั้งค่าระบบและ URL ของ Google Apps Script Web App ไว้ที่นี่
 * เพื่อความสะดวกในการแก้ไขและไม่ต้องแก้ไขโค้ดหลักของเกม
 */

const CONFIG = {
  // นำ URL ของ Web App ที่ได้จากการ Deploy Google Apps Script มาใส่ที่นี่
  // ตัวอย่าง: "https://script.google.com/macros/s/AKfycbx.../exec"
  GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwGPXHj6pArCZ7g7WQJxXe1qgJ7Mr-AibCFSv9oADpJmMZhX2222r_OuBC7UfYZtU-NGA/exec",

  // Google Spreadsheet ID ที่เชื่อมต่อ
  SPREADSHEET_ID: "1W0AMGO70jS-VjNAgf2lVyxvLVJagzyJUWYs4ky-rbiE",

  // ชื่อแผ่นงานใน Google Sheets
  SHEET_NAME: "Game_Results",

  // ชื่อเกม
  GAME_TITLE: "Verb to Be Adventure: ผจญภัยพิชิต 10 ด่าน",

  // ระดับชั้นเป้าหมาย
  GRADE_LEVEL: "ประถมศึกษาปีที่ 4",

  // คะแนนต่อข้อ
  POINTS_PER_QUESTION: 10,

  // คะแนนเต็ม
  MAX_SCORE: 100
};
