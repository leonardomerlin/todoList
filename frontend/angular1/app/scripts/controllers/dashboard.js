'use strict';

app.controller('DashboardController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'DashboardService', 'AlertService',
    function ($scope, $rootScope, AUTH_EVENTS, DashboardService, AlertService) {

        $scope.limpar = function () {
            $scope.aula = {};
            $scope.aulas = [];
        };

        $scope.limpar();

        //$rootScope.currentUser.identity
        $scope.findAula = function () {
            DashboardService.findAula(1).then(
                    function (data) {
                        $scope.aulas = data.content;
                    },
                    function (error) {
                        var data = error[0];
                        var status = error[1];

                        if (status === 401) {
                            AlertService.addWithTimeout('warning', data.message);
                        }
                    }
            );
        };

        $scope.findAula();

        $rootScope.$on(AUTH_EVENTS.aula, function (emit, args) {
            AlertService.notification("Mensagem", "Aulas atualizadas");
            $rootScope.$apply(function () {
                $scope.findAula();
            });
        });

    }]);
