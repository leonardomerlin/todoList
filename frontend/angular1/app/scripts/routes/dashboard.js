'use strict';

app.config(['$routeProvider', 'USER_ROLES',
    function ($routeProvider, USER_ROLES) {

        $routeProvider

                .when('/', {
                    templateUrl: 'views/aulas.html',
                    controller: 'DashboardController',
                    data: {
                        authorizedRoles: [USER_ROLES.PROFESSOR]
                    }
                })

                .when('/aulas', {
                    templateUrl: 'views/aulas.html',
                    controller: 'DashboardController',
                    data: {
                        authorizedRoles: [USER_ROLES.PROFESSOR]
                    }
                })

                .when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'AuthController',
                    data: {
                        authorizedRoles: [USER_ROLES.NOT_LOGGED]
                    }
                })

                .otherwise({
                    redirectTo: '/',
                    data: {
                        authorizedRoles: [USER_ROLES.PROFESSOR]
                    }
                });

    }]);