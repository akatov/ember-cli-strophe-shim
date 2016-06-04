import Ember from 'ember';

const { Logger } = Ember;

const { Strophe } = window;

const {
  LogLevel: {
    DEBUG,
    INFO,
    WARN,
    ERROR,
    FATAL,
  },
} = Strophe;

const EmberLogLevel = {};
EmberLogLevel[DEBUG] = 'debug';
EmberLogLevel[INFO]  = 'info';
EmberLogLevel[WARN]  = 'warn';
EmberLogLevel[ERROR] = 'error';
EmberLogLevel[FATAL] = 'error';

Strophe.log = function(level, msg) {
  const emberLogLevel = EmberLogLevel[level];
  Logger[emberLogLevel](msg);
};

export default Strophe;
