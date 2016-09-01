/* 
  FFListViewController.js
  FFDribbble

  Created by 张玲玉 on 16/8/29.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

include('FFListCell.js')
include('FFDetailViewController.js')

require('FFNetwork,UIColor,UIActivityIndicatorView')

defineClass('FFListViewController: UITableViewController', [
'loadingView',
'isLoading',
'page',
'modelArray',
                                                            
], {
    
    init: function() {
        self=self.super().init();
        if (self) {
            self.setTitle('首页');
            
            self.tableView().setSeparatorStyle(0);
            self.tableView().setBackgroundColor(UIColor.colorWithWhite_alpha(.9, 1));

            var loadingView=UIActivityIndicatorView.alloc().initWithActivityIndicatorStyle(2);
            loadingView.setFrame({x: (SCREEN_WIDTH-40)/2, y: (SCREEN_HEIGHT-64-40)/2, width: 40, height: 40});
            loadingView.startAnimating();
            self.view().addSubview(loadingView);
            self.setLoadingView(loadingView);
            
            self.setModelArray([]);
            self.setPage(1);
            self.loadModelArray();
        }
        return self;
    },

    // 加载数据
    loadModelArray: function() {
        self.setIsLoading(1)
        var count = 20;
        var slf = self;
            FFNetwork.get_page_count_success_failure(URL_List, self.page(), count, block('id', function(responseObject) {
                slf.loadingView().removeFromSuperview();
                slf.setModelArray(slf.modelArray().concat(responseObject));
                slf.setPage(slf.page() + 1);
                slf.setIsLoading(0);
                if (responseObject.length >= count) {
                    slf.tableView().setTableFooterView(FFLoadMoreView.alloc().init());
                } else {
                    slf.tableView().setTableFooterView(FFLoadFinishView.alloc().init());
                }
                slf.tableView().reloadData();
            }), block('id', function(error) {
                                                      
            }));
    },
         
    // 跳转至详情页
    jumpDetailVC: function(model) {
        var vc = FFDetailViewController.alloc().initWithModel(model);
        self.navigationController().pushViewController_animated(vc, YES);
    },
       
    // UITableViewDataSource
    tableView_numberOfRowsInSection: function(tableView, section) {
        return self.modelArray().length / 2;
    },
    tableView_cellForRowAtIndexPath: function(tableView, indexPath) {
        var cell = tableView.dequeueReusableCellWithIdentifier("cell")
        if (!cell) {
            cell = FFListCell.alloc().initWithStyle_reuseIdentifier(0, "cell")
            var slf=self;
            cell.setTapCallBack(function(model) {
                slf.jumpDetailVC(model);
            });
        }
        cell.setModels(self.modelArray()[indexPath.row()*2], self.modelArray()[indexPath.row()*2 + 1])
        return cell
    },
            
    // UITableViewDelegate
    tableView_heightForRowAtIndexPath: function(tableView, indexPath) {
        return FFListView_Height+FFListView_Gap;
    },

    // UIScrollViewDelegate
    scrollViewDidScroll: function(scrollView) {
        var contentOffset = scrollView.contentOffset();
        var contentSize = scrollView.contentSize();
        var offset=contentSize.height-contentOffset.y;
        
        if (!self.isLoading() && offset < SCREEN_HEIGHT-20) {
            self.loadModelArray();
        }
    },
            
})

