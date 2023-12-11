import TopBar from "./app/components/topBar/TopBar";
import HomePage from "./app/pages/homepage/HomePage";
import Register from "./app/pages/register/Register";
import Login from "./app/pages/login/Login";
import Single from "./app/pages/single/Single";
import Write from "./app/pages/write/Write";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./app/context/authContext/authContext";
import Blog from "./app/pages/home/Blog";
import Profile from "./app/pages/profile/Profile";
function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/register">
          {currentUser ? <HomePage /> : <Register />}
        </Route>
        <Route path="/login">
          {currentUser ? <HomePage /> : <Login />}
        </Route>
        <Route path="/write">
          {currentUser ? <Write /> : <Login />}
        </Route>
        <Route path="/profile">
          {currentUser ? <Profile /> : <Login />}
        </Route>
        <Route path="/posts">
          <Blog />
        </Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
