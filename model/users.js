/**
 * Created by Michael on 27/03/15.
 */
var users = [

    {userName: "Michael", password: "password"}
]
function _check(userName,password){
    var found = users.filter(function(user){
        return user.userName === userName && user.password === password;
    })
    return found.length === 1 ? true : false;
}
module.exports = {

    check: function(user,pass){

        return _check(user, pass);
    }
}