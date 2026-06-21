import { t } from "@excalidraw/excalidraw/i18n";

export const timeAgo = (date: string | number | Date): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 10) {
    return t("timeAgo.justNow");
  }
  if (diffInSeconds < 60) {
    return t("timeAgo.secondsAgo", { count: diffInSeconds });
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return t("timeAgo.minutesAgo", { count: diffInMinutes });
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return t("timeAgo.hoursAgo", { count: diffInHours });
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return t("timeAgo.daysAgo", { count: diffInDays });
  }

  return new Date(date).toLocaleDateString();
};
