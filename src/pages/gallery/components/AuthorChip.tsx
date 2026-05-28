type Props = {
  name: string
  avatar: string
}

export function AuthorChip({ name, avatar }: Props) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-(--color-edge) bg-(--color-surface)/60 py-1 pr-4 pl-1 text-sm">
      <img
        src={avatar}
        alt={name}
        className="size-7 rounded-full object-cover"
        loading="lazy"
      />
      <span className="font-medium text-(--color-accent)">{name}</span>
    </span>
  )
}
