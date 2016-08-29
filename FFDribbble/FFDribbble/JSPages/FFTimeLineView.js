/* 
  FFTimeLineView.js
  FFDribbble

  Created by 张玲玉 on 16/8/29.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

require('UIFont,UIColor,UILabel,UIButton,UIImageView')

defineClass('FFTimeLineView: UIView', [
    'iconButton',
    'iconImage',
    'titleLabel',
    'tapCallBack',
], {
    
    init: function() {
        self=self.super().init();

        self.setFrame({x: 0, y: 0, width: FFTimeLineView_Width, height: FFTimeLineView_Height});
        self.setBackgroundColor(UIColor.whiteColor());
        
        var W=FFTimeLineView_Width - 10;
        var iconButton = UIButton.alloc().initWithFrame({x: 5, y: 5, width: W, height: W*3/4});
        iconButton.setBackgroundColor(UIColor.orangeColor());
        iconButton.addTarget_action_forControlEvents(self, 'iconButtonClicked', 1 <<  6);
        self.addSubview(iconButton);
        self.setIconButton(iconButton);
            
        var Y=iconButton.frame().y+iconButton.frame().height+7;
        var iconImage = UIImageView.alloc().initWithFrame({x: 5, y: Y, width: 18, height: 18});
        iconImage.setBackgroundColor(UIColor.orangeColor());
        self.addSubview(iconImage);
        self.setIconImage(iconImage);
            
        var titleLabel = UILabel.alloc().initWithFrame({x: 28, y: Y, width:FFTimeLineView_Width-33, height:18});
        titleLabel.setBackgroundColor(UIColor.orangeColor());
        titleLabel.setFont(UIFont.systemFontOfSize(12));
        titleLabel.setTextColor(UIColor.grayColor());
        self.addSubview(titleLabel);
        self.setTitleLabel(titleLabel);
            
        return self;
    },
         
    // 点击事件
    iconButtonClicked: function() {
        if(self.tapCallBack()) {
            self.tapCallBack();
        }
    },
            
    // 赋值
    setModel :function(model) {
        self.iconButton().sd__setImageWithURL_forState(require('NSURL').URLWithString(model['images']['normal']), 0);
        self.iconImage().sd__setImageWithURL(require('NSURL').URLWithString(model['user']['avatar_url']));
        self.titleLabel().setText(model['user']['name']);
    },
})