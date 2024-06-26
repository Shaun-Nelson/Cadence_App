import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import App from "./App.tsx";
import "./index.css";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyPlaylists from "./pages/MyPlaylists";
import Page404 from "./pages/404.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import Playlist from "./pages/Playlist.tsx";
import Error from "./pages/Error.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<Error />}>
      <Route index path='/' element={<Home />} errorElement={<Error />} />,
      <Route path='/login' element={<Login />} />,
      <Route path='/logout' element={<Home />} />,
      <Route path='/signup' element={<SignUp />} />,
      <Route path='/playlists' element={<MyPlaylists />} />
      <Route path='/playlists/:id' element={<Playlist />} />
      <Route path='/profile' element={<UserProfile />} />
      <Route path='*' element={<Page404 />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider defaultSetOptions={{ path: "/" }} />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
