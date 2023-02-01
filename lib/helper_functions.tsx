export function convertTimeToTimeSince(iso_time_string: string) {
  const date = new Date(iso_time_string);
  const time_since = Date.now() - date.getTime();
  const seconds = Math.floor(time_since / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  if (years > 0) {
    return years + " years ago";
  } else if (months > 0) {
    return months + " months ago";
  } else if (days > 0) {
    return days + " days ago";
  } else if (hours > 0) {
    return hours + " hours ago";
  } else if (minutes > 0) {
    return minutes + " minutes ago";
  }
  return seconds + " seconds ago";
}
