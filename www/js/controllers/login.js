define(['app'],function (app) {
    app.controller('loginCtrl', ['$scope','$ionicPopup','$ionicLoading','$http',
                         function($scope, $ionicPopup,$ionicLoading,$http){
          $scope.user = {
                username:'',
                password:''
            }
             var username = localStorage.getItem("username")
             var password = localStorage.getItem("password")
             if (username || password ) {
                $scope.user.username = username;
                $scope.user.password = password;
             }

        $scope.login = function() {
            var username = $scope.user.username,
                password = $scope.user.password;
            if (!username || username == '') {
                showMsg('用户名不能为空');
                return;
            }
            if (!password || password == '') {
                showMsg('密码不能为空');
                return;
            }
            
            var url = rootUrl+"/weChat/login.html?username="+username+"&password="+password;  
            $http.get(url).success(
                function (data) {
                    showMsg(data.message);
                    if(data.success){
                        localStorage.setItem("username",username);
                        localStorage.setItem("password",password);
                        localStorage.setItem("userId",data.data);
                        location.href = "#/home/"+data.data;
                    }
            });
        };
        /**
         * 密码明文查看
         * @return {[type]} [description]
         */
        $scope.showPassword = function() {
            $scope.show_psd = !$scope.show_psd
        }
        /**
         * 提示信息
         * @param  {[type]} msg [description]
         * @return {[type]}     [description]
         */
        function showMsg(msg) {
            $ionicLoading.show({
                template: msg,
                noBackdrop: false,
                duration: 1000
            })
        }
    }]);
});