import React, { useState } from 'react';

const ProfileStatusWithHooks = (props) => {

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditMode(true);
  }

  const deActivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <React.Fragment>
      {!editMode &&
        <div>
          <span onDoubleClick={activateEditMode}>
            {props.status || "----"}
          </span>
        </div>
      }
      {editMode &&
        <div>
          <input onChange={onStatusChange} onBlur={deActivateEditMode} autoFocus={true} value={status} />
        </div>
      }

    </React.Fragment>
  )
}

export default ProfileStatusWithHooks;
