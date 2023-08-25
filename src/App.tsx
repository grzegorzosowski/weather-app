import { Input } from "@/components/ui/input.tsx";
import { Header } from "@/components/ui/Header.tsx";
import { CityListCard } from "@/components/CityListCard.tsx";
import { TemperatureUnitSelect } from "@/components/TemperatureUnitSelect.tsx";
import { Notification } from "@/components/Notification";
import { useEffect, useState } from "react";
import axios from "axios";

export type TTemperatureUnit = "CELSIUS" | "FAHRENHEIT";
export type TWeatherDescription = "cloudy" | "sunny" | "stormy";
export type TDataItem = {
  id: string;
  city: string;
  temperatureCelsius: number;
  description: TWeatherDescription;
};

function App() {
  const [fetchedWeatherData, setFetchedWeatherData] = useState<Array<TDataItem>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [weatherDataToDisplay, setWeatherDataToDisplay] = useState<Array<TDataItem>>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [temperatureUnit, setTemperatureUnit] = useState<TTemperatureUnit>("CELSIUS");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/weather");
        setFetchedWeatherData(response.data); // weather data using to filter
        setWeatherDataToDisplay(response.data); //weather data using to display
      } catch (error) {
        setError("Fetching data error, try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleClickFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, id]);
    }
  };

  const filterFavorites = () => {
    return fetchedWeatherData.filter((item) => favorites.includes(item.id));
  };

  const handleSwitchTemperatureUnit = () => {
    const newUnit = temperatureUnit === "CELSIUS" ? "FAHRENHEIT" : "CELSIUS";
    setTemperatureUnit(newUnit);
  };

  const handleSearchInput = (input: string) => {
    setInputValue(input);
    if (!input) {
      setWeatherDataToDisplay(fetchedWeatherData);
    } else {
      const filteredDataToDisplay = fetchedWeatherData.filter((item) => {
        return item.city.toLowerCase().includes(input.toLowerCase());
      });
      setWeatherDataToDisplay(filteredDataToDisplay);
    }
  };

  return (
    <>
      <Header />
      <div className={"container max-w-lg mx-auto my-4 flex flex-col gap-4"}>
        <div className={"flex justify-between gap-4"}>
          <Input
            value={inputValue}
            className={"flex-grow"}
            placeholder={"Search city..."}
            onChange={(event) => {
              handleSearchInput(event.target.value);
            }}
          />
          <TemperatureUnitSelect value={temperatureUnit} onChange={handleSwitchTemperatureUnit} />
        </div>

        {error ? (
          <Notification>{error}</Notification>
        ) : (
          <CityListCard
            title={"Weather in cities"}
            favorites={favorites}
            cityList={weatherDataToDisplay}
            isLoading={isLoading}
            temperatureUnit={temperatureUnit}
            handleClickFavorite={handleClickFavorite}
          />
        )}
        {favorites.length !== 0 && (
          <CityListCard
            title={"Favorites"}
            favorites={favorites}
            cityList={filterFavorites()}
            temperatureUnit={temperatureUnit}
            handleClickFavorite={handleClickFavorite}
          />
        )}
      </div>
    </>
  );
}

export default App;
