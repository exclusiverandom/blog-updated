import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import UserContextProvider from "./contexts/UserContext";
import CreatePost from "./pages/CreatePost";
import FullPost from "./pages/FullPost";
import EditPost from "./pages/EditPost";
import MyPosts from "./pages/MyPosts";
import LikeContextProvider from "./contexts/LikeContext";
import Favourite from "./pages/Favourite";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // const {user}=useContext(UserContext)
  return (
    <UserContextProvider>
      <LikeContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<FullPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/favourite" element={<Favourite />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          limit={3}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      </LikeContextProvider>
    </UserContextProvider>
  );
}

export default App;
