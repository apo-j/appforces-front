/**
 * Created by Pluto on 12/30/13.
 */
var Enums = (function(enums){
    var self = enums;

    self.elementTypeEnums = {
        text: 1,
        image: 2
    };

    self.pageType = {
		pSignin: '100',
        pSignup: '101',
		p404: '102',
		p500: '103',
		p401: '104',
        pSearchResult:'105',
		p0: 'ordinary'
	};
	
	self.NavigationType = {
		outer: "£outer",
		inner: "£inner",
		jump: "£jump",
		content: "£content"
	};

    return self;
}(Appforces.Enums || {}))