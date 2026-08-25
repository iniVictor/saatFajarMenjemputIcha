# Teknologi & Stack

Undangan digital v.2.0 adalah **Single Page Application** (SPA) Vite. Data pernikahan hidup di konfigurasi; ucapan/RSVP disimpan di MongoDB Atlas lewat API serverless `/api/wishes`.

## Ringkasan

| Layer | Teknologi | Versi |
| --- | --- | --- |
| UI library | React | 19 |
| Bahasa | TypeScript | 6 (strict) |
| Bundler | Vite | 8 |
| Styling | Tailwind CSS | 4 |
| Animasi | Framer Motion | 13 |
| Ikon | Lucide React | 1 |
| Database | MongoDB Atlas | — |
| API | Vercel Functions | — |
| Linter | Oxlint | 1 |
| Package manager | npm | — |

Runtime: **browser modern** (Chrome, Safari, Firefox, Edge). Target utama: **ponsel**.

## Core

### React 19 + TypeScript

Komponen fungsional, hooks, tanpa class component. TypeScript strict: data undangan, RSVP, dan props bertipe di `src/types/wedding.ts`. Tidak memakai `any`.

### Vite 8

Dev server cepat, build ke folder `dist/`. Alias `@` mengarah ke `src/`. Plugin:

- `@vitejs/plugin-react` — JSX/TSX
- `@tailwindcss/vite` — Tailwind 4

Perintah:

```bash
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview  # preview hasil build
npm run lint     # oxlint
```

## Styling & desain

### Tailwind CSS 4

Utility-first. Token desain (warna, font, jarak) di CSS variables:

- `src/styles/globals.css` — nilai default
- `src/config/wedding.ts` → `theme` — diaplikasikan ke `:root` saat runtime (`ThemeBoot`)

Layout produk: kolom mobile **maks 430px**, terpusat di desktop. Safe area: `env(safe-area-inset-bottom)` untuk nav dan tombol musik.

### Font (Google Fonts)

Dimuat di `index.html`:

| Peran | Font | CSS class / variable |
| --- | --- | --- |
| Nama pasangan | Great Vibes | `--font-script` / `.font-script` |
| Judul editorial | Cormorant Garamond | `--font-display` / `.font-display` |
| Label kecil | Cinzel | `--font-heading` / `.font-heading` |
| Body, salam, UI | Outfit | `--font-body` |

### Animasi

Framer Motion untuk masuk viewport (`whileInView`), overlay buka undangan, dan toast. Preset di `src/utils/motion.ts`. `prefers-reduced-motion` dihormati.

### Ikon

Lucide React. Ikon merek (Instagram) digambar SVG sendiri karena Lucide 1 tidak mengekspor ikon brand.

## Routing & halaman

Tidak memakai React Router. Routing ringan dari `window.location.pathname`:

| Path | Halaman |
| --- | --- |
| `/` | Undangan |
| `/?to=Nama%20Tamu` | Undangan + nama tamu |
| `/kirimUndangan` | Generator tautan tamu |

Refresh `/kirimUndangan` didukung Vite (history fallback). Hosting statis perlu rewrite semua path ke `index.html`.

Nama tamu: `encodeURIComponent` / `decodeURIComponent`. Spasi dan `&` aman. Nilai query tidak pernah di-inject sebagai HTML.

## Arsitektur folder

```text
src/
  App.tsx                 # pilih undangan vs generator
  main.tsx
  config/wedding.ts       # semua data & tema (sumber kustomisasi)
  types/wedding.ts
  services/wishService.ts # GET/POST /api/wishes (MongoDB)
  hooks/                  # countdown, musik, scroll spy, guest, toast
  pages/KirimUndangan.tsx
  components/             # section UI
  utils/
  styles/globals.css
api/
  wishes.ts               # GET/POST ucapan
lib/
  mongodb.ts              # koneksi Atlas
  wishStore.ts            # baca/tulis collection wishes
public/
  images/
  music/
```

Kustomisasi undangan: ubah `src/config/wedding.ts` + file di `public/`. Komponen tidak perlu diubah.

## State & data

| Data | Penyimpanan |
| --- | --- |
| Nama, acara, rekening, copy, tema | `wedding.ts` (compile-time) |
| Status buka undangan | `sessionStorage` (per tab) |
| Ucapan & konfirmasi hadir | MongoDB Atlas via `/api/wishes` |
| Musik loop | config `loopStart` / `loopEnd` (detik) |

`wishService` memanggil API serverless. Data yang sama terlihat di semua perangkat.

## Fitur teknis terkait undangan

- **Countdown** — interval 1 detik, cleanup saat unmount
- **Galeri** — lightbox, keyboard, swipe, portal ke shell
- **Musik** — play setelah gesture “Buka Undangan”; loop segmen
- **Clipboard** — `navigator.clipboard` + fallback `execCommand`
- **Crop foto** — `positionX`, `positionY`, `zoom` di config (cover, bride, groom)
- **Section opsional** — `enabled: false` menghapus section (streaming, akad, love story, musik, hadiah)

## Yang tidak dipakai (sengaja)

- Next.js / SSR — undangan adalah SPA Vite + API serverless
- React Router — hanya dua path
- State library (Redux, Zustand) — state lokal sudah cukup

## Font stack di CSS

```css
--font-display: "Cormorant Garamond", "Times New Roman", serif;
--font-script: "Great Vibes", "Palatino", cursive;
--font-heading: "Cinzel", "Palatino", serif;
--font-body: "Outfit", "Segoe UI", sans-serif;
```

Nilai ini bisa diganti di `theme.fonts` pada `wedding.ts`.
