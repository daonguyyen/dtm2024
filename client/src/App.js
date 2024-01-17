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
import TopBarCustom from "./app/components/topBarCustom/TopBarCustom";
function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <Router>

      <Switch>
        <Route exact path="/">
          <TopBar />
          <HomePage />
        </Route>
        <Route path="/create-user">
          {currentUser ? <HomePage /> : <Register />}
        </Route>
        <Route path="/login">
          <TopBarCustom />
          {currentUser ? <HomePage /> : <Login />}
        </Route>
        <Route path="/write">
          <TopBarCustom />
          {currentUser ? <Write /> : <Login />}
        </Route>
        <Route path="/profile">
          <TopBarCustom />
          {currentUser ? <Profile /> : <Login />}
        </Route>
        <Route path="/posts">
          <TopBarCustom />
          <Blog />
        </Route>
        <Route path="/post/:postId">
          <TopBarCustom />
          <Single />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
