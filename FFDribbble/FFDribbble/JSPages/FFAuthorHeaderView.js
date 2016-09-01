/* 
  FFAuthorHeaderView.js
  FFDribbble

  Created by 张玲玉 on 16/9/1.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

require('NSURL,UIFont,UIColor,UIView,UIImage,UILabel,UIButton')

var gap=15;
var authorSize=140;
var W = SCREEN_WIDTH / 3;

defineClass('FFAuthorHeaderView: UIView', [
'model',
'nameLabel',
                                           
], {

    initWithModel: function(model) {
        self = self.super().init();
        if (self) {
            self.setModel(model);
            //self.setBackgroundColor(UIColor.whiteColor());

            var authorImage = UIImageView.alloc().initWithFrame({x: (SCREEN_WIDTH-authorSize)/2, y: 30, width: authorSize, height: authorSize});
            //authorImage.setBackgroundColor(UIColor.orangeColor());
            self.addSubview(authorImage);

            var nameLabel = UILabel.alloc().initWithFrame({x: 0, y:authorImage.maxY()+10, width:SCREEN_WIDTH , height:20});
            //nameLabel.setBackgroundColor(UIColor.orangeColor());
            nameLabel.setFont(UIFont.systemFontOfSize(18));
            nameLabel.setTextAlignment(1);
            self.addSubview(nameLabel);
            self.setNameLabel(nameLabel);
            
            authorImage.sd__setImageWithURL(require('NSURL').URLWithString(model['avatar_url']));
            nameLabel.setText(model['name']);
            
            var seeView=self.getPanelView(model['followers_count'], 'follower');
            self.addSubview(seeView);
            
            var shotView=self.getPanelView(model['shots_count'], 'shots');
            shotView.setX(W);
            self.addSubview(shotView);
            
            var likeView=self.getPanelView(model['likes_received_count'], 'likes');
            likeView.setX(2*W);
            self.addSubview(likeView);
            
            self.setFrame({x: 0, y: 0, width: SCREEN_WIDTH, height: seeView.maxY()+gap});
        }
        return self;
    },
            
    getPanelView : function(num, title) {
        var panelView = UIView.alloc().init();
        //panelView.setBackgroundColor(UIColor.orangeColor());
            
        var numLabel = UILabel.alloc().initWithFrame({x:0,y:0,width:W,height:30});
        //numLabel.setBackgroundColor(UIColor.magentaColor());
        numLabel.setFont(UIFont.systemFontOfSize(21));
        numLabel.setText(self.formatNum(num));
        numLabel.setTextAlignment(1);
        panelView.addSubview(numLabel);

        var titleLabel = UILabel.alloc().initWithFrame({x:0,y:numLabel.maxY()+3,width:W,height:20})
        //titleLabel.setBackgroundColor(UIColor.magentaColor());
        titleLabel.setTextColor(UIColor.colorWithWhite_alpha(.5, 1))
        titleLabel.setFont(UIFont.systemFontOfSize(15));
        titleLabel.setText(title);
        titleLabel.setTextAlignment(1);
        panelView.addSubview(titleLabel);

        panelView.setFrame({x:0,y:self.nameLabel().maxY()+gap,width:W,height:titleLabel.maxY()});
        return panelView;
    },
            
    formatNum: function(num){
        if (num >= 1000) {
        return (num/1000).toFixed(1) + 'k'
        }
        return num ? num.toString() : 0;
    }
            
})



