/* 
  FFDetailHeaderView.js
  FFDribbble

  Created by 张玲玉 on 16/8/30.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

require('NSURL,UIFont,UIColor,UIView,UIImage,UILabel,UIButton')

var gap=10;
var authorSize=40;

defineClass('FFDetailHeaderView: UIView', [
'photoImage',

], {
            
    initWithModel: function(model) {
        self = self.super().init();
        if (self) {
            //self.setBackgroundColor(UIColor.yellowColor());
            
            var authorButton = UIButton.alloc().initWithFrame({x: gap, y: gap, width: authorSize, height: authorSize});
            //authorButton.setBackgroundColor(UIColor.orangeColor());
            self.addSubview(authorButton);
            
            var X=gap * 2 + authorSize;
            var W=SCREEN_WIDTH - authorSize - gap * 3;
            var H=20;
            
            var nameLabel = UILabel.alloc().initWithFrame({x: X, y:gap, width:W , height:H});
            //nameLabel.setBackgroundColor(UIColor.orangeColor());
            nameLabel.setFont(UIFont.systemFontOfSize(14));
            self.addSubview(nameLabel);

            var timeLabel = UILabel.alloc().initWithFrame({x: X, y:gap + H, width:W, height:H});
            //timeLabel.setBackgroundColor(UIColor.orangeColor());
            timeLabel.setFont(UIFont.systemFontOfSize(12));
            timeLabel.setTextColor(UIColor.grayColor());
            self.addSubview(timeLabel);
            
            W=SCREEN_WIDTH - gap * 2;
            var photoImage = require('UIImageView').alloc().initWithFrame({x: gap, y:gap * 2 + authorSize, width: W, height: W * 3/4});
            //photoImage.setBackgroundColor(UIColor.orangeColor());
            self.addSubview(photoImage);
            self.setPhotoImage(photoImage);
            
            var panelView = self._getPanelView(model);
            self.addSubview(panelView);
            self.setFrame({x: 0, y: 0, width: SCREEN_WIDTH, height: UIHelper.bottomY(panelView)});
            
            authorButton.sd__setImageWithURL_forState(NSURL.URLWithString(model['user']['avatar_url']), 0);
            photoImage.sd__setImageWithURL(NSURL.URLWithString(model['images']['normal']));
            nameLabel.setText(model['user']['name'])
            
            var date = new Date(model['created_at']);
            var dateStr = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + ' ' + date.getHours() + ':' + date.getMinutes();
            timeLabel.setText(dateStr);
        }
        return self;
    },

    _getPanelView:function(model) {
        var panelView = UIView.alloc().init();
        //panelView.setBackgroundColor(UIColor.orangeColor());
        
        var size = 14;
        var seeImage = UIImageView.alloc().initWithFrame({x:0, y:-1, width:16, height: 16});
        //seeImage.setBackgroundColor(UIColor.magentaColor());
        seeImage.setImage(UIImage.imageNamed('see.png'));
        panelView.addSubview(seeImage);
        var seeLabel = self._genPanelLabel(model['views_count'], {x: UIHelper.rightX(seeImage) + 5, y:0, width:0, height: size});
        //seeLabel.setBackgroundColor(UIColor.magentaColor());
        panelView.addSubview(seeLabel);

        var commentImage = UIImageView.alloc().initWithFrame({x: UIHelper.rightX(seeLabel) + 10, y:0, width:size, height: size});
        //commentImage.setBackgroundColor(UIColor.magentaColor());
        commentImage.setImage(UIImage.imageNamed('comment.png'));
        panelView.addSubview(commentImage);
        var commentLabel = self._genPanelLabel(model['comments_count'], {x: UIHelper.rightX(commentImage) + 5, y:0, width:0, height:size});
        //commentLabel.setBackgroundColor(UIColor.magentaColor());
        panelView.addSubview(commentLabel);

        var likeImage = UIImageView.alloc().initWithFrame({x:UIHelper.rightX(commentLabel) + 10, y:0, width:size, height: size});
        //likeImage.setBackgroundColor(UIColor.magentaColor());
        likeImage.setImage(UIImage.imageNamed('like.png'));
        panelView.addSubview(likeImage);
        var likeLabel = self._genPanelLabel(model['likes_count'], {x: UIHelper.rightX(likeImage) + 5, y:0, width:40, height:size});
        //likeLabel.setBackgroundColor(UIColor.magentaColor());
        panelView.addSubview(likeLabel);
        
        var W=UIHelper.rightX(likeLabel);
        var X=SCREEN_WIDTH-gap-W;
        panelView.setFrame({x :X, y: UIHelper.bottomY(self.photoImage())+gap, width: W, height: 25});
        return panelView;
    },
            
    _genPanelLabel: function(value, frame) {
        var viewLabel = UILabel.alloc().initWithFrame(frame)
        viewLabel.setText(value.toString());
        viewLabel.setFont(UIFont.systemFontOfSize(12));
        viewLabel.setTextColor(UIColor.colorWithWhite_alpha(.5, 1))
        viewLabel.sizeToFit();
        return viewLabel;
    },
            
})