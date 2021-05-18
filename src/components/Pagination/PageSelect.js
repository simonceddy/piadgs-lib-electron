import { useEffect, useMemo, useState, } from 'react';
import { StyledSelect } from '../../shared/components/Styled';

const getOptions = (max) => {
  const options = [];
  for (let i = 1; i <= max; i++) {
    options.push(() => <option id={i} value={i} label={i} />);
  }

  return options;
};

function PageSelect({ lastPage, current, onChange }) {
  const options = useMemo(() => getOptions(lastPage), [lastPage]);
  const [selected, setSelected] = useState(current);

  useEffect(() => {
    if (current !== selected) {
      setSelected(current);
    }
  }, [current]);

  return (
    <div className="flex flex-row justify-between items-center">
      <span className="mr-3">Select page:</span>
      <StyledSelect
        className="p-1 border-2 rounded-xl text-lg"
        defaultValue={selected}
        onChange={onChange}
      >
        {options.map((Option, index) => <Option key={index} />)}
      </StyledSelect>
    </div>
  );
}

export default PageSelect;
