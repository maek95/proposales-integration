import Image from "next/image";

/** A rounded photo that fills its box - give it a height (or a flex size) through `className`. */
export default function Photo({
  src,
  alt,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  /** How wide the photo shows, for next/image to pick a size: "(min-width: 900px) 50vw, 100vw". */
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-panel bg-panel ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
