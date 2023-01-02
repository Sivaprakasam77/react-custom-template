import * as Mui from "@mui/material";
import * as React from "react";

export const Timer = ({
  time,
  children,
  ...props
}: { time: string | number } & Mui.TypographyProps) => {
  const [timeRemain, setTimeRemian] = React.useState("00:00:00");
  React.useEffect(() => {
    const id = setInterval(() => {
      const difference = new Date(time).getTime() - new Date().getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const min = Math.floor((difference / 1000 / 60) % 60);
      const sec = Math.floor((difference / 1000) % 60);
      if (difference > 0)
        setTimeRemian(
          days
            ? `${days} ${days < 2 ? "Day" : "Days"}, ${hrs}:${min}:${sec}`
            : `${hrs}:${min}:${sec}`
        );
      else clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [time]);
  return (
    <Mui.Typography {...props}>
      {timeRemain === "00:00:00" ? null : children}
      {timeRemain === "00:00:00" ? "Time Out" : timeRemain}
    </Mui.Typography>
  );
};
