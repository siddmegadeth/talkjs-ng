app.service('talkjs', ['$http', '$q', function($http, $q) {

    var talkAPI = 'https://api.talkjs.com/v1';
    var secretKey = 'sk_test_VcN37PcVe8AUajGP3epoEqV0';

    var talkJSUserSave = "/talkjs/save/user"
    // var talkJSUserSave = "https://hookup-production.herokuapp.com" + "/talkjs/save/user"

    return {

        saveTalkJSUser: function(current, linked) {

            return $http({
                method: 'GET',
                url: talkJSUserSave,
                param: {
                    current: current,
                    linked: linked
                }
            })
        },
        getMessages: function(userID) {
            $http.defaults.headers.common['Authorization'] = 'Bearer sk_test_VcN37PcVe8AUajGP3epoEqV0';

            var message = '/t3rP1O9r/users/' + userID + '/conversations?isOnline=true';
            var url = talkAPI + message;
            log(url);
            return $http({
                method: 'GET',
                url: url
            })
        },
        getCreatedUserList: function(userIDList) {

            $http.defaults.headers.common['Authorization'] = 'Bearer sk_test_VcN37PcVe8AUajGP3epoEqV0';
            // sort Array And Get Results From Participants
            var extractedUser = [];
            userIDList.forEach(function(tuple) {

                var tempList = Object.keys(tuple.participants);
                extractedUser.push({
                    profile: tempList[0]
                });
            });

            log("Extracted User:");
            log(extractedUser);

            //var url = "https: //api.talkjs.com/v1/t3rP1O9r/users/{userId}";
            var url = "https://api.talkjs.com/v1/t3rP1O9r/users/";
            log(url);
            var promises = [];

            extractedUser.forEach(function(tuple) {
                var newURL = url + tuple.profile;
                warn("New URL :");
                log(newURL);
                promises.push($http({
                    method: 'GET',
                    url: newURL
                }))
            });
            return $q.all(promises);

        },
        normalizeCreatedUserList: function(userList) {

            log(userList);
            var finalList = [];
            // Now POST Resolved DATA Now Sort Out Data And Merge Into Final List
            userList.forEach(function(tuple) {

                finalList.push(tuple.data);
            });

            warn("Final List:");
            log(finalList);
            return finalList;

        }

    }
}])
