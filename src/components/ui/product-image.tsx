import Image from "next/image";

type ProductImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  onImageClick?: (src: string, alt: string) => void;
};

export function ProductImage({
  src,
  alt,
  priority = false,
  className = "",
  onImageClick,
}: ProductImageProps) {
  return (
    <div className={`relative aspect-[4/4.4] w-full overflow-hidden rounded-xl bg-zinc-100 md:aspect-[4/5] ${className}`.trim()}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        onClick={() => onImageClick?.(src, alt)}
        className={`object-cover ${onImageClick ? "cursor-zoom-in" : ""}`.trim()}
      />
    </div>
  );
}
