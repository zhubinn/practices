# questions
> 开发高级搜索嵌套表格所遇到的问题


+ 公用方法的提取

+ set数据类型在immutable中的使用问题,reducer不改变?  
    - 原因:没有正确使用, 解决方案:
    
        ```js
        // eg: separatedIndexes
        
        // 定义
        state = Immutable.fromJS({
            rows: [],
            separatedIndexes: Immutable.OrderedSet()
        })
        // 更新
        state.updateIn(['separatedIndexes'], function (separatedIndexes) {
                        if (separatedIndexes.has(i)) {
                            return separatedIndexes.delete(i)
                        }
                        return separatedIndexes.add(i)
                    })
        ```
+ sub-table行数据的存取问题
    - 暂时不考虑,一行一行的动态取