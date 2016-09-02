/* 
  FFAuthorViewController.js
  FFDribbble

  Created by 张玲玉 on 16/9/1.
  Copyright © 2016年 bj.zly.com. All rights reserved.
*/

include('FFAuthorHeaderView.js')
include('FFAuthorCell.js')

require('FFNetwork,UIColor,UIActivityIndicatorView')

defineClass('FFAuthorViewController: UITableViewController', [
'model',
'loadingView',
'isLoading',
'page',
'modelArray',
                                                              
], {
            
    initWithModel: function(model) {
        self=self.super().init();
        if (self) {
            self.setModel(model);
            self.setTitle(model['name']);
            self.tableView().setSeparatorStyle(0);
            self.tableView().setBackgroundColor(UIColor.colorWithWhite_alpha(.9, 1));
            
            var headerView = FFAuthorHeaderView.alloc().initWithModel(model);
            self.tableView().setTableHeaderView(headerView);
            
            var Y=headerView.height()+(SCREEN_HEIGHT-headerView.height()-40)/2-20;
            var loadingView=UIActivityIndicatorView.alloc().initWithActivityIndicatorStyle(2);
            loadingView.setFrame({x: (SCREEN_WIDTH-40)/2, y: Y, width: 40, height: 40});
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
    var url=URL_Author+self.model()['id']+'/shots';
            
    FFNetwork.get_page_count_success_failure(url, self.page(), count, block('id', function(responseObject) {
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
        if (!model.user) {
            model.user = self.model();
        }
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
                cell = FFAuthorCell.alloc().initWithStyle_reuseIdentifier(0, "cell");
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
        return FFAuthorCell_Height;
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