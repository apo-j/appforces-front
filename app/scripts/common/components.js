/**
 * Created by Pluto on 2/27/14.
 */
'use strict';
/*
component:{
    type:'',
    name:''
}
 */
var Components = (function(components){
    var component = {
        1:'datepicker',
        2:'carrousel',
        3:'accordion',
        4:'list',
        5:'listItem'
    }

    $.extend( true, components, component );
    return components;
}(Appforces.Components || {}))