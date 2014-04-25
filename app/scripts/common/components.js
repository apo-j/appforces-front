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
        5:'listItemLink',
        6:'listItem',
        7:'search',
        8:'localSearch'
    }

    $.extend( true, components, component );
    return components;
}(Appforces.Components || {}))