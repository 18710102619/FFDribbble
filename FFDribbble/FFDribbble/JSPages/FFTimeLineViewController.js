/* 
  FFTimeLineViewController.js
  FFDribbble

  Created by 张玲玉 on 16/8/29.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

include('FFLoadMoreView.js')

require('UIColor,UITableViewCell,UIActivityIndicatorView')

defineClass('FFTimeLineViewController: UITableViewController', [
    'loadingView',
    'isLoading',
    'shots',
    'currPage'
], {
    
    init: function() {
        self=self.super().init();
        self.setTitle('首页');
            
        // 设置背景颜色
        var color = UIColor.colorWithHex(0xFC7274);
        self.view().setBackgroundColor(color);
        
        // 初始化变量
        self.setShots([]);
        self.setCurrPage(1);
        
        // 设置tableView
        self.tableView().setBackgroundColor(UIColor.colorWithWhite_alpha(.9, 1));
        self.tableView().setSeparatorStyle(0);
            
        // 设置旋转进度轮
        var W=40;
        var loadingView=UIActivityIndicatorView.alloc().initWithActivityIndicatorStyle(2);
        loadingView.setBackgroundColor(UIColor.magentaColor());
        loadingView.setFrame({x: (SCREEN_WIDTH-W)/2, y: (SCREEN_HEIGHT-64-W)/2, width: W, height: W});
        loadingView.startAnimating();
        self.view().addSubview(loadingView);
        self.setLoadingView(loadingView);
        
        // 加载数据
        self._loadShots();
            
        return self;
    },

    // 加载数据
    _loadShots: function() {
        self.setIsLoading(1)
        var perPage = 20;
        var slf = self;
        FFDataSource.shareInstance().loadPublicShots(self.currPage(), perPage, function(shots) {
                slf.loadingView().removeFromSuperview();
                slf.setShots(slf.shots().concat(shots));
                slf.setCurrPage(slf.currPage() + 1);
                slf.setIsLoading(0);
                if (shots.length >= perPage) {
                    slf.tableView().setTableFooterView(FFLoadMoreView.alloc().init());
                } else {
                    slf.tableView().setTableFooterView(null);
                }
                slf.tableView().reloadData();
            },
            function(){
            }
        );
    },
            
    // UITableViewDataSource
    tableView_numberOfRowsInSection: function(tableView, section) {
        return 10;
    },
    tableView_cellForRowAtIndexPath: function(tableView, indexPath) {
        var cell = tableView.dequeueReusableCellWithIdentifier("cell")
        if (!cell) {
            cell = UITableViewCell.alloc().initWithStyle_reuseIdentifier(0, "cell")
        }
        cell.textLabel().setText("cell ")
        return cell
    },
            
    // UITableViewDelegate
    tableView_heightForRowAtIndexPath: function(tableView, indexPath) {
        return 70;
    },

})