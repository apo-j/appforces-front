/**
 * Created by xyj on 10/06/2014.
 */

'use strict';

var Workflow = (function(workflow){
    var flow = {
        1:{
            code:'payment',
            url: '/checkout'
        }
    }

    $.extend( true, workflow, flow );
    return flow;
}(Appforces.Workflow || {}))