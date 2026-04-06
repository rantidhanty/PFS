const names = [
  "Dicky", "Rizky", "Fajar", "Andi", "Bayu", "Hendra", "Kevin", "Lukman",
  "Panji", "Surya", "Teguh", "Wahyu", "Yoga", "Arif", "Bima", "Dimas",
  "Rendi", "Gilang", "Hafiz", "Irfan", "Joko", "Krisna", "Malik", "Nando",
  "Sari", "Dewi", "Fitri", "Indah", "Maya", "Putri", "Rini", "Wulan",
  "Ayu", "Bella", "Citra", "Dina", "Eka", "Fani", "Nisa", "Yuni",
];

const cities = [
  "Jakarta", "Bekasi", "Bandung", "Surabaya", "Medan",
  "Makassar", "Semarang", "Yogyakarta", "Depok", "Tangerang",
  "Bogor", "Malang", "Denpasar", "Palembang", "Balikpapan",
  "Pekanbaru", "Batam", "Banjarmasin", "Pontianak", "Manado",
];

const products = [
  "Ring Basket Portable V1",
  "Ring Basket Portable V2",
  "Ring Basket Dinding",
  "Ring Basket Tanam",
  "Tiang Voli Portable",
  "Tiang Voli Tanam",
  "Tiang Gawang Futsal",
  "Tiang Badminton Portable",
  "Tiang Padel",
  "Tiang Tenis",
  "Kursi Wasit Voli",
  "Kursi Wasit Badminton V1",
  "Kursi Wasit Badminton V2",
  "Kursi Wasit Badminton V3",
  "Kursi Wasit Tenis",
];

const times = [
  "baru saja",
  "1 menit lalu",
  "2 menit lalu",
  "3 menit lalu",
  "5 menit lalu",
  "10 menit lalu",
  "15 menit lalu",
  "30 menit lalu",
  "1 jam lalu",
  "2 jam lalu",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export type SocialProofEntry = {
  name: string;
  city: string;
  product: string;
  time: string;
};

export function getRandomSocialProof(): SocialProofEntry {
  return {
    name: pick(names),
    city: pick(cities),
    product: pick(products),
    time: pick(times),
  };
}
