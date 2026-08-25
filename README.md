# Undangan Digital Icha & Fajar

Premium Indonesian wedding invitation website. All couple data, copy, colors, and photos live in configuration so the same template can be reused without touching components.

Stack dan versi paket: lihat [STACK.md](./STACK.md).

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Personalize the guest name with:

```text
http://localhost:5173/?to=Victor%20Ang
```

If `to` is missing, the invitation shows **Tamu Undangan**.

Generate personalized links from [http://localhost:5173/kirimUndangan](http://localhost:5173/kirimUndangan). Spaces and `&` are encoded automatically (`Victor Ang` → `/?to=Victor%20Ang`, `Bapak & Ibu` → `/?to=Bapak%20%26%20Ibu`).

## Build

```bash
npm run build
npm run preview
```

## Deploy (Vercel)

SPA routes like `/kirimUndangan` need a rewrite to `index.html`. File `vercel.json` already does that. After deploy, open:

```text
https://<domain>/kirimUndangan
```

Framework: Vite. Root directory: repository root (this folder).

## Customization

Change these two places. You should not need to edit React components.

1. `src/config/wedding.ts`
2. `public/images/` (and `public/music/` for audio)

### Names, parents, Instagram

Edit `couple.bride` and `couple.groom`:

- `name` — short name on the cover and hero
- `fullName` — couple section
- `father` / `mother` / `orderLabel`
- `instagram`
- `image` — path under `public/`

### Photos

Replace files in `public/images/` using the same names, or point the config paths to new files:

| File | Used for |
| --- | --- |
| `cover.jpg` | Opening screen. Geser crop lewat `cover.positionX` / `cover.positionY` di `wedding.ts` (0–100). `positionX`: 0 kiri, 50 tengah, 100 kanan. `positionY`: 0 atas, 50 tengah, 100 bawah. |
| `hero.jpg` | Hero + closing portrait |
| `bride.jpg` / `groom.jpg` | Couple section. Atur crop di masing-masing `couple.bride` / `couple.groom`: `positionX` (0 kiri – 100 kanan), `positionY` (0 atas – 100 bawah), `zoom` (1 normal, sampai 20). |
| `story-01.jpg` … | Love story. Sembunyikan seluruh section dengan `loveStory.enabled: false`. |
| `gallery-01.jpg` … | Gallery |
| `decor-floral-01.svg` / `decor-floral-02.svg` | Corner ornaments |
| `decor-wreath.svg` | Hero frame |

Use `object-fit` friendly portraits. Crop in your editor; the site does not stretch photos.

### Date and countdown

```ts
wedding: {
  dateLabel: "Minggu, 4 Oktober 2026",
  countdownDate: "2026-10-04T08:00:00+07:00",
}
```

`countdownDate` must be a valid ISO timestamp.

### Events and maps

Enable or disable `events.akad` and `events.reception`. Put a Google Maps URL in `mapsUrl`. Empty or disabled events are not rendered.

### Streaming

```ts
streaming: { enabled: false }
```

hides the section. Set `enabled: true` and a `url` to show **Watch Live**.

### Gallery

`gallery` is an array of image paths. Leave it empty to hide the gallery.

### Bank and physical gift

- `bankAccounts` — digital envelope cards (`bank`, `accountNumber`, `accountHolder`, `logo`)
- `gift.enabled` — physical gift block

### Music

```ts
music: {
  enabled: true,
  src: "/music/wedding.mp3",
  title: "Lagu latar undangan",
  loopStart: 12,
  loopEnd: 72,
}
```

`loopStart` and `loopEnd` are in seconds. The player loops only that segment. Set `loopEnd` to `0` to play through the end of the file. Replace the file in `public/music/`. Set `enabled: false` to remove the player. Playback starts after **Buka Undangan** because browsers block autoplay.

### Colors and fonts

`theme.colors` and `theme.fonts` are applied as CSS variables at runtime. Fonts themselves are loaded in `index.html` from Google Fonts. To change typefaces:

1. Update the Google Fonts `<link>` in `index.html`
2. Update `theme.fonts` in `wedding.ts`

### Copy and SEO

All Indonesian/English phrases live in `copy`. Page title, description, and Open Graph image live in `seo`.

## Architecture

```text
src/
  components/   UI sections
  config/       wedding.ts
  data/         mock RSVP seed
  hooks/
  services/     wishService (localStorage, API-ready)
  types/
  utils/
  styles/       design tokens
public/
  images/
  music/
```

Wishes are stored in `localStorage` through `src/services/wishService.ts`. Swap that module later for REST, Laravel, Supabase, or Firebase without rewriting the form.

## Assumptions

- Desktop uses a centered mobile column (max 430px), matching commercial Indonesian invitation products.
- Opening state is stored in `sessionStorage` for the current tab only.
- Guest names from `?to=` are sanitized as plain text and never injected as HTML.
