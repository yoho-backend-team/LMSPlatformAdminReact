// import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
// ** MUI Imports
import CustomAvatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CustomChip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CustomTextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

import Icon from 'components/icon';

import InstituteHeaderSection from 'features/institute-management/institutes-overview-page/components/InstituteHeaderSection';
// ** Utils Import
import { getInitials } from 'utils/get-initials';
// ** Custom Table Components Imports
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import TableHeader from 'features/institute-management/institutes-overview-page/components/TableHeader';
import { selectInstitutes } from 'features/institute-management/redux/instituteSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { getAllInstitutes } from 'features/institute-management/redux/instituteThunks';
const userStatusObj = {
  1: 'success',
  0: 'error'
};

// ** renders client column
const renderClient = (row) => {
  if (row?.avatar?.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />;
  } else {
    return (
      <CustomAvatar skin="light" color={row.avatarColor} sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: 10 }}>
        {getInitials(row?.name ? row.name : 'John Doe')}
      </CustomAvatar>
    );
  }
};

const RowOptions = ({ id }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null);
  const rowOptionsOpen = Boolean(anchorEl);

  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Link to={`profile/${id}`} state={{ id: id }}>
        <Button size="small" variant="outlined" color="secondary">
          View
        </Button>
      </Link>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem sx={{ '& svg': { mr: 2 } }} href="/apps/user/view/account" onClick={handleRowOptionsClose}>
          <Icon icon="tabler:eye" fontSize={20} />
          View
        </MenuItem>
      </Menu>
    </>
  );
};

const columns = [
  {
    // flex: 1.5,
    minWidth: 200,
    field: 'id',
    headerName: 'id',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.institute_id}
        </Typography>
      );
    }
  },
  {
    // flex: 2,
    minWidth: 300,
    field: 'institute',
    headerName: 'Institute',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              href="/apps/user/view/account"
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {row?.name}
            </Typography>
            <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
              {row?.email}
            </Typography>
          </Box>
        </Box>
      );
    }
  },
  {
    // flex: 2,
    minWidth: 300,
    headerName: 'Contact & Address',
    field: 'Contact',
    renderCell: ({ row }) => {
      return (
        <Box
          sx={{
            display: 'flex',

            alignItems: 'flex-start',
            flexDirection: 'column',
            flexWrap: 1,
            py: 2
          }}
        >
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            +91 {row?.phone}
          </Typography>
          <div>
            <Typography
              sx={{ display: 'flex', color: 'text.secondary', textTransform: 'capitalize', flexShrink: 1, wordWrap: 'break-word', mt: 1 }}
            >
              {row?.address_line_1} {row?.address_line_2} {row?.city} {row?.state} {row?.pin_code}
            </Typography>
          </div>
        </Box>
      );
    }
  },

  {
    // flex: 1.3,
    minWidth: 200,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
      const userStatus = `${row.is_active}` === 1 ? 'Active' : 'Inactive';
      return (
        <CustomChip
          rounded
          skin="light"
          size="small"
          label={userStatus}
          color={userStatusObj[row.is_active]}
          sx={{ textTransform: 'capitalize' }}
        />
      );
    }
  },
  {
    // flex: 1,
    minWidth: 150,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
];

const Institutes = () => {
  const [role, setRole] = useState('');
  const [plan, setPlan] = useState('');
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  // const [allInstitutes, setAllInstitutes] = useState('');

  const dispatch = useDispatch();
  const allInstitutes = useSelector(selectInstitutes);

  useEffect(() => {
    dispatch(getAllInstitutes());
  }, [dispatch, getAllInstitutes]);

  console.log(allInstitutes);
  const handleFilter = useCallback((val) => {
    setValue(val);
  }, []);

  const handleRoleChange = useCallback((e) => {
    setRole(e.target.value);
  }, []);

  const handlePlanChange = useCallback((e) => {
    setPlan(e.target.value);
  }, []);

  const handleStatusChange = useCallback((e) => {
    setStatus(e.target.value);
  }, []);
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  // ** State
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InstituteHeaderSection users={allInstitutes} groups={allInstitutes} />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Institutes" />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item sm={4} xs={12}>
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue="Select Role"
                    SelectProps={{
                      value: role,
                      displayEmpty: true,
                      onChange: (e) => handleRoleChange(e)
                    }}
                  >
                    <MenuItem value="">Select Role</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="author">Author</MenuItem>
                    <MenuItem value="editor">Editor</MenuItem>
                    <MenuItem value="maintainer">Maintainer</MenuItem>
                    <MenuItem value="subscriber">Subscriber</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue="Select Plan"
                    SelectProps={{
                      value: plan,
                      displayEmpty: true,
                      onChange: (e) => handlePlanChange(e)
                    }}
                  >
                    <MenuItem value="">Select Plan</MenuItem>
                    <MenuItem value="basic">Basic</MenuItem>
                    <MenuItem value="company">Company</MenuItem>
                    <MenuItem value="enterprise">Enterprise</MenuItem>
                    <MenuItem value="team">Team</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue="Select Status"
                    SelectProps={{
                      value: status,
                      displayEmpty: true,
                      onChange: (e) => handleStatusChange(e)
                    }}
                  >
                    <MenuItem value="">Select Status</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </CustomTextField>
                </Grid>
              </Grid>
            </CardContent>
            <Divider sx={{ m: '0 !important' }} />
            <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
            <DataGrid
              autoHeight
              // rowHeight={90}
              getRowHeight={() => 'auto'}
              rows={allInstitutes}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Institutes;
