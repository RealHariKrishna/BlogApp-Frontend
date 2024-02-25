// react-select
import AsyncSelect from "react-select/async";

const MultiSelectTagDropdown = ({
  defaultValue = [],
  loadOptions,
  onChange,
}) => {
  return (
    <div>
      <AsyncSelect
        defaultValue={defaultValue}
        defaultOptions
        isMulti
        loadOptions={loadOptions}
        className="relative z-20"
        onChange={onChange}
      />
    </div>
  );
};

export default MultiSelectTagDropdown;
