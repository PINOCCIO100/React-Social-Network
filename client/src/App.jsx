import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import './App.scss';
import './UI/UI.css';

import DialogsContainer from './components/Dialogs/DialogsContainer';
// import News from './components/News/News';
// import Music from './components/Music/Music';
import HeaderContainer from './components/Header/HeaderContainer';
import Sidebar from './components/SideBar/Sidebar';
// import Settings from './components/Settings/Settings';
import { SignUpForm } from './SignUpForm';
import ProfileRouter from './components/Profile/ProfileRouter';
import SignInContainer from './components/SignIn/SignInContainer';
import TrailingPage from './components/TrailingPage/TrailingPage';
import Users from './components/Users/Users';
import Redirect from './components/sharedComponents/WithAuthRedirect/WithAuthRedirect';

export function App() {
  return (
    <div className="App">
      <HeaderContainer />
      {
        < Routes >
          <Route path="login/*" element={<SignInContainer />} />
          <Route path='/*' element={<Layout />}>
            <Route index element={<Navigate to={'/profile'} />} />
            <Route path="profile/*" element={<ProfileRouter />} />
            <Route path="find-users/*" element={<Users />} />
            <Route path="dialogs/*" element={<DialogsContainer />} />
            <Route path="news/*" element={null} />
            <Route path="music/*" element={null} />
            <Route path="settings/*" element={<SignUpForm />} />
            <Route path='*' element={<TrailingPage />} />
          </Route>
        </Routes >
      }
    </div>
  )
}

function Layout() {
  return (
    <>
      <div className="App__main">
        <Sidebar />
        <div className="App__content-wrapper">
          <Redirect to={Outlet} />
        </div>
      </div>
    </>
  );
}


