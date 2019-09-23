import React, { useEffect } from 'react';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types'

// bring connect in order to use redux
import { connect } from 'react-redux';
//bring action
import { getLogs } from '../../actions/logActions';

//we get prop after putting mapStateToProps into connect(the end of this file)
// also we put getLogs into connect too so it becomes a part of props
const Logs = ({ log: {logs, loading}, getLogs}) => {
  
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, [])

  if(loading || logs === null) {
    return <Preloader />
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (<p className="center">No Logs To Show</p>) : (
        logs.map(log => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  )
}

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
}

// this is how we get smth from the store
const mapStateToProps = state => ({
  // prop we can call it what we want
  // state.(and here we put the name of propperty in rootReducer that contains corresponding reducer)
  log: state.log
});

export default connect(mapStateToProps, {getLogs})(Logs);
