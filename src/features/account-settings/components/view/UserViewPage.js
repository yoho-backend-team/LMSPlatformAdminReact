// ** MUI Imports
import Grid from '@mui/material/Grid';

// ** Demo Components Imports
// import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'
// import UserViewRight from 'src/views/apps/user/view/UserViewRight'
import UserViewLeft from './UserViewLeft';
import UserViewRight from './UserViewRight';
import StaffManagementView from 'components/cards/Skeleton/StaffManagementView';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { getUserById } from 'features/user-management/users-page/services/userServices';


// import { getUserProfileById } from 'features/user-management/users-page/services/userServices';
import { getProfileWithId } from 'features/authentication/forgot-password-page/service/forgotPasswordService';

const UserView = () => {
  const location = useLocation();

  useEffect(() => {
    setUserId(location);
    console.log('userId',userId);
    
  }, [location]);

  const [userId, setUserId] = useState(location);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserData(userId);
  }, [userId, refetch]);

  const getUserData = async (id) => {
    try {
      // setLoading(true);
      const result = await getProfileWithId(id);
      console.log('result',result);
      
      if (result.status==="success") {
        console.log('User:', result.data);
        setUserData(result.data);
        console.log('setUserData',userData);
        
        setLoading(false);
      } else {
        console.log(result.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log('userData',userData);
  
  return (
    <>
      {loading ? (
        <StaffManagementView />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={5} lg={4}>
            <UserViewLeft id={userId} userData={userData} setRefetch={setRefetch} />
          </Grid>
          {/* <div>
helloo
        </div> */}
          <Grid item xs={12} md={7} lg={8}>
            <UserViewRight id={userId} userData={userData} setRefetch={setRefetch} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserView;
