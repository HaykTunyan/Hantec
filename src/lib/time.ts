// lib/time.ts

export const fetchTimeData = async () => {
  const response = await fetch("http://worldtimeapi.org/api/ip");
  if (!response.ok) {
    throw new Error("Failed to fetch time data");
  }
  const data = await response.json();
  return data;
};
