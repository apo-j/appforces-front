/**
 * Created by Pluto on 6/22/2014.
 */
'use strict';

angular.module('services').factory('afCriteriaSearch', ['afDocsSearch', 'afUtils','$q',
    function(afDocsSearch, afUtils, $q){
        var self = this;
        var _index;

        /*
        * exemple
        * criteria:{
        *   isNew: true,
        *   active: false
        * }
        *
        * */

        self.exactSearch = function(criteria){
            var deferred = $q.defer();

            deferred.resolve(afUtils.Collection.where(afDocsSearch.docs, criteria));
           /* var query = '';

            for(var p in criteria){
                if(criteria.hasOwnProperty(p) && criteria[p]){
                    query += criteria[p] + ' ';
                }
            }

            deferred.resolve(afUtils.Collection.where(afDocsSearch.docs, criteria));
            var temporary = afDocsSearch.search('水宝宝');
            temporary.then(function(data){
                deferred.resolve(afUtils.Collection.where(data, criteria));
            });*/

            return deferred.promise;
        }

        return self;
    }]);