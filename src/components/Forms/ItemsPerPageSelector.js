import { StyledSelect } from '../../shared/components/Styled';

const choices = [8, 16, 32, 40, 60, 100, 200];

function ItemsPerPageSelector({ current = 40, onChange }) {
  return (
    <div className="flex flex-row p-2 justify-center items-center">
      <span>Displaying</span>
      <StyledSelect
        className="p-1 border-2 rounded-xl text-lg cursor-pointer mx-2"
        onChange={onChange}
        value={current}
      >
        {choices.map((choice) => (
          <option key={`items-per-page-option-${choice}`} value={choice} label={choice} />
        ))}
      </StyledSelect>
      <span> items per page</span>
    </div>
  );
}

export default ItemsPerPageSelector;
