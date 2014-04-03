/**
 * Created by Pluto on 12/30/13.
 */
var Enums = (function(enums){
    var self = enums;

    self.elementTypeEnums = {
        Text: 1,
        Image: 2
    };

    self.pageType = {
		100: 'sign_in',
		101: 'sign_up',
		102: '404',
		103: '500',
		104: '401',
		0: 'ordinary'
	};

    return self;
}(Appforces.Enums || {}))