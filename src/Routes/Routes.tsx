import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/authentication/Login";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import Home from "../components/Companies/Home";
import Devices from "../components/Devices/Devices";
import ForgotPassword from "../components/authentication/ForgotPassoword";
import ResetPassword from "../components/authentication/ResetPassword";
import Exercises from "../components/Exercises/Exercises";
import Users from "../components/Users/Users";
import Teams from "../components/Teams/Teams";
import CompanyOverview from "../components/Companies/Overview/Overview";
import Staff from "../components/Companies/Staff/Staff";
import Athletes from "../components/Companies/Athletes/Athletes";
import CompanyDevices from "../components/Companies/Devices/Devices";
import CompanyTeams from "../components/Companies/Teams/Teams";
import CreateAccount from "../components/authentication/CreateAccount";
import Device_Types from "../components/DeviceTypes/DeviceTypes";
import DeviceTypeDevices from "../components/DeviceTypes/Devices/Devices";
import UserInfo from "../components/Users/UserInfo/UserInfo";
import { useAuth } from "../utils/hooks/Auth";

function AppRoutes() {
    const {currentUser} = useAuth()
    const is_admin = currentUser?.user_type === "admin"
    const is_staff = currentUser?.user_type === "staff"

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/forgot_password" element={<ForgotPassword />} />
                <Route path="/reset_password" element={<ResetPassword />} />
                <Route path="/create_account" element={<CreateAccount />} />
                {/* Protected Routes */}
                {<Route element={<ProtectedRoutes />}>
                    <Route
                        path="/"
                        element={
                            !is_staff ? (is_admin ? <CompanyOverview /> : <Home />) : <UserInfo />
                        }
                    />
                    <Route path="/devices" element={!is_admin ? <Devices />: <CompanyDevices />} />
                    {!is_admin && <Route path="/device_types" element={<Device_Types />} />}
                    {!is_staff && <Route path="/profile" element={<UserInfo />}/>}
                    <Route path="/device_types/:id" >
                        <Route path="" element = {<DeviceTypeDevices />} />
                    </Route>

                    <Route path="/exercises" element={<Exercises />} />
                    {!is_admin && <Route path="/users" element={!is_admin ? <Users />: <Athletes />} />}
                    {is_admin && <Route path="/athletes" element={<Athletes />} />}
                    <Route path="/teams" element={!is_admin ? <Teams />: <CompanyTeams />} />

                    {/* Dynamic Routes for Company */}
                    <Route path={!is_admin ? "/:id": "/"}>
                        <Route path="" element={<CompanyOverview />} />
                        <Route path="staff" element={<Staff />} />
                        <Route path="athletes" element={<Athletes />} />
                        <Route path="devices" element={<CompanyDevices />} />
                        <Route path="teams" element={<CompanyTeams />}/>
                    </Route>
                </Route>}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
