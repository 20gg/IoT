define(['app'],function (app) {
    app.controller('registerCtrl', ['$scope','$ionicHistory','$ionicLoading','$http','$state',
    						function($scope,$ionicHistory,$ionicLoading,$http,$state) {
        $scope.$on("$ionicView.beforeEnter", function(){
            $scope.user = {
                    username:'',
                    password:'',
                    repassword:'',
                    deviceid:''
         	}
        });
        $scope.back = function() {
          $ionicHistory.goBack();
        }
        $scope.comfirm = function() {
           var username  = $scope.user.username ;
           var password  = $scope.user.password ;
           var repassword= $scope.user.repassword ;
           var deviceid = $scope.user.deviceid ;
            if (!username || username == '') {
                showMsg("用户名不能为空");
                return;
            }

            var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){5,11}$/;
            if (!patrn.exec(username)){
                 showMsg("用户名长度6位至12位，由字母开头加数字组成");
                return;
            }
 
            if (!password || password == '') {
                showMsg("密码不能为空");
                return;
            }
            if(password.length < 6 || password.length > 12){
                var temp = password.length > 12?"超过12位":"小于6位";
                showMsg("密码长度不能"+temp);
                return;
            }
            if (!repassword || repassword == '') {
                showMsg("重复密码不能为空");
                return;
            }
            if (repassword != password ) {
                showMsg("两次密码输入不一致");
                return;
            }
            if (!deviceid || deviceid == '') {
                showMsg("设备号不能为空");
                return;
            }
            var url = rootUrl+"/weChat/register.html?username="+username+"&password="+password+"&deviceid="+deviceid;
            $http.get(url,{})
            .success(function(data,status,headers,config){
                 showMsg(data.message);
                 if (data.success) {
                    location.href = "#/index";
                 };
            })
            .error(function(data,status,headers,config){
              showMsg("注册失败,请稍后再试！")
            })

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