/* 
  FFDetailHeaderView.js
  FFDribbble

  Created by 张玲玉 on 16/8/30.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

require('UIColor,UIButton')

var gap=10;
var authorButtonSize=40;

defineClass('FFDetailHeaderView: UIView', [
'authorButton',

], {
            
    initWithModel: function(model) {
        self = self.super().init();
        if (self) {
            self.setBackgroundColor(UIColor.yellowColor());
            self.setFrame({x: 0, y: 0, width: SCREEN_WIDTH, height: 100});
            
            var authorButton = UIButton.alloc().initWithFrame({x: gap, y: gap, width: authorButtonSize, height: authorButtonSize});
            authorButton.setBackgroundColor(UIColor.orangeColor());
            self.addSubview(authorButton);

            
        }
        return self;
    },

})