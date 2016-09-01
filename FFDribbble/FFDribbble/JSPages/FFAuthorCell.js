/* 
  FFAuthorCell.js
  FFDribbble

  Created by 张玲玉 on 16/9/1.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

var gap=8;
var W=(SCREEN_WIDTH-3*gap)/2;
var H=W*3/4;

global.FFAuthorCell_Height=H+gap;

require('UIButton')

defineClass('FFAuthorCell: UITableViewCell', [
'iconButton1',
'iconButton2',
'tapCallBack',
'model1',
'model2',
                                              
], {
            
    initWithStyle_reuseIdentifier: function(style, reuseIdentifier) {
        self = self.super().initWithStyle_reuseIdentifier(style, reuseIdentifier);
        if (self) {
            self.setSelectionStyle(0);
            self.setBackgroundColor(UIColor.clearColor());
            
            var iconButton1 = UIButton.alloc().initWithFrame({x: gap, y: gap, width: W, height: H});
            //iconButton1.setBackgroundColor(UIColor.orangeColor());
            iconButton1.addTarget_action_forControlEvents(self, 'iconButton1Clicked', 1 <<  6);
            self.addSubview(iconButton1);
            self.setIconButton1(iconButton1);
            
            var iconButton2 = UIButton.alloc().initWithFrame({x: iconButton1.maxX()+gap, y: gap, width: W, height: H});
            //iconButton2.setBackgroundColor(UIColor.orangeColor());
            iconButton2.addTarget_action_forControlEvents(self, 'iconButton2Clicked', 1 <<  6);
            self.addSubview(iconButton2);
            self.setIconButton2(iconButton2);
        }
        return self;
    },
       
    iconButton1Clicked: function() {
        var cb = self.tapCallBack();
        if (cb) {
            cb(self.model1());
        }
    },

    iconButton2Clicked: function() {
        var cb = self.tapCallBack();
        if (cb) {
            cb(self.model2());
        }
    },
            
    setModels: function(model1,model2) {
        self.setModel1(model1);
        self.setModel2(model2);
        self.iconButton1().sd__setImageWithURL_forState(require('NSURL').URLWithString(model1['images']['normal']), 0);
        self.iconButton2().sd__setImageWithURL_forState(require('NSURL').URLWithString(model2['images']['normal']), 0);
    },
            
})


