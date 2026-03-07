import Image from "next/image";

type ProductImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export function ProductImage({
  src,
  alt,
  priority = false,
  className = "",
}: ProductImageProps) {
  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-100 ${className}`.trim()}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover"
      />
    </div>
  );
}
