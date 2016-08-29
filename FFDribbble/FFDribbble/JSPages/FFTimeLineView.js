/* 
  FFTimeLineView.js
  FFDribbble

  Created by 张玲玉 on 16/8/29.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

require('UIColor');

defineClass('FFTimeLineView: UIView', ['nameLabel'], {
    
    init: function() {
        self=self.super().init();

        self.setFrame({x: 0, y: 0, width: FFTimeLineView_Width, height: FFTimeLineView_Height});
        self.setBackgroundColor(UIColor.whiteColor());
            
        return self;
    },
            
})