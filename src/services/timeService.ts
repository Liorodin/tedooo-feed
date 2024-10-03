export function dateStringToDate(date: string) {
  return new Date(date);
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval}y`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval}m`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval}d`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval}h`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval}m`;

  return 'Just now';
}
