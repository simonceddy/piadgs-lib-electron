import { StyledSelect } from '../../shared/components/Styled';

const choices = [8, 16, 32, 40, 60, 100, 200];

function ItemsPerPageSelector({ current = 40, onChange }) {
  return (
    <StyledSelect
      onChange={onChange}
      value={current}
    >
      {choices.map((choice) => (
        <option key={`items-per-page-option-${choice}`} value={choice} label={choice} />
      ))}
    </StyledSelect>
  );
}

export default ItemsPerPageSelector;
