import omit from "lodash/omit"
import pick from "lodash/pick"

import DashboardView from "../views/Dashboard";
import DashboardIcon from "@material-ui/icons/Dashboard";

import LoginView from '../views/Login';
import LoginIcon from '@material-ui/icons/PeopleAltOutlined';

import RegisterView from '../views/Register';
import UserProfileView from '../views/UserProfile';
import UserManagerView from '../views/UserManager';

const RoutesType = {
    New: "new",
    Detail: ":id"
}

export const RouteNames = {
    Dashboard: '',
    Login: 'Login',
    Register: 'Register',
    UserProfile: 'UserProfile',
    UserManager: 'UserManager',
    NewUser: "NewUser"
}

export const AllRouteNames = {
    ...RouteNames
}

export const RoutePaths = {
    Dashboard: ['', RouteNames.Dashboard].join('/'),
    Login: ['', RouteNames.Login].join('/'),
    Register: ['', RouteNames.Register].join('/'),
    UserProfile: ['', RouteNames.UserProfile, RoutesType.Detail].join('/'),
    UserManager: ['', RouteNames.UserManager].join('/'),
    NewUser: ['', RouteNames.UserProfile, RoutesType.New].join('/'),
}

// route

export const RoutesApp = {
    Dashboard: {
        exact: true,
        id: RouteNames.Dashboard,
        label: "Dashboard",
        path: RoutePaths.Dashboard,
        component: DashboardView,
        icon: DashboardIcon
    },
    Login: {
        exact: true,
        id: RouteNames.Login,
        label: "Login",
        path: RoutePaths.Login,
        component: LoginView,
        icon: LoginIcon
    },
    Register: {
        exact: true,
        id: RouteNames.Register,
        label: "Register",
        path: RoutePaths.Register,
        component: RegisterView,
        icon: LoginIcon
    },
    UserProfile: {
        exact: true,
        id: RouteNames.UserProfile,
        label: "UserProfile",
        path: RoutePaths.UserProfile,
        component: UserProfileView,
        icon: LoginIcon
    },
    UserManager: {
        exact: true,
        id: RouteNames.UserManager,
        label: "UserManager",
        path: RoutePaths.UserManager,
        component: UserManagerView,
        icon: LoginIcon
    },
    NewUser: {
        exact: true,
        id: RouteNames.NewUser,
        label: "NewUser",
        path: RoutePaths.NewUser,
        component: UserProfileView,
        icon: LoginIcon
    },
}

export const ManagerRoute = {
    Login: {
        exact: true,
        id: RouteNames.Login,
        label: "Login",
        path: RoutePaths.Login,
        component: LoginView,
        icon: LoginIcon
    },
    Register: {
        exact: true,
        id: RouteNames.Register,
        label: "Register",
        path: RoutePaths.Register,
        component: RegisterView,
        icon: LoginIcon
    },
    UserProfile: {
        exact: true,
        id: RouteNames.UserProfile,
        label: "UserProfile",
        path: RoutePaths.UserProfile,
        component: UserProfileView,
        icon: LoginIcon
    },
    UserManager: {
        exact: true,
        id: RouteNames.UserManager,
        label: "UserManager",
        path: RoutePaths.UserManager,
        component: UserManagerView,
        icon: LoginIcon
    },
    NewUser: {
        exact: true,
        id: RouteNames.NewUser,
        label: "NewUser",
        path: RoutePaths.NewUser,
        component: UserProfileView,
        icon: LoginIcon
    },
}

export const RegisterRoute = {
    Login: {
        exact: true,
        id: RouteNames.Login,
        label: "Login",
        path: RoutePaths.Login,
        component: LoginView,
        icon: LoginIcon
    },
    Register: {
        exact: true,
        id: RouteNames.Register,
        label: "Register",
        path: RoutePaths.Register,
        component: RegisterView,
        icon: LoginIcon
    },
    UserProfile: {
        exact: true,
        id: RouteNames.UserProfile,
        label: "UserProfile",
        path: RoutePaths.UserProfile,
        component: UserProfileView,
        icon: LoginIcon
    },
}

export const GuestRoute = {
    Login: {
        exact: true,
        id: RouteNames.Login,
        label: "Login",
        path: RoutePaths.Login,
        component: LoginView,
        icon: LoginIcon
    },
    Register: {
        exact: true,
        id: RouteNames.Register,
        label: "Register",
        path: RoutePaths.Register,
        component: RegisterView,
        icon: LoginIcon
    },
}


// drawer

export const AdminDrawer = {
    Dashboard: {
        id: RouteNames.Dashboard,
        label: "Dashboard",
        path: RoutePaths.Dashboard,
        icon: DashboardIcon
    },
    UserManager: {
        id: RouteNames.UserManager,
        label: "UserManager",
        path: RoutePaths.UserManager,
        icon: LoginIcon
    },
    UserProfile: {
        id: RouteNames.UserProfile,
        label: "UserProfile",
        path: RoutePaths.UserProfile.replace(":id", "user-info"),
        icon: LoginIcon
    },
}

export const ManagerDrawer = {
    UserManager: {
        id: RouteNames.UserManager,
        label: "UserManager",
        path: RoutePaths.UserManager,
        icon: LoginIcon
    },
    UserProfile: {
        id: RouteNames.UserProfile,
        label: "UserProfile",
        path: RoutePaths.UserProfile.replace(":id", "user-info"),
        icon: LoginIcon
    },
}

export const RegisterDrawer = omit(AdminDrawer, [
    AdminDrawer.Dashboard.id, AdminDrawer.UserManager.id
])
