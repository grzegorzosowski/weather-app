import { TWeatherDescription } from "@/App";
import { TiWeatherPartlySunny, TiWeatherStormy, TiWeatherSunny } from "react-icons/ti";

type TWeatherIconProps = {
  weather: TWeatherDescription;
};

const ICONS = {
  sunny: TiWeatherSunny,
  stormy: TiWeatherStormy,
  cloudy: TiWeatherPartlySunny,
};
const DEFAULT_ICON = TiWeatherSunny;

export const WeatherIcon = ({ weather }: TWeatherIconProps) => {
  const Icon = ICONS[weather] || DEFAULT_ICON;
  return <Icon size={"2rem"} />;
};
