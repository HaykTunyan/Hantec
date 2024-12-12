import { FC, useState ,ChangeEvent } from "react";
import "../../styles/selector.scss";

interface OptionLanguage {
  value: string;
  label: string;
  image: string;
}

interface LanguageSelectorProps {
  optionLanguages: OptionLanguage[];
  handleSelectedLanguages: (selectedValue: string) => void;
}

const LanguageSelector: FC<LanguageSelectorProps> = ({ optionLanguages, handleSelectedLanguages }) => {
  /**
   *  Languages Selector Hooks.
   */

  const [selectedOption, setSelectedOption] = useState({
    value: "US",
    label: "United States",
    image: "icon/usa.svg",
  });

  const handleChange = (e :ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedItem = optionLanguages.find(
      (option) => option.value === selectedValue
    );
    setSelectedOption(selectedItem as OptionLanguage);
    handleSelectedLanguages(selectedValue);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <img
          src={selectedOption.image}
          alt={selectedOption.label}
          className="w-6 h-6"
        />
        <span>{selectedOption.label}</span>
      </div>
      <select
        className="block items-center appearance-none w-full bg-white cursor-pointer pr-8 text-sm text-gray-700 rounded border-none leading-tight focus-visible:border-none focus:outline-none focus:shadow-outline"
        value={selectedOption.value}
        onChange={handleChange}
      >
        {optionLanguages.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
