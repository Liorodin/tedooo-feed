export function buildClassName(...classNames: (string | undefined | null | false)[]): string {
  return classNames.filter(Boolean).join(' ');
}
