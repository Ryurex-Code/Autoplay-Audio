# Auto Play Audio Landing Page

Landing page modern untuk otomatis memainkan file audio MP3 pada waktu yang ditentukan.

## 🎵 Fitur

- ⏰ **Real-time Clock** - Menampilkan waktu dan tanggal real-time
- 🎚️ **Toggle Mode** - Pilih antara Default atau Custom Time dengan tombol slide yang smooth
- ⚙️ **Custom Time** - Atur waktu pemutaran musik sesuai keinginan
- 🎶 **Auto Play** - Musik otomatis diputar pada waktu yang ditentukan
- 🎨 **Modern Design** - Desain solid dan modern dengan color palette yang menarik

## 🎨 Color Palette

- Primary: `#FF8501` (Orange)
- Secondary: `#71DBD3` (Cyan/Turquoise)
- Light mode dengan gradasi lembut

## 🚀 Cara Menggunakan

### 1. Install Dependencies

```bash
npm install
```

### 2. Tambahkan File Musik

Letakkan file musik MP3 Anda di folder `public` dengan nama `music.mp3`:

```
public/
  └── music.mp3
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Buka browser dan akses [http://localhost:3000](http://localhost:3000)

### 4. Build untuk Production

```bash
npm run build
npm start
```

## 📖 Cara Kerja

### Mode Default
- Musik akan otomatis diputar pada waktu default (12:00)
- Waktu pemutaran tidak bisa diubah dalam mode ini

### Mode Custom Time
- Geser toggle ke "Custom Time"
- Input waktu pemutaran akan aktif dan bisa diubah
- Musik akan otomatis diputar pada waktu yang telah diatur

## 🛠️ Teknologi

- **Next.js 14** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **React Hooks** - State Management

## 📁 Struktur Project

```
20-autoplay-audio/
├── public/
│   └── music.mp3          # File musik (harus ditambahkan sendiri)
├── src/
│   ├── app/
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Main page
│   └── components/
│       ├── RealTimeClock.tsx   # Komponen jam real-time
│       ├── TimeInput.tsx       # Komponen input waktu
│       └── ToggleButton.tsx    # Komponen toggle button
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 📝 Catatan

- Browser mungkin meminta izin untuk autoplay audio
- Pastikan file `music.mp3` sudah ada di folder `public`
- Musik akan otomatis dimainkan hanya sekali pada waktu yang ditentukan
- Setelah lewat dari waktu yang ditentukan, sistem akan reset dan siap untuk pemutaran berikutnya

## 🔧 Kustomisasi

### Mengubah Waktu Default

Edit file `src/app/page.tsx` pada baris:

```typescript
const defaultPlayTime = "12:00"; // Ubah sesuai kebutuhan
```

### Mengubah Color Palette

Edit file `tailwind.config.ts`:

```typescript
colors: {
  primary: "#FF8501",    // Warna utama
  secondary: "#71DBD3",  // Warna sekunder
}
```

## 📄 License

MIT License - Bebas digunakan untuk keperluan pribadi maupun komersial.

---

Dibuat dengan ❤️ menggunakan Next.js dan Tailwind CSS
