import UsersModule, { User } from '../store/modules/UsersModule';

interface Roles { [bitValue: number]: string}

const roles: Roles = {
  1: 'Elev',
  2: 'Elevhälsoteam',
  4: 'Lärare',
  8: 'Vaktmästare',
  16: 'Administratör',
  32: 'Rektor'
};

export default class RoleChecker {

  private static checkPermission(user: User, required: number): boolean {
    return user && ((user.role & required) == required || (user.role > required));
  }
  
  static isPrincipal(): boolean {
    return this.checkPermission(UsersModule.currentUser, 32);
  }

  static isAdmin(): boolean {
    return this.checkPermission(UsersModule.currentUser, 16);
  }

  static isCaretaker(): boolean {
    return this.checkPermission(UsersModule.currentUser, 8);
  }

  static isTeacher(): boolean {
    return this.checkPermission(UsersModule.currentUser, 4);
  }

  static isStudentHealth(): boolean {
    return this.checkPermission(UsersModule.currentUser, 2);
  }

  static isStudent(): boolean {
    return UsersModule.currentUser && (UsersModule.currentUser.role & 1) == 1;
  }

  static roleAsText(): string {
    if (!UsersModule.currentUser) {return ''; }
    for(const bitValue of Object.keys(roles).reverse()) {
      if (UsersModule.currentUser.role >= Number(bitValue)) {
        return roles[Number(bitValue)];
      }
    }
    return '';
  }
}
