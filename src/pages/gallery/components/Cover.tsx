// Photographic cover for the gallery page.
export function Cover() {
  return (
    <div className="relative aspect-[3/1] overflow-hidden rounded-3xl md:aspect-[5/2]">
      <img
        src="/cover.jpg"
        alt="The GM2 ALT Training crew gathered around a laptop"
        width={1536}
        height={1024}
        className="absolute inset-0 size-full object-cover"
        loading="eager"
        decoding="async"
      />
      {/* subtle vignette so type below the cover keeps separation */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-(--color-canvas)/60"
      />
    </div>
  )
}
