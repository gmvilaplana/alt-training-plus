// Photographic cover for the gallery page.
export function Cover() {
  return (
    <div className="relative aspect-[3/1] overflow-hidden rounded-3xl md:aspect-[5/2]">
      <img
        src="/cover-alt.jpeg"
        alt="Line-drawing collage of Latin American cityscapes — the Buenos Aires Obelisco, Café Tortoni and Av. de Mayo tram, and São Paulo's Av. Paulista and Edifício Copan"
        width={1024}
        height={559}
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
