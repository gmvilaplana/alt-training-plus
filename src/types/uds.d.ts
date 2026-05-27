// @telus-uds package.json `exports` fields don't expose their types map.
// TypeScript with `moduleResolution: "bundler"` honors `exports` strictly,
// so we provide minimal ambient declarations here. The runtime is
// fully-typed JSX via React; this file only unblocks the type-check.

declare module '@telus-uds/components-web' {
  import type { ComponentType, ReactNode } from 'react'

  type AnyProps = Record<string, unknown> & { children?: ReactNode }

  export const BaseProvider: ComponentType<
    AnyProps & { defaultTheme: unknown; themeOptions?: unknown }
  >
  export const Box: ComponentType<AnyProps>
  export const Card: ComponentType<AnyProps>
  export const Divider: ComponentType<AnyProps>
  export const StackView: ComponentType<AnyProps>
  export const Typography: ComponentType<AnyProps>
}

declare module '@telus-uds/theme-allium' {
  const theme: unknown
  export default theme
}

declare module '@telus-uds/palette-allium' {
  const palette: unknown
  export default palette
}
