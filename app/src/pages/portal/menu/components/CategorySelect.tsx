import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { CategoryName } from '../../../../generated/graphql';


const CategorySelect = ({
  value,
  onChange,
}: {
  value?: CategoryName;
  onChange: (newValue: CategoryName) => void;
}) => {
  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel>Category</InputLabel>
      <Select
        value={value ?? ""}
        label="Category"
        onChange={(e) => onChange(e.target.value as CategoryName)}
      >
        {Object.values(CategoryName).map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CategorySelect;