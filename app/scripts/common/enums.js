/**
 * Created by Pluto on 12/30/13.
 */
var Enums = (function(enums){
    var self = enums;

    self.layout = {
        Top: 2,
        Left: 4,
        Right: 8,
        Bottom: 16
    }

    self.currencyEnums = {
        RMB: 1,
        EURO: 2,
        DOLLAR: 3
    }

    self.elementTypeEnums = {
        text: 1,
        image: 2
    };

    self.pageType = {
		pSignin: '100',
        pSignup: '101',
		p404: 1,
		p500: 2,
		p401: 3,
        pSearchResult:4,
		p0: 5
	};

    self.workflowEnums = {
        login: "login",
        payment: "payment"
    }

	self.NavigationType = {
		outer: "£outer",
		inner: "£inner",
		jump: "£jump",
		content: "£content"
	};

    self.FormItemTypeEnums = {
        1: "text",
        2: "textarea",
        3: "radio",
        4: "checkbox",
        5: "label"
    };

    return self;
}(Appforces.Enums || {}))