type Mods = Record<string, string | boolean>

export const classNames = (cls: string, mods?: Mods, additional?: string[]): string => {
  return [
    cls,
    ...additional,
    ...Object.entries(mods)
      .filter(([className, value]) => !!value)
      .map(([className]) => className),
  ].join(" ")
}