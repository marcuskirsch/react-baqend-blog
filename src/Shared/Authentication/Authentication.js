import { db } from 'baqend';

const AuthenticationService = {

 isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' ? true : false,

  authenticate: function(params) {
     return db.ready(() => {
        return db.User.login(params.username, params.password).then(() => {
          this.isAuthenticated = true;
          localStorage.setItem('isAuthenticated', true);
        });
      });
  },

  /**
   *
   */
  signout: function() {
    return db.User.logout().then(() => {
      this.isAuthenticated = false;
      localStorage.setItem('isAuthenticated', false);
    });
  }
};

export default AuthenticationService;
