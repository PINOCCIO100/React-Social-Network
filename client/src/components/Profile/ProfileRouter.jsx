import { Route, Routes } from "react-router-dom";
import ProfileContainer from "./ProfileContainer";

function ProfileRouter(props) {
  return (
    // TODO: Убрать этот колхоз с key={Date.now()}
    // Вставил, для ререндера компонента в случае выбора /profile без userID 
    // componentDidMount срабатывает только один раз, так как мы в index задаем точно такой же компонент 
    <Routes>
      <Route index element={<ProfileContainer key={Date.now()} {...props} />} />
      <Route path={`:userID`} element={<ProfileContainer {...props} />} />
    </Routes>
  )
}

export default ProfileRouter;