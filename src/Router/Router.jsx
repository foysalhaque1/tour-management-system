import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/LogIn/Login";
import Register from "../Pages/Authentication/Register/Register";
import PrivateRoute from "../OtherRoutes/PrivateRoute";
import AddPackage from "../Admin/AddPackages/AddPackage";
import DashboardLayout from "../Layouts/DashboardLayout";
import UserManageProfile from "../Pages/Dashboard/UserManageProfile/UserManageProfile";
import UserJoinAsTourGuide from "../Pages/Dashboard/UserJoinAsTourGuide/UserJoinAsTourGuide";
import AdminManageCandidates from "../Pages/Dashboard/AdminManageCandidates/AdminManageCandidates.JSX";
import TourGuideManageProfile from "../Pages/Dashboard/TourGuideManageProfile/TourGuideManageProfile";
import TourGuideAddStories from "../Pages/Dashboard/TourGuideAddStories/TourGuideAddStories";
import TourGuideManageStories from "../Pages/Dashboard/TourGuideManageStories/TourGuideManageStories";
import TourGuideUpdateStory from "../Pages/Dashboard/TourGuideUpdateStories/TourGuideUpdateStory";
import PackageDetailsPage from "../Pages/PackageDetailsPage/PackageDetailsPage";
import TourGuideProfilePage from "../Pages/TourGuideProfilePage/TourGuideProfilePage";
import UserBookingPage from "../Pages/Dashboard/UserBookingPage/UserBookingPage";
import Payment from "../Pages/Payment/Payment";
import UserAddStories from "../Pages/Dashboard/UserAddStories/UserAddStories";
import UserManageStories from "../Pages/Dashboard/UserManageStories/UserManageStories";
import UserUpdateStory from "../Pages/Dashboard/UserUpdateStory/UserUpdateStory";
import AllStories from "../Pages/AllStoriesOfUsers/AllStories";
import TourGuideAssignedTours from "../Pages/Dashboard/TourGuideAssignedTours/TourGuideAssignedTours";
import AdminManageProfile from "../Pages/Dashboard/AdminManageProfile/AdminManageProfile";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      
      {
        path: '/packages/:id',
        element: <PrivateRoute>
          <PackageDetailsPage></PackageDetailsPage>
        </PrivateRoute>
      },

      {
        path: 'tourGuide/:id',
        element: <TourGuideProfilePage></TourGuideProfilePage>
      },
      {
        path: 'payment/:id',
        element: <Payment></Payment>
      },
      {
        path: 'allStories',
        element: <AllStories></AllStories>
      },
    ]
  },
  {
    path: '/',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [

      {
        path: 'userManageProfile',
        element: <UserManageProfile></UserManageProfile>
      },
      {
        path: 'userAddStories',
        element: <UserAddStories></UserAddStories>
      },
      {
        path: 'userManageStories/:email',
        element: <UserManageStories></UserManageStories>
      },
      {
        path: 'userUpdateStory/:id',
        element: <UserUpdateStory></UserUpdateStory>
      },
      {
        path: 'joinAsTourGuide',
        element: <UserJoinAsTourGuide></UserJoinAsTourGuide>
      },
      {
        path: 'addPackage',
        element:<AddPackage></AddPackage>
      },
      {
        path: 'adminManageCandidates',
        element: <AdminManageCandidates></AdminManageCandidates>
      },
      {
        path: 'adminManageProfile',
        element: <AdminManageProfile></AdminManageProfile>
      },
      {
        path: 'tourGuideManageProfile',
        element: <TourGuideManageProfile></TourGuideManageProfile>
      },
      {
        path: 'tourGuideAddStories',
        element: <TourGuideAddStories></TourGuideAddStories>
      },
      {
        path: 'manageTourGuideStories',
        element: <TourGuideManageStories></TourGuideManageStories>
      },
      {
        path: 'assignedTours/:email',
        element: <TourGuideAssignedTours></TourGuideAssignedTours>,
        loader:({params})=>fetch(`http://localhost:5000/assignedTours/${params.email}`)
      },
      {
        path: 'updateStory/:id',
        element: <TourGuideUpdateStory></TourGuideUpdateStory>
      },
      {
        path: 'myBookings/:email',
        element: <UserBookingPage></UserBookingPage>
      },


    ]
  }
]);