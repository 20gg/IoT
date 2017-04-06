define(['app'],function (app) {
    app.controller('homeCtrl', ['$scope','$stateParams','$http','$ionicLoading', function($scope,$stateParams,$http,$ionicLoading) {
    	var interval ;
    	/**
    	 * 离开当前页面之前做的事
    	 * @param  {[type]} ) { clearInterval(interval);} [description]
    	 * @return {[type]}   [description]
    	 */
    	$scope.$on('$ionicView.beforeLeave', function() {
            clearInterval(interval);
        });
        $scope.$on('$ionicView.beforeEnter', function() {
            interval = setInterval(function(){
				var url = rootUrl+"/weChat/getStatus.html?id="+$stateParams.id;
		        $http.get(url).success(
		            function (data) {
		            	for (var i = 1; i < 7; i++) {
		            		 var temp = 'param'+i;
		            		 $scope.stm[temp] = data.data[temp] ; 
		            	}
		        	}
		        );
			},2000)
        });
        $scope.stm = {
	          "param1":"",
	          "param2":"",
	          "param3":"",
	          "param4":"",
	          "param5":"",
	          "param6":""

        }
		init();
		
		/**
		 * 初始化
		 * @return {[type]} [description]
		 */
		
		function init(){
			loadParam();
		}
		

        /**
         * 开关事件
         * @type {String}
         */
        $scope.change = function(index){
        	$scope.stm['led'+index] = 1 - $scope.stm['led'+index];
        	var status = $scope.stm['led'+index];

        	var url = rootUrl+"/weChat/closeLed.html";
        	if (status) {
				url = rootUrl+"/weChat/openLed.html";
        	}
    	    $http.get(url+"?id="+$stateParams.id+"&index="+index).success(
	            function (data) {
	            	showMsg(data.message);
	            	if(data.success){
						loadParam();
	            	}
	        	}
	        );
        }

        /**
         * 获取开关数据
         * @return {[type]} [description]
         */
        function loadParam(){
        	var url = rootUrl+"/weChat/getStatus.html?id="+$stateParams.id;
	        $http.get(url).success(
	            function (data) {
	            	var input = $("input[type='checkbox']");
	            	for(var i=1; i<7; i++){
	            		var temp = 'led'+i;
	            		$scope.stm[temp] = data.data[temp];
	            		input.eq(i-1).prop('checked',data.data[temp])
	            	}
	        	}
	        );
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
    
