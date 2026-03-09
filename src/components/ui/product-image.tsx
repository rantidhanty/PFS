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
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onClick={() => onImageClick?.(src, alt)}
        className={`absolute inset-0 h-full w-full object-cover ${onImageClick ? "cursor-zoom-in" : ""}`.trim()}
      />
    </div>
  );
}
