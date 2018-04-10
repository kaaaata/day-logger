import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// import store from './redux/store';
import Login from './Login';
import Header from './Header';
import Calendar from './Calendar';
import Day from './Day';
import Statistics from './Statistics';
import './styles/App.css';

const mapStateToProps = (state) => ({
  days: state.default.days,
});

export default withRouter(connect(mapStateToProps)(class App extends Component {
  render() {
    const { days } = this.props;

    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => <Login />} />
          <Route exact path="/days" render={() => <div><Header /><Calendar /></div>} />
          <Route exact path="/statistics" render={() => <div><Header /><Statistics /></div>} />
          {days.map((day, index) => (
            <Route key={index} exact path={"/day/" + day.id} render={() => <div><Header /><Day {...day} /></div>} />
          ))}
        </Switch>
      </div>
    );
  }
}));
