import type { Wish } from "@/types/wedding";

export const initialWishes: Wish[] = [
  {
    id: "wish-1",
    name: "Budi",
    message: "Selamat menempuh hidup baru. Semoga menjadi keluarga yang sakinah.",
    attendance: "attending",
    createdAt: "2026-04-12T22:28:00+07:00",
  },
  {
    id: "wish-2",
    name: "Siti",
    message: "Barakallahu laka wa baraka 'alaika. Lancar sampai hari H.",
    attendance: "attending",
    createdAt: "2026-05-13T11:12:00+07:00",
  },
  {
    id: "wish-3",
    name: "Andi",
    message: "Ikut bahagia mendengar kabar ini. Doa terbaik untuk kalian berdua.",
    attendance: "attending",
    createdAt: "2026-05-16T19:42:00+07:00",
  },
  {
    id: "wish-4",
    name: "Rina",
    message: "Mohon maaf belum bisa hadir. Semoga acaranya diberkahi.",
    attendance: "not_attending",
    createdAt: "2026-06-02T10:15:00+07:00",
  },
];
