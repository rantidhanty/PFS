export type SportCategory =
  | "basketball"
  | "volleyball"
  | "football"
  | "badminton"
  | "padel"
  | "tennis"
  | "official-equipment";

export type ComplianceStandard = "FIBA" | "FIVB" | "BWF" | "FIFA" | "ITF" | "FIP";

export type Product = {
  id: string;
  name: string;
  slug: string;
  sport: SportCategory;
  type: string;
  variant?: string;
  standards: ComplianceStandard[];
  sportTags: string[];
  images: {
    thumb: string;
    gallery: string[];
  };
};

export const products: Product[] = [
  {
    id: "prod-basketball-ring-fiba-portable",
    name: "Ring Basket FIBA Portable",
    slug: "ring-basket-fiba-portable",
    sport: "basketball",
    type: "ring-and-board-system",
    variant: "Portable",
    standards: ["FIBA"],
    sportTags: ["basketball"],
    images: {
      thumb: "/images/products/basketball/ring-basket-fiba/portable/01.jpg",
      gallery: [
        "/images/products/basketball/ring-basket-fiba/portable/01.jpg",
        "/images/products/basketball/ring-basket-fiba/portable/02.jpg",
        "/images/products/basketball/ring-basket-fiba/portable/03.jpg",
        "/images/products/basketball/ring-basket-fiba/portable/04.jpg",
        "/images/products/basketball/ring-basket-fiba/portable/05.jpg",
        "/images/products/basketball/ring-basket-fiba/portable/06.jpg",
      ],
    },
  },
  {
    id: "prod-basketball-ring-fiba-tanam-dinding",
    name: "Ring Basket FIBA Tanam Dinding",
    slug: "ring-basket-fiba-tanam-dinding",
    sport: "basketball",
    type: "ring-and-board-system",
    variant: "Tanam Dinding",
    standards: ["FIBA"],
    sportTags: ["basketball"],
    images: {
      thumb: "/images/products/basketball/ring-basket-fiba/tanam-dinding/01.jpg",
      gallery: [
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/01.jpg",
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/02.jpg",
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/03.jpg",
        "/images/products/basketball/ring-basket-fiba/tanam-dinding/04.jpg",
      ],
    },
  },
  {
    id: "prod-basketball-ring-fiba-tanam-tanah",
    name: "Ring Basket FIBA Tanam Tanah",
    slug: "ring-basket-fiba-tanam-tanah",
    sport: "basketball",
    type: "ring-and-board-system",
    variant: "Tanam Tanah",
    standards: ["FIBA"],
    sportTags: ["basketball"],
    images: {
      thumb: "/images/products/basketball/ring-basket-fiba/tanam-tanah/01.jpg",
      gallery: [
        "/images/products/basketball/ring-basket-fiba/tanam-tanah/01.jpg",
        "/images/products/basketball/ring-basket-fiba/tanam-tanah/02.jpg",
      ],
    },
  },
  {
    id: "prod-volleyball-net-fivb",
    name: "Volleyball Net System",
    slug: "net-volleyball-fivb",
    sport: "volleyball",
    type: "net-and-post-system",
    standards: ["FIVB"],
    sportTags: ["volleyball"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [
        "/images/products/volleyball/net-volleyball-fivb/01.jpg",
        "/images/products/volleyball/net-volleyball-fivb/02.jpg",
      ],
    },
  },
  {
    id: "prod-football-goal-fifa",
    name: "Football Goal 11v11",
    slug: "goal-post-11v11",
    sport: "football",
    type: "goal-post",
    standards: ["FIFA"],
    sportTags: ["football"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [
        "/images/products/football/goal-post-11v11/01.jpg",
        "/images/products/football/goal-post-11v11/02.jpg",
      ],
    },
  },
  {
    id: "prod-badminton-post-bwf",
    name: "Badminton Court Post",
    slug: "court-post-badminton",
    sport: "badminton",
    type: "court-post",
    standards: ["BWF"],
    sportTags: ["badminton"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [
        "/images/products/badminton/court-post-badminton/01.jpg",
        "/images/products/badminton/court-post-badminton/02.jpg",
      ],
    },
  },
  {
    id: "prod-padel-post-fip",
    name: "Tiang Padel",
    slug: "tiang-padel",
    sport: "padel",
    type: "court-post",
    standards: ["FIP"],
    sportTags: ["padel"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [
        "/images/products/padel/tiang-padel/01.jpg",
        "/images/products/padel/tiang-padel/02.jpg",
      ],
    },
  },
  {
    id: "prod-tennis-post-itf",
    name: "Tiang Tenis",
    slug: "tiang-tennis",
    sport: "tennis",
    type: "court-post",
    standards: ["ITF"],
    sportTags: ["tennis"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [
        "/images/products/tennis/tiang-tennis/01.jpg",
        "/images/products/tennis/tiang-tennis/02.jpg",
      ],
    },
  },
  {
    id: "prod-chair-volleyball",
    name: "Kursi Wasit Voli",
    slug: "kursi-volley-wasit",
    sport: "official-equipment",
    type: "referee-chair",
    standards: ["FIVB"],
    sportTags: ["volleyball"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [
        "/images/products/official-equipment/kursi-volley-wasit/01.jpg",
        "/images/products/official-equipment/kursi-volley-wasit/02.jpg",
      ],
    },
  },
  {
    id: "prod-chair-badminton",
    name: "Kursi Wasit Badminton",
    slug: "kursi-badminton-wasit",
    sport: "official-equipment",
    type: "referee-chair",
    standards: ["BWF"],
    sportTags: ["badminton"],
    images: {
      thumb: "/images/placeholder-product.svg",
      gallery: [
        "/images/products/official-equipment/kursi-badminton-wasit/01.jpg",
        "/images/products/official-equipment/kursi-badminton-wasit/02.jpg",
      ],
    },
  },
];

export const sportLabels: Record<SportCategory, string> = {
  basketball: "Basketball",
  volleyball: "Volleyball",
  football: "Sepak Bola",
  badminton: "Badminton",
  padel: "Padel",
  tennis: "Tenis",
  "official-equipment": "Official Equipment",
};
