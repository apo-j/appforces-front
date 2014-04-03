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
		pSignin: '100',
        pSignup: '101',
		p404: '102',
		p500: '103',
		p401: '104',
		p0: 'ordinary'
	};

    return self;
}(Appforces.Enums || {}))