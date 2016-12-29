'use strict';

app.factory('AuthService', ['$http', 'AppService', '$rootScope', '$interval',
    function ($http, AppService, $rootScope, $interval) {

        var authService = {};

        authService.login = function (credentials) {

            AppService.removeToken();

            return $http
                    .post('https://reforce-pgxp.rhcloud.com/api/auth', credentials)
                    .success(function (res, status, headers) {

                        AppService.setToken(res.token);
                        $rootScope.currentUser = AppService.getUserFromToken();
                        return res;
                    }
                    );

        };

        authService.retoken = function () {
            return $http
                    .get('https://reforce-pgxp.rhcloud.com/api/auth')
                    .success(function (res, status, headers) {
                        AppService.removeToken();
                        AppService.setToken(res.token);
                        $rootScope.currentUser = AppService.getUserFromToken();
                        return res;
                    }
                    );
        };

        $interval(function () {
            authService.retoken();
        }, 3600000);

        authService.setCss = function (css) {
            AppService.setCss(css);
        };

        authService.getCss = function () {
            return AppService.getCss();
        };

        authService.logout = function () {
            AppService.removeToken();
        };

        authService.isAuthenticated = function () {
            if (!$rootScope.currentUser)
                $rootScope.currentUser = AppService.getUserFromToken();

            return $rootScope.currentUser ? true : false;
        };

        authService.isAuthorized = function (authorizedRoles) {

            if (authService.isAuthenticated()) {

                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }

                var hasAuthorizedRole = false;

                var perfil = $rootScope.currentUser.roles;

                if (perfil !== undefined && perfil !== null) {
                    for (var i = 0; i < authorizedRoles.length; i++) {
                        for (var p = 0; p < perfil.length; p++) {
                            if (authorizedRoles[i] === perfil[p]) {
                                hasAuthorizedRole = true;
                                break;
                            }
                        }
                    }
                }
            } else {
                return false;
            }

            return hasAuthorizedRole;
        };

        return authService;
    }]);
