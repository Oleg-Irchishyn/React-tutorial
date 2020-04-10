import React from 'react';
import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {
  statusInputRef = React.createRef();
  state = {
    editMode: false,
    status: this.props.status
  }
  activateEditMode() {
    this.setState({
      editMode: true
    });
  }
  deActivateEditMode() {
    this.setState({
      editMode: false
    });
    this.props.updateStatus(this.state.status);
  }

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.editMode &&
          <div>
            <span onDoubleClick={this.activateEditMode.bind(this)}>
              {this.props.status || "----"}
            </span>
          </div>
        }
        {this.state.editMode &&
          <div>
            <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateEditMode.bind(this)} value={this.state.status} />
          </div>
        }

      </React.Fragment>
    )
  }
}

export default ProfileStatus;
