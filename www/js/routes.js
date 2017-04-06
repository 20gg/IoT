define(['app'],function (app) {
    app
        .config(function($stateProvider, $urlRouterProvider) {
            // Override the internal 'views' builder with a function that takes the state
            // definition, and a reference to the internal function being overridden:
            $stateProvider.decorator('views', function(state, parent) {
                var result = {}, views = parent(state);
                //var head = "http://192.168.1.48:8081/kangbaomu/doctor/www/";
                var head = "";
                angular.forEach(views, function(config, name) {
                    config.controllerUrl = head+config.controllerUrl;
                    config.templateUrl = head+config.templateUrl;
                    result[name] = config;
                });
                return result;
            });

            $stateProvider
                // 首页
                .state('index', {
                    url: '/index',
                    templateUrl:"templates/index.html",
                    controller: "indexCtrl",
                    controllerUrl: 'js/controllers/index.js'
                })

                // 登录
                .state('login', {
                    url: '/login',
                    templateUrl:"templates/login.html",
                    controller: "loginCtrl",
                    controllerUrl: 'js/controllers/login.js'
                })

                // 注册
                .state('register', {
                    url: '/register',
                    templateUrl:"templates/register.html",
                    controllerUrl: 'js/controllers/register.js',
                    controller: "registerCtrl"
                })
 
                // 功能界面
                .state('home', {
                    url: '/home/:id',
                    templateUrl: 'templates/home.html',
                    controller: 'homeCtrl',
                    controllerUrl: 'js/controllers/home.js'
                })
         

            $urlRouterProvider.otherwise("index");

        });
});