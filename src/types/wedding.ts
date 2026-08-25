export type Attendance = "attending" | "not_attending";

export interface Person {
  name: string;
  fullName: string;
  father: string;
  mother: string;
  orderLabel: string;
  instagram: string;
  image: string;
  imageAlt: string;
  positionX: number;
  positionY: number;
  zoom: number;
}

export interface WeddingEvent {
  enabled: boolean;
  title: string;
  dateLabel: string;
  time: string;
  location: string;
  address: string;
  mapsUrl: string;
}

export interface LoveStoryItem {
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface LoveStoryConfig {
  enabled: boolean;
  items: LoveStoryItem[];
}

export interface BankAccount {
  bank: string;
  accountNumber: string;
  accountHolder: string;
  logo: string;
}

export interface PhysicalGift {
  enabled: boolean;
  recipient: string;
  phone: string;
  address: string;
}

export interface StreamingConfig {
  enabled: boolean;
  title: string;
  dateLabel: string;
  time: string;
  url: string;
}

export interface MusicConfig {
  enabled: boolean;
  src: string;
  title: string;
  loopStart: number;
  loopEnd: number;
}

export interface CoverConfig {
  image: string;
  positionX: number;
  positionY: number;
}

export interface QuoteConfig {
  text: string;
  source: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  ogImage: string;
}

export interface ThemeConfig {
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    muted: string;
    nav: string;
    cream: string;
  };
  fonts: {
    display: string;
    script: string;
    heading: string;
    body: string;
  };
}

export interface CopyConfig {
  openingEyebrow: string;
  openButton: string;
  addressedTo: string;
  addressedHonorific: string;
  defaultGuest: string;
  heroIntro: string;
  saveTheDate: string;
  coupleSalam: string;
  coupleInvite: string;
  brideLabel: string;
  groomLabel: string;
  daughterOf: string;
  sonOf: string;
  loveStoryTitle: string;
  countdownTitle: string;
  countdownComplete: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  viewLocation: string;
  streamingTitle: string;
  watchLive: string;
  galleryTitle: string;
  digitalGiftTitle: string;
  digitalGiftBody: string;
  sendGift: string;
  copy: string;
  copiedAccount: string;
  copiedPhone: string;
  copiedAddress: string;
  physicalGiftTitle: string;
  recipientLabel: string;
  phoneLabel: string;
  addressLabel: string;
  wishesTitle: string;
  wishesSubtitle: string;
  attendingLabel: string;
  notAttendingLabel: string;
  namePlaceholder: string;
  messagePlaceholder: string;
  attendancePrompt: string;
  sendWish: string;
  wishSuccess: string;
  closingThanks: string;
  closingSalam: string;
  thankYou: string;
}

export interface WeddingConfig {
  couple: {
    bride: Person;
    groom: Person;
    ampersand: string;
  };
  wedding: {
    dateLabel: string;
    countdownDate: string;
  };
  cover: CoverConfig;
  events: {
    akad: WeddingEvent;
    reception: WeddingEvent;
  };
  quote: QuoteConfig;
  loveStory: LoveStoryConfig;
  gallery: string[];
  streaming: StreamingConfig;
  bankAccounts: BankAccount[];
  gift: PhysicalGift;
  music: MusicConfig;
  seo: SeoConfig;
  theme: ThemeConfig;
  copy: CopyConfig;
}

export interface Wish {
  id: string;
  name: string;
  message: string;
  attendance: Attendance;
  createdAt: string;
}

export interface AttendanceStats {
  attending: number;
  notAttending: number;
}
