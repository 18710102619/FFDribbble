/* 
  FFLoadFinishView.js
  FFDribbble

  Created by 张玲玉 on 16/9/1.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

require('UIFont,UIColor,UILabel')

defineClass('FFLoadFinishView: UIView', {
            
    init: function() {
        self = self.super().init();
        self.setFrame({x:0, y:0, width:SCREEN_WIDTH, height: 50});
        
        var X=(SCREEN_WIDTH-90)/2;
        var H=30;
        
        var titleLabel=UILabel.alloc().init();
        //titleLabel.setBackgroundColor(UIColor.magentaColor());
        titleLabel.setFont(UIFont.systemFontOfSize(14));
        titleLabel.setFrame({x:X, y: 10, width:90, height: H});
        titleLabel.setTextColor(UIColor.grayColor());
        titleLabel.setText('加载完毕！');
        titleLabel.setTextAlignment(1);
        self.addSubview(titleLabel);
        
        return self;
    },
            
})