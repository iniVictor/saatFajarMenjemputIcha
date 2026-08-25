import type { WeddingConfig } from "@/types/wedding";

export const weddingConfig: WeddingConfig = {
  couple: {
    ampersand: "&",
    bride: {
      name: "Icha",
      fullName: "Wardatun Nafisah",
      father: "Bapak Roesdianto",
      mother: "Ibu Nurfidiyah",
      orderLabel: "Putri pertama",
      instagram: "https://instagram.com/wardha_icha",
      image: "/images/bride.webp",
      imageAlt: "Wardatun Nafisah",
      positionX: 35,
      positionY: 50,
      zoom: 2.9,
    },
    groom: {
      name: "Fajar",
      fullName: "Fajar Hidayatulloh",
      father: "Bapak Mohamad Khozin",
      mother: "Ibu Astutik",
      orderLabel: "Putra pertama",
      instagram: "https://instagram.com/fajarh33__",
      image: "/images/groom.webp",
      imageAlt: "Fajar Hidayatulloh",
      positionX: 67,
      positionY: 45,
      zoom: 4.2,
    },
  },

  wedding: {
    dateLabel: "Minggu, 4 Oktober 2026",
    countdownDate: "2026-10-04T08:00:00+07:00",
  },

  cover: {
    image: "/images/cover.webp",
    heroImage: "/images/hero.webp",
    positionX: 47,
    positionY: 20,
  },

  events: {
    akad: {
      enabled: false,
      title: "Akad Nikah",
      dateLabel: "Minggu, 4 Oktober 2026",
      time: "08.00 WIB",
      location: "Widyagraha Hall",
      address:
        "Jl. Borobudur No.35, Mojolangu, Kec. Lowokwaru, Kota Malang",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Widyagraha+Hall+Jl.+Borobudur+No.35+Mojolangu+Lowokwaru+Malang",
    },
    reception: {
      enabled: true,
      title: "Resepsi",
      dateLabel: "Minggu, 4 Oktober 2026",
      time: "11.00 – 12.00 WIB",
      location: "Widyagraha Hall",
      address:
        "Jl. Borobudur No.35, Mojolangu, Kec. Lowokwaru, Kota Malang",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Widyagraha+Hall+Jl.+Borobudur+No.35+Mojolangu+Lowokwaru+Malang",
    },
  },

  quote: {
    text: "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.",
    source: "QS. Ar-Rum : 21",
  },

  loveStory: {
    enabled: false,
    items: [
    {
      title: "Pertemuan Pertama",
      date: "15 Agustus 2025",
      description:
        "Dari obrolan yang terasa ringan, kami belajar mengenali satu sama lain. Ada ketenangan yang tumbuh pelan, tanpa perlu dikesankan.",
        image: "/images/story-01.webp",
    },
    {
      title: "Lamaran",
      date: "14 Juni 2026",
      description:
        "Dengan restu keluarga, kami memilih menapaki jalan yang lebih pasti. Hari itu menjadi doa yang diucapkan bersama, bukan hanya janji di antara dua orang.",
        image: "/images/story-02.webp",
    },
    {
      title: "Menuju Hari Bahagia",
      date: "September 2026",
      description:
        "Kini kami bersiap menyatukan langkah dalam ikatan yang kami jaga dengan iman, kesabaran, dan kasih yang terus belajar.",
        image: "/images/story-03.webp",
    },
    ],
  },

  gallery: [
    "/images/gallery-01.webp",
    "/images/gallery-02.webp",
    "/images/gallery-03.webp",
    "/images/gallery-04.webp",
    "/images/gallery-05.webp",
    "/images/gallery-06.webp",
    "/images/gallery-07.webp",
    "/images/gallery-08.webp",
    "/images/gallery-10.webp",
    "/images/gallery-11.webp",
    "/images/gallery-12.webp",
    "/images/gallery-13.webp",
    "/images/gallery-14.webp",
    "/images/gallery-20.webp",
  ],

  streaming: {
    enabled: false,
    title: "Live Streaming",
    dateLabel: "Minggu, 4 Oktober 2026",
    time: "08.00 WIB",
    url: "https://www.youtube.com/",
  },

  bankAccounts: [
    {
      bank: "BCA",
      accountNumber: "0113171593",
      accountHolder: "Fajar Hidayatullah",
      logo: "/images/bank-bca.svg",
    },
    {
      bank: "BCA",
      accountNumber: "4400117654",
      accountHolder: "Wardatun Nafisah",
      logo: "/images/bank-bca.svg",
    },
  ],

  gift: {
    enabled: true,
    recipient: "Wardatun Nafisah",
    phone: "082245389018",
    address:
      "Jl. Kalpataru No.105, Kel. Jatimulyo, Kec. Lowokwaru, Kota Malang",
  },

  music: {
    enabled: true,
    src: "/music/The Way You Look At Me - Christian Bautista (Piano Karaoke).mp3",
    title: "Lagu latar undangan",
    loopStart: 8,
    loopEnd: 40,
  },

  seo: {
    title: "The Wedding of Icha & Fajar",
    description: "Our wedding invitation.",
    ogImage: "/images/cover.webp",
  },

  theme: {
    colors: {
      background: "#f3e8d8",
      surface: "#fbf6ee",
      primary: "#8d6249",
      secondary: "#3f3128",
      accent: "#c4a574",
      text: "#3c2d24",
      muted: "#8b7364",
      nav: "#9a7b64",
      cream: "#fff8ee",
    },
    fonts: {
      display: '"Cormorant Garamond", "Times New Roman", serif',
      script: '"Great Vibes", "Palatino", cursive',
      heading: '"Cinzel", "Palatino", serif',
      body: '"Outfit", "Segoe UI", sans-serif',
    },
  },

  copy: {
    openingEyebrow: "The Wedding of",
    openButton: "Buka Undangan",
    addressedTo: "Kepada Yth.",
    addressedHonorific: "Bapak/Ibu/Saudara/i",
    defaultGuest: "Tamu Undangan",
    heroIntro: "Kami berharap Anda menjadi bagian dari hari istimewa kami.",
    saveTheDate: "Save The Date",
    coupleSalam: "Assalamu'alaikum Wr. Wb.",
    coupleInvite:
      "Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri acara pernikahan kami.",
    brideLabel: "The Bride",
    groomLabel: "The Groom",
    daughterOf: "dari",
    sonOf: "dari",
    loveStoryTitle: "Love Story",
    countdownTitle: "Menghitung Hari",
    countdownComplete: "Alhamdulillah, hari bahagia telah tiba.",
    days: "Hari",
    hours: "Jam",
    minutes: "Menit",
    seconds: "Detik",
    viewLocation: "Lihat Lokasi",
    streamingTitle: "Live Streaming",
    watchLive: "Watch Live",
    galleryTitle: "Galeri Foto",
    digitalGiftTitle: "Amplop Digital",
    digitalGiftBody:
      "Doa restu Anda adalah hadiah yang paling berarti. Jika berkenan memberikan tanda kasih, Anda dapat mengirimkannya secara cashless.",
    sendGift: "Kirim Hadiah",
    copy: "Salin",
    copiedAccount: "Nomor rekening berhasil disalin",
    copiedPhone: "Nomor telepon berhasil disalin",
    copiedAddress: "Alamat berhasil disalin",
    physicalGiftTitle: "Kirim Hadiah",
    recipientLabel: "Nama Penerima",
    phoneLabel: "No. HP",
    addressLabel: "Alamat",
    wishesTitle: "Ucapkan Sesuatu",
    wishesSubtitle: "Berikan Ucapan & Doa Restu",
    attendingLabel: "Hadir",
    notAttendingLabel: "Tidak Hadir",
    namePlaceholder: "Nama",
    messagePlaceholder: "Tulis ucapan dan doa restu...",
    attendancePrompt: "Konfirmasi kehadiran",
    sendWish: "Kirim",
    wishSuccess: "Terima kasih, ucapan Anda telah kami terima.",
    closingThanks:
      "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.",
    closingSalam: "Wassalamu'alaikum Wr. Wb.",
    thankYou: "Thank You",
  },
};
