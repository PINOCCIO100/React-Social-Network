import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusThunk } from '../../../store/reducers/usersProfileInfoReducer';
import s from './ProfileStatus.module.scss';


function ProfileStatus(props) {
  
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status ?? '');

  const me = useSelector(state => state.Auth.id === state.ProfileState.userProfileInfo.id);

  const enterKeyHandler = (e) => {
    if (e.code === 'Enter') createStatus();
  }
  const createStatus = () => {
    dispatch(setStatusThunk(status))
    setEditMode(false);
  }

  const onDoubleClick = () => {
    if (me) setEditMode(true)
  }
  return (
    <div className={s.ProfileStatus}>
      {editMode && me ?
        <div className={s.ProfileStatus_input}>
          <input autoFocus onKeyDown={enterKeyHandler} onBlur={createStatus} onChange={e => setStatus(e.currentTarget.value)} value={status} />
        </div> :
        me && status === '' ?
          <div onDoubleClick={onDoubleClick}
            className={s.ProfileStatus_span + ' ' + s.ProfileStatus_span_empty}>
            <span >{`Double click to add status...`}</span>
          </div> :
          <div onDoubleClick={onDoubleClick} className={s.ProfileStatus_span}>
            <span >{status}</span>
          </div>
      }
    </div>
  );

}

export default ProfileStatus;