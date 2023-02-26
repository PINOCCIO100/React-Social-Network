import s from './Dialogs.module.scss';
import { Route, Routes } from 'react-router-dom';

import { DialogsSidebar } from './DialogsSidebar/DialogsSidebar';
import { DialogsMessages } from './DialogsMessages/DialogsMessages';

export function Dialogs(props) {
  return (
    <div className={s.Dialogs}>
      <div className={s.Dialogs__wrapper}>
        <h1 className={s.Dialogs__title}>
          Dialogs
        </h1>
        <div className={s.Dialogs__body}>
          <div className={s.Dialogs__sidebar}>
            <DialogsSidebar {...props} />
          </div>
          <div className={s.Dialogs__messages}>
            <Routes>
              <Route path='/' element={null} /> {/* TODO: вместо null что-то написать */}
              <Route path="user/:userID" element={<DialogsMessages />} />
            </Routes>
          </div>
        </div>
      </div>
    </div >
  );
}
