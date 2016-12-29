'use strict';

app.factory('DashboardService', ['$http', function ($http) {
        var service = {};

        service.findAula = function (id) {
            return $http
                    .get('https://reforce-pgxp.rhcloud.com/api/agenda/professor/'+id)
                    .then(function (res) {
                        return res.data;
                    });
        };

        return service;
    }]);

