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
(function(components){
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
        11:'navbar',
        12:'navbarItem',
        13:'htmlContent',
        14:'containerArticles',
        15:'articleBloc',
        16:'articleDetailsBloc',
        17:'articleBuyerConfigBloc',
        18:'searchResult',
        19:'workflow',
        20:'form',
        21:'formItem',
        22:'articleViewGallery',
        23:'articleDescription'
    }

    $.extend( true, components, component );
    return components;
}(Appforces.Components || {}))