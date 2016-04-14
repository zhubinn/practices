/**
 * Created by yangtm
 */
const fillItemsList = function(cacheCurrent, cacheCount) {
  let current = cacheCurrent || 1;
  let pageCount = cacheCount || 20;
  let items = [];
  let obj = {};
  //列表页码
  if (current != 1 && current >= 4 && pageCount != 4) {
    obj.text = 1;
    items.push(obj);
    obj = {};
  };
  if (current - 2 > 2 && current <= pageCount && pageCount > 5) {
    obj.text = "...";
    obj.className = "ellipsis";
    items.push(obj);
    obj = {};
  };
  let start = current - 2,
    end = current + 2;
  if ((start > 1 && current < 4) || current == 1) {
    end++;
  };
  if (current > pageCount - 4 && current >= pageCount) {
    start--;
  };
  for (; start <= end; start++) {
    if (start <= pageCount && start >= 1) {
      if (start != current) {
        obj.text = start;
        items.push(obj);
        obj = {};
      } else {
        obj.text = start;
        obj.className = "current";
        items.push(obj);
        obj = {};
      }
    }
  };
  if (current + 2 < pageCount - 1 && current >= 1 && pageCount > 5) {
    obj.text = "...";
    obj.className = "ellipsis";
    items.push(obj);
    obj = {};
  };
  if (current != pageCount && current < pageCount - 2 && pageCount != 4) {
    obj.text = pageCount;
    items.push(obj);
    obj = {};
  };
  return items;
}

export default fillItemsList