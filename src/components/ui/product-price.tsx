import type { ProductPrice } from "@/data/products";
import { formatRupiah, getDiscountedPrice } from "@/data/products";

interface Props {
  price: ProductPrice;
  size?: "sm" | "md";
}

export function ProductPriceDisplay({ price, size = "md" }: Props) {
  if (price.type === "contact") {
    return (
      <p className={`font-bold text-zinc-400 ${size === "sm" ? "text-xs" : "text-sm"}`}>
        Hubungi Admin
      </p>
    );
  }

  const discounted = getDiscountedPrice(price.base);
  const saved = price.base - discounted;
  const prefix = price.type === "from" ? "Mulai dari " : "";

  return (
    <div>
      <del className={`block text-zinc-400 ${size === "sm" ? "text-[10px]" : "text-xs"}`}>
        {prefix}{formatRupiah(price.base)}
      </del>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className={`font-bold text-sky-600 ${size === "sm" ? "text-xs" : "text-sm"}`}>
          {prefix}{formatRupiah(discounted)}
        </span>
        <span className={`rounded-full bg-green-100 font-bold text-green-700 ${size === "sm" ? "px-1.5 py-px text-[9px]" : "px-2 py-0.5 text-[10px]"}`}>
          HEMAT {formatRupiah(saved)}
        </span>
      </div>
    </div>
  );
}
