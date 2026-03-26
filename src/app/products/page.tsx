import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsPageContent from "./products-content";

export const metadata: Metadata = {
  title: "Katalog Produk",
  description:
    "Jual ring basket FIBA, tiang voli FIVB, gawang futsal FIFA, tiang badminton BWF, tiang padel FIP, tiang tenis ITF di Bekasi. Standar kompetisi, custom order tersedia. Pengiriman seluruh Indonesia.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Katalog Produk | ProFabric Steel",
    description:
      "Jual ring basket FIBA, tiang voli FIVB, gawang futsal FIFA, tiang badminton BWF di Bekasi. Standar kompetisi, custom order tersedia.",
  },
};

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsPageContent />
    </Suspense>
  );
}
