import React from 'react'
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import M from 'materialize-css/dist/js/materialize.min';

// bring connect in order to use redux
import { connect } from 'react-redux';
//bring action
import { deleteLog, setCurrent } from '../../actions/logActions';
//we get these actions in prop after putting mapStateToProps into connect(the end of this file)
// also we put actions into connect too so they become a part of props
const LogItem = ({ log, deleteLog, setCurrent }) => {
  const onDelete = () => {
    deleteLog(log.id);

    M.toast({ html: 'Log Deleted' })
  }

  return (
    <li className="collection-item">
      <div>
        <a href="#edit-log-modal" className={`modal-trigger ${
          log.attention ? 'red-text' : 'blue-text'
        }`}
        onClick={() => setCurrent(log)}
        >
          {log.message}
        </a>
        <br/>
        <span className="grey-text">
          <span className="black-text">ID #{log.id} </span>last updated by 
          <span className="black-text"> {log.tech} </span>
          on <Moment format='MMMM do YYYY, h:mm:ss a'>{log.date}</Moment>
        </span>
        <a href="#!" onClick={onDelete} className="secondary-content">
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  )
}

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
}

//null - not getting anything from state
export default connect(null, { deleteLog, setCurrent })(LogItem)
