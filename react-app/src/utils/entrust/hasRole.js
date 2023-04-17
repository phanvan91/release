/**
 * Checks if the user has a role by its name.
 *
 * @param  string|array  name     Role name or array of role names.
 * @param  bool      requireAll All roles in the array are required.
 * @return bool
 */
export function hasRole(user, name, requireAll = false)
{
  // const user = useSelector(state => state.auth[user]);
  if (!user || !user?.roles) {
    return false
  }
  if (Array.isArray(name)) {
    for (let index = 0; index < name.length; index++) {
      let roleName = name[index]
      let checkRole = hasRole(roleName);

      if (checkRole && !requireAll) {
        return true;
      } else if (!checkRole && requireAll) {
        return false;
      }
    }

    // If we've made it this far and requireAll is FALSE, then NONE of the roles were found
    // If we've made it this far and requireAll is TRUE, then ALL of the roles were found.
    // Return the value of requireAll;
    return requireAll;
  } else {
    for (let index = 0; index < user.roles.length; index++) {
      let role = user.roles[index]
      if (role.role_name == name) {
        return true;
      }
      
    }
  }

  return false;
}
