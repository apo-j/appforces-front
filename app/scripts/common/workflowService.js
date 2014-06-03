/**
 * Created by xyj on 03/06/2014.
 */
'use strict';

var Workflow = function(theme, states){
    var self = this;

    self.theme = theme;
    self.states = states;

    var currentIndex = 0;
    var maxStep = self.states.length;

    self.current = function(){
        return self.states[currentIndex] || false;
    };

    self.back = function(){
        currentIndex--;
        if(currentIndex > -1){
            return self.states[currentIndex]
        }
    };

    self.next = function(){
        currentIndex++;
        if(currentIndex < maxStep){
           return self.states[currentIndex]
        }
    }
}
