export const formatDateTime = (date: string) => {
    const currentDate = new Date(date);
    const formattedDate = currentDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = currentDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return `${formattedDate} - ${formattedTime}`;
  };