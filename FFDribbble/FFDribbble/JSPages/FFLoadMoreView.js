/* 
  FFLoadMoreView.js
  FFDribbble

  Created by 张玲玉 on 16/8/29.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

require('UIFont,UIColor,UILabel,UIActivityIndicatorView')

defineClass('FFLoadMoreView: UIView', {
            
    init: function() {
        self = self.super().init();
        self.setFrame({x:0, y:0, width:SCREEN_WIDTH, height: 50});
            
        var X=(SCREEN_WIDTH-130)/2;
        var H=30;
            
        var loadingView = UIActivityIndicatorView.alloc().initWithActivityIndicatorStyle(2);
        //loadingView.setBackgroundColor(UIColor.magentaColor());
        loadingView.startAnimating();
        loadingView.setFrame({x:X, y: 10, width:H, height: H});

        var titleLabel=UILabel.alloc().init();
        //titleLabel.setBackgroundColor(UIColor.magentaColor());
        titleLabel.setFont(UIFont.systemFontOfSize(14));
        titleLabel.setFrame({x:X+40, y: 10, width:90, height: H});
        titleLabel.setTextColor(UIColor.grayColor());
        titleLabel.setText('正在加载...');
            
        self.addSubview(loadingView);
        self.addSubview(titleLabel);

        return self;
    },
            
})