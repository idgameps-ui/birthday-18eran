# 🎂 Interactive Birthday Greeting Website (เว็บอวยพรวันเกิด)

A single-page interactive Birthday Greeting Website designed with a modern, clean, and warm pastel aesthetic.

## ✨ Features
1. **Hero Section**:
   - Animated celebratory typography with custom name display.
   - Floating pastel balloons and shimmering decorative elements.
   - Automatic confetti explosion on page load.
2. **Interactive Candle Blowing & Birthday Cake**:
   - Beautiful CSS-illustrated cake with glowing, flickering candles.
   - Click "เป่าเทียนวันเกิด (Blow Candles)" or tap any candle flame to extinguish the flames with rising smoke effect.
   - Confetti burst & celebratory chime sound upon blowing candles.
   - Revealing heartwarming wish card with a button to relight the candles anytime.
3. **Surprise Gift Box**:
   - Interactive 3D gift box that lifts its lid when clicked.
   - Reveals an adorable customizable birthday coupon/voucher card inside.
4. **3x2 Photo Gallery Grid**:
   - Clean, aesthetic polaroid/card grid with smooth hover zoom & tilt effects.
   - Built-in full-screen Lightbox Modal with Next/Previous navigation and keyboard shortcuts (`Esc`, `←`, `→`).
5. **Wishes & Message Card**:
   - Elegant greeting card with golden foil borders, decorative corners, and wax seal badge.
   - Heartfelt 3-4 sentence message in Thai.
   - Bonus "จุดพลุเฉลิมฉลอง (Confetti)" button.
6. **Floating Background Music Toggle**:
   - Soft floating disc player with spinning vinyl animation.
   - Built-in Web Audio API "Happy Birthday" music-box synthesizer (works offline with 0 external dependencies).
   - Easily swap with your own MP3 song!

---

## 🛠️ How to Customize (วิธีแก้ไขข้อมูลเป็นของคุณเอง)

All customization options are clearly marked with comments in `script.js` and `index.html`:

### 1. เปลี่ยนชื่อเจ้าของวันเกิด
- **วิธีที่ 1 (แนะนำ)**: เปิดไฟล์ `script.js` แล้วแก้ไขที่ส่วนบนสุด:
  ```javascript
  const CONFIG = {
    birthdayName: "ชื่อของคุณ",
    ...
  }
  ```
- **วิธีที่ 2**: แก้ไขโดยตรงใน `index.html` ที่ `<span class="birthday-name" id="display-name">...</span>`

### 2. เปลี่ยนข้อความอวยพร (Wishes)
- แก้ไขใน `script.js` ในส่วน `wishes: [ ... ]` หรือแก้ไขใน `index.html` ที่ `<div class="card-body-text">`

### 3. เปลี่ยนรูปภาพใน Photo Gallery
- แก้ไขรูปภาพใน `index.html` หรือ `script.js` โดยเปลี่ยน `src` และ `caption` เป็นลิงก์รูปภาพของคุณเอง (เช่น ลิงก์ออนไลน์ หรือ path รูปในเครื่อง เช่น `images/photo1.jpg`).

### 4. เปลี่ยนเพลงเป็น MP3 ของคุณเอง
- ใน `script.js`:
  ```javascript
  musicUrl: "my-song.mp3", // หรือใส่ URL เพลงออนไลน์
  ```
- หากปล่อยเป็น `""` (ค่าเริ่มต้น) เว็บจะเล่นเสียงดนตรี Music Box สังเคราะห์อัตโนมัติ ไม่ต้องกังวลเรื่องไฟล์หายหรือลิขสิทธิ์!

---

## 🚀 How to Run (วิธีเปิดใช้งาน)
เพียงดับเบิลคลิกเปิดไฟล์ `index.html` ในเว็บเบราว์เซอร์ใดก็ได้ (Chrome, Edge, Safari, Firefox) หรือใช้ Live Server ใน VS Code!