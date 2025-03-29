import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { isAuthenticated } from "./utils/auth";
import Login from "./components/Auth/Login";
import UserList from "./components/Users/UserList";
import EditUser from "./components/Users/EditUser";
import { PrivateRoute } from "./components/Shared/PrivateRouter";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
