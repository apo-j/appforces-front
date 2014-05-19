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
        2:'carousel',
        3:'accordion',
        4:'list',
        5:'listItemLink',
        6:'listItem',
        7:'search',
        8:'localSearch',
        9:'localSearchContainer',
        10:'container',
        11:'articleBloc',
        12:'articleDetailsBloc'
    }

    $.extend( true, components, component );
    return components;
}(Appforces.Components || {}))