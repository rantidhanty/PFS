import Image from "next/image";

type ProductImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  onImageClick?: (src: string, alt: string) => void;
};

export function ProductImage({
  src,
  alt,
  priority = false,
  className = "",
  imageClassName = "",
  onImageClick,
}: ProductImageProps) {
  return (
    <div className={`relative aspect-[4/4.4] w-full overflow-hidden rounded-xl bg-zinc-100 md:aspect-[4/5] ${className}`.trim()}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, 30vw"
        priority={priority}
        onClick={() => onImageClick?.(src, alt)}
        className={`absolute inset-0 h-full w-full object-cover ${imageClassName} ${onImageClick ? "cursor-zoom-in" : ""}`.trim()}
      />
    </div>
  );
}
