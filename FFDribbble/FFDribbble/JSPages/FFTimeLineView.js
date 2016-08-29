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
        var color = require('UIColor').colorWithHex(0xFC7274);
        self.view().setBackgroundColor(color);
    }
            
})