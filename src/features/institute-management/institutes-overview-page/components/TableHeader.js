// ** MUI Imports
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// ** Icon Imports
import { useDispatch } from 'react-redux';
import { useState, useCallback } from 'react';

import Icon from 'components/icon';

import { Link } from 'react-router-dom';
import { getAllInstitutes } from 'features/institute-management/redux/instituteThunks';

const TableHeader = (props) => {
  const { selectedBranchId } = props;

  // State for search value
  const [searchValue, setSearchValue] = useState('');

  // Dispatch function
  const dispatch = useDispatch();

  // Callback function to handle search
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllInstitutes({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
      // Dispatch action to fetch branches with search input
    },
    [dispatch]
  );

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Button color="secondary" variant="tonal" startIcon={<Icon icon="tabler:upload" />}>
        Export
      </Button>
      <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField value={searchValue} placeholder="Search Category" onChange={(e) => handleSearch(e)} />
        <Box component={Link} to={'add'}>
          <Button variant="contained">+ Add Institute</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TableHeader;
