import React, { useState, useEffect, ChangeEvent } from 'react';

type PropsType = {
  status: string;
  updateStatus: (status: string) => void;
};

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deActivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <React.Fragment>
      {!editMode && (
        <div>
          <b>Status:</b>
          <span onDoubleClick={activateEditMode}>{props.status || '----'}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            onBlur={deActivateEditMode}
            autoFocus={true}
            value={status}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default ProfileStatusWithHooks;
