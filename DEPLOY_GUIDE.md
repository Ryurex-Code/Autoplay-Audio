# 🚀 Panduan Deploy & Mengatasi Masalah Auto-Play di Vercel

## ⚠️ **Masalah yang Umum Terjadi:**

Ketika website di-deploy di Vercel dan idle terlalu lama, musik tidak auto-play karena:

1. **Browser Throttling** - Browser memperlambat JavaScript di tab yang tidak aktif
2. **Browser Autoplay Policy** - Browser memblokir autoplay tanpa interaksi user
3. **Tab Inactive** - Interval dan timer berjalan lambat saat tab tidak aktif

## ✅ **Solusi yang Telah Diterapkan:**

### 1. **Wake Lock API**
- Mencegah device masuk sleep mode
- Menjaga tab tetap aktif
- Otomatis re-request saat visibility berubah

### 2. **Page Visibility API**
- Monitor status tab (aktif/tidak aktif)
- Memberikan warning visual saat tab tidak aktif
- Logging untuk debugging

### 3. **Audio Preload**
- Audio di-preload otomatis (`preload="auto"`)
- Load audio sebelum play jika belum ready
- Retry mechanism jika gagal play

### 4. **Notification API**
- Menampilkan notifikasi saat musik diputar
- User aware meskipun tab tidak aktif
- Auto request permission saat page load

### 5. **Enhanced Logging**
- Console log untuk debugging
- Track waktu check dan status
- Monitor attempt play audio

## 📋 **Cara Kerja di Production:**

### **Persyaratan:**
✅ Tab browser **HARUS tetap terbuka**
✅ Browser **TIDAK boleh minimize** (atau akan throttle)
✅ Device **TIDAK boleh sleep/lock**
✅ User **HARUS berinteraksi** sekali (klik play pertama kali)

### **Best Practice:**
1. Buka website di tab khusus
2. Klik "Play Music" sekali untuk memberikan user gesture
3. Izinkan notifikasi saat diminta
4. Jangan minimize atau switch tab terlalu lama
5. Gunakan device yang selalu on (PC/laptop, bukan mobile idle)

## 🔧 **Tips Deployment di Vercel:**

### **1. Environment Variables (Opsional)**
Tidak diperlukan untuk aplikasi ini karena pure frontend.

### **2. Vercel.json Configuration**
File ini sudah optimal dengan default Next.js.

### **3. Audio File**
Pastikan `music.mp3` ada di folder `/public/`:
```
public/
  ├── music.mp3     ← File musik Anda
  ├── favicon.ico
  └── ...
```

### **4. Build Settings di Vercel:**
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

## 🎯 **Solusi Alternatif (Jika Masih Gagal):**

### **Opsi 1: Dedicated Device**
Gunakan device khusus (PC/tablet) yang:
- Selalu on 24/7
- Browser selalu terbuka di tab ini
- Screen tidak auto-lock

### **Opsi 2: Kiosk Mode**
Gunakan browser dalam kiosk mode:
```bash
# Chrome Kiosk Mode
chrome.exe --kiosk --autoplay-policy=no-user-gesture-required "https://your-site.vercel.app"
```

### **Opsi 3: Browser Extension**
Install extension yang mencegah tab throttling:
- "Keep Tab Active"
- "Auto Refresh Plus"

### **Opsi 4: Progressive Web App (PWA)**
Convert ke PWA dengan Service Worker untuk background capability.

### **Opsi 5: External Scheduler**
Gunakan service seperti:
- **Cron Job** untuk ping website setiap menit
- **UptimeRobot** untuk keep website awake
- **Zapier/Make** untuk schedule trigger

## 📱 **Testing di Vercel:**

1. Deploy ke Vercel
2. Buka website
3. Klik "Play Music" sekali (untuk user gesture)
4. Izinkan notifikasi
5. Biarkan tab terbuka dan active
6. Tunggu waktu trigger
7. Cek console log untuk debugging

## 🐛 **Debugging:**

Jika musik tidak play:

1. **Cek Console Log:**
   - Buka Developer Tools (F12)
   - Lihat tab Console
   - Perhatikan log "Current", "Target", "Attempting to play"

2. **Cek Status Indicator:**
   - Lihat warning "Tab tidak aktif"
   - Status "Playing" atau "Stopped"

3. **Cek Notifikasi:**
   - Pastikan permission granted
   - Notifikasi muncul saat play

4. **Test Manual:**
   - Klik tombol Play manual
   - Jika berhasil = audio OK, masalah di autoplay
   - Jika gagal = check file music.mp3

## 🎓 **Penjelasan Teknis:**

### **Mengapa Tab Harus Aktif?**
Browser modern (Chrome, Firefox, Safari) mengimplementasikan **Background Tab Throttling**:
- `setInterval` diperlambat hingga 1000ms minimum
- Timer tidak akurat saat tab tidak aktif
- Audio autoplay diblokir tanpa user gesture

### **Mengapa Perlu User Gesture?**
Browser **Autoplay Policy** melarang audio/video play otomatis tanpa:
- Klik
- Touch
- Keyboard input

Solusi: User harus klik "Play" sekali di awal untuk memberikan gesture.

### **Wake Lock API**
Mencegah screen sleep, tapi **TIDAK** bisa:
- Prevent browser throttling sepenuhnya
- Override autoplay policy
- Keep tab active jika minimize

## 📚 **Resources:**

- [MDN - Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)
- [MDN - Wake Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API)
- [Chrome Autoplay Policy](https://developer.chrome.com/blog/autoplay/)
- [Vercel Deployment Docs](https://vercel.com/docs)

---

**Kesimpulan:**
Website akan bekerja optimal di Vercel **jika tab tetap terbuka dan aktif**. Untuk use case 24/7 tanpa monitoring, pertimbangkan solusi alternatif seperti dedicated device atau backend scheduler.
