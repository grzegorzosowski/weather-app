import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { TTemperatureUnit } from "@/App.tsx";

const temperatureUnitOptions: { value: TTemperatureUnit; label: string }[] = [
  {
    value: "CELSIUS",
    label: "Celsius",
  },
  {
    value: "FAHRENHEIT",
    label: "Fahrenheit",
  },
];

type TTemperatureUnitSelectProps = {
  value: TTemperatureUnit;
  onChange: (val: TTemperatureUnit) => void;
};

export const TemperatureUnitSelect = ({ value, onChange }: TTemperatureUnitSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Unit" />
      </SelectTrigger>
      <SelectContent>
        {temperatureUnitOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
