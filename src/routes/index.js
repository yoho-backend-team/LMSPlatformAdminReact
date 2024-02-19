import { lazy } from 'react';

// project imports
import Loadable from 'components/loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';
import { Routes, Route, Navigate } from 'react-router-dom';

// import { useSelector } from 'react-redux';
// view imports

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

// User Management
const GroupsPage = Loadable(lazy(() => import('views/user-management/groups')));
const AddGroupPage = Loadable(lazy(() => import('views/user-management/add-group')));
const ViewGroupPage = Loadable(lazy(() => import('views/user-management/view-group')));
const EditGroupPage = Loadable(lazy(() => import('views/user-management/edit-group')));
const UsersPage = Loadable(lazy(() => import('views/user-management/users')));
const ViewUserPage = Loadable(lazy(() => import('views/user-management/view-user')));
//Payment Management
const Fee = Loadable(lazy(() => import('views/payment-management/fee')));
const Salary = Loadable(lazy(() => import('views/payment-management/salary')));
const Subscription = Loadable(lazy(() => import('views/payment-management/subscription')));

//Error Pages
const Page404 = Loadable(lazy(() => import('views/error-pages/404-page')));
const Page401 = Loadable(lazy(() => import('views/error-pages/401-page')));
const Page500 = Loadable(lazy(() => import('views/error-pages/500-page')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

// const Protected = () => {
//   // Access the isAuthenticated state from the Redux store
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   // If the user is authenticated, render the content
//   if (isAuthenticated) {
//     return <Outlet />;
//   } else {
//     // If not authenticated, redirect to the login page
//     return <Navigate to="/login" replace />;
//   }
// };
// const AdminRoute = () => {
//   const isAdmin = useSelector((state) => state.auth.userData?.is_admin);

//   if (isAdmin === '1') {
//     return <Outlet />;
//   }
//   return <Navigate to="/un-authorized" />;
// };

const ApplicationRoutes = () => {
  return (
    <Routes>
      {/* <Route element={<Protected />}> */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<DashboardDefault />} />
      </Route>

      {/* <Route element={<AdminRoute />}> */}
      <Route path="/user-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/user-management/groups" />} />
        <Route path="groups" element={<GroupsPage />} />
        <Route path="groups/add" element={<AddGroupPage />} />
        <Route path="groups/view" element={<ViewGroupPage />} />
        <Route path="groups/edit/:id" element={<EditGroupPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<ViewUserPage />} />
      </Route>
      {/* </Route> */}

      {/* PaymentManagement */}
      <Route path="/payment-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/payment-management/fee" />} />
        <Route path="fee" element={<Fee/>} />
        <Route path="salary" element={<Salary />} />
        <Route path="subscription" element={<Subscription />} />
      </Route>

      <Route element={<MinimalLayout />}>
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route element={<MinimalLayout />}>
        <Route path="/server-error" element={<Page500 />} />
      </Route>
      {/* <Route element={<MinimalLayout />}>
          <Route path="/login" element={<Navigate to="/" />} />
        </Route> */}
      {/* </Route> */}

      <Route element={<MinimalLayout />}>
        <Route path="/login" element={<AuthLogin />} />
      </Route>
      <Route element={<MinimalLayout />}>
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route element={<MinimalLayout />}>
        <Route path="/un-authorized" element={<Page401 />} />
      </Route>
      <Route element={<MinimalLayout />}>
        <Route path="/server-error" element={<Page500 />} />
      </Route>
    </Routes>
  );
};

export default ApplicationRoutes;
