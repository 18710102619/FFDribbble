/* 
  FFDetailCell.js
  FFDribbble

  Created by 张玲玉 on 16/8/30.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

require('UIFont,UIColor,UIButton,UILabel')

var gap=15;

defineClass('FFDetailCell: UITableViewCell', [
'authorButton',
'nameLabel',
'timeLabel',
'commentLabel',
'cellHeight',
'tapCallBack',
'model',
], {
    initWithStyle_reuseIdentifier: function(style, reuseIdentifier) {
        self = self.super().initWithStyle_reuseIdentifier(style, reuseIdentifier);
        if (self) {
            self.setBackgroundColor(UIColor.whiteColor());
            self.setSelectionStyle(0);

            var authorButton = UIButton.alloc().initWithFrame({x:gap, y:gap, width:40, height:40});
            //authorButton.setBackgroundColor(UIColor.magentaColor());
            authorButton.addTarget_action_forControlEvents(self, 'authorButtonClicked', 1 <<  6);
            self.addSubview(authorButton);
            self.setAuthorButton(authorButton);
            
            var nameLabel = UILabel.alloc().initWithFrame({x: authorButton.maxX()+gap, y:gap, width:SCREEN_WIDTH-authorButton.maxX()-100-3*gap, height:20});
            //nameLabel.setBackgroundColor(UIColor.magentaColor());
            nameLabel.setFont(UIFont.systemFontOfSize(14));
            nameLabel.setTextColor(UIColor.colorWithWhite_alpha(.5, 1))
            self.addSubview(nameLabel);
            self.setNameLabel(nameLabel);
            
            var timeLabel = UILabel.alloc().initWithFrame({x: nameLabel.maxX()+gap, y:gap, width:100 , height:20});
            //timeLabel.setBackgroundColor(UIColor.magentaColor());
            timeLabel.setFont(UIFont.systemFontOfSize(12));
            timeLabel.setTextColor(UIColor.colorWithWhite_alpha(.7, 1));
            timeLabel.setTextAlignment(2);
            self.addSubview(timeLabel);
            self.setTimeLabel(timeLabel);
            
            var commentLabel = UILabel.alloc().initWithFrame({x:authorButton.maxX()+gap, y: 40, width:SCREEN_WIDTH-authorButton.maxX()-2*gap, height:20});
            //commentLabel.setBackgroundColor(UIColor.magentaColor());
            commentLabel.setFont(UIFont.systemFontOfSize(16));
            commentLabel.setNumberOfLines(0);
            self.addSubview(commentLabel);
            self.setCommentLabel(commentLabel);
        }
        return self;
    },

    authorButtonClicked: function() {
        var cb = self.tapCallBack();
        if (cb) {
            cb(self.model()['user']);
        }
    },
            
    setData: function(model) {
        self.setModel(model);
            
        self.authorButton().sd__setImageWithURL_forState(require('NSURL').URLWithString(model['user']['avatar_url']), 0);
        self.nameLabel().setText(model['user']['name'])
            
        var date = new Date(model['created_at']);
        var dateStr = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        self.timeLabel().setText(dateStr);
            
        if(model['body']) {
            var comment = model['body'].replace('\n', '').replace('</p>', '\n').replace(/<[^>]+>/g,"")
            self.commentLabel().setText(comment);
            var size = self.commentLabel().sizeThatFits({width:self.commentLabel().width(), height:1000});
            self.commentLabel().setHeight(size.height);
        }
            
        var cellHeight=self.commentLabel().maxY();
        self.setCellHeight(cellHeight);
    },
})


