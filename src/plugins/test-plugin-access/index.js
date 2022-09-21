/* eslint-disable no-unused-vars */
export default {
  install: (app, option) => {
    app.prototype.$app = { name: "app" };
    app.directive("color", {
      bind: (el, binding, vnode, oldVnode) => {
        // console.log(el, "el");
        // console.log(binding, "binding");
        // console.log(vnode, "vnode");
        // console.log(oldVnode, "oldVnode");
        el.style.color = binding.value;
      },
    });
    app.prototype.$commonMethods = { clone };

    function clone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    // 全局可访问的mixin;
    app.mixin({
      data() {
        return {
          pageInfo: {
            total: 0,
            pageNo: 1,
            pageSize: 10,
            pageSizes: [10, 20, 30, 40, 50, 100],
            layout: "total, ->, prev, pager, next, sizes, jumper",
          },
        };
      },
      created() {},
      methods: {
        setPageInfo(pageInfo = {}) {
          Object.entries(pageInfo).forEach(
            ([key, value]) => (this.pageInfo[key] = value)
          );
        },
        resetPageInfo() {
          this.pageInfo.pageSize = 10;
          this.pageInfo.pageNo = 1;
        },
        handleSizeChange(val, callback) {
          this.pageInfo.pageSize = val;
          this.pageInfo.pageNo = 1;
          if (callback) callback();
        },
        handleCurrentChange(val, callback) {
          this.pageInfo.pageNo = val;
          if (callback) callback();
        },
      },
    });
  },
};
