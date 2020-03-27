import { db } from 'baqend';
import { Subject } from 'rxjs';

const AuthenticationService = {
  subject: new Subject(),

  isAuthenticated: function () {
    return db.ready().then(() => {
      return db.User.me ? Promise.resolve() : Promise.reject();
    });
  },

  authenticate: function(params) {
    return db.ready(() => {
      return db.User.login(params.username, params.password).then((data) => {
        this.subject.next(true);
        return data;
      });
    });
  },

  signout: function() {
    return db.User.logout().then(() => {
       this.subject.next(false);
       return;
    });
  }
};

export default AuthenticationService;
