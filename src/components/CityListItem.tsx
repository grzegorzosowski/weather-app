import { TDataItem, TTemperatureUnit } from "@/App";
import { WeatherIcon } from "@/components/WeatherIcon.tsx";
import { Button } from "@/components/ui/button.tsx";
import { convertToFahrenheit } from "@/lib/convertToFahrenheit";
import { TbHeart } from "react-icons/tb";

type TCityListItemProps = {
  city: TDataItem;
  favorite: boolean;
  temperatureUnit: TTemperatureUnit;
  handleClickFavorite: (id: string) => void;
};

export const CityListItem = ({
  city,
  favorite,
  temperatureUnit,
  handleClickFavorite,
}: TCityListItemProps) => {
  const temperature =
    temperatureUnit === "FAHRENHEIT"
      ? convertToFahrenheit(city.temperatureCelsius)
      : city.temperatureCelsius;

  return (
    <div className={"flex gap-4 items-center p-4 border-b last-of-type:border-none"}>
      <WeatherIcon weather={city.description} />
      <div className={"flex flex-col"}>
        <span>{city.city}</span>
        <small className={"text-sm text-gray-600 capitalize"}>{city.description}</small>
      </div>
      <strong className={"ml-auto"}>
        {temperature.toFixed(0)} {temperatureUnit === "CELSIUS" ? "°C" : "°F"}
      </strong>
      <Button
        variant={favorite ? "default" : "outline"}
        size={"icon"}
        onClick={() => {
          handleClickFavorite(city.id);
        }}
      >
        <TbHeart />
      </Button>
    </div>
  );
};
