/**
 * Created by Pluto on 2/12/14.
 */
exports.api = function(req, res){
    console.log('call api server');
    proxy.web(request, response, { target: 'http://localhost:9000' });
};