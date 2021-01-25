import React, { ChangeEvent } from 'react';

type PropTypes = {
  status: string,
  updateStatus: (newStatus: string) => void
}

type StateType = {
  editMode: boolean,
  status: string
}

class ProfileStatus extends React.PureComponent<PropTypes, StateType> {
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

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate(prevProps: PropTypes, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  };

  /* При использовании PureComponent метод shoulComponentUpdate не нужен - его задачу заменяет PureComponent
    shouldComponentUpdate(nextProps, nextState) {
      return nextProps !== this.props || nextState !== this.state;
    }
   */
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
