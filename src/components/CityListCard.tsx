import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { CityListItem } from "@/components/CityListItem.tsx";
import { TDataItem, TTemperatureUnit } from "@/App";
import { Notification } from "@/components/Notification.tsx";

type CityListCardProps = {
  title: string;
  cityList: Array<TDataItem>;
  favorites: Array<string>;
  isLoading?: boolean;
  temperatureUnit: TTemperatureUnit;
  handleClickFavorite: (id: string) => void;
};

export const CityListCard = ({
  title,
  cityList,
  favorites,
  isLoading,
  temperatureUnit,
  handleClickFavorite,
}: CityListCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Notification>Loading...</Notification>
        ) : cityList.length === 0 ? (
          <Notification>No cities found with this search criteria.</Notification>
        ) : (
          cityList.map((item) => {
            return (
              <CityListItem
                key={item.id}
                favorite={favorites.includes(item.id)}
                city={item}
                temperatureUnit={temperatureUnit}
                handleClickFavorite={handleClickFavorite}
              />
            );
          })
        )}
      </CardContent>
    </Card>
  );
};
