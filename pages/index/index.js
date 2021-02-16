//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    today:{} 
  },

  getTodayString() {
    var weeks = ["日", "一", "二", "三", "四", "五", "六"];
    var today = new Date();
    return "今天是" + today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日 星期" + weeks[today.getDay()];
  },
  getTotalObject() {
    var activities = [{
      name: "洗澡",
      good: "你几天没洗澡了？",
      bad: "会把脑袋里的灵感给洗掉！",
      weekend: true
    }, {
      name: "锻炼一下身体",
      good: "只有的强健的右手，才能让你时速过万！",
      bad: "能量没消耗多少，吃得却更多",
      weekend: true
    }, {
      name: "抽烟",
      good: "抽烟有利于提神，增加思维敏捷",
      bad: "除非你活够了，死得早点没关系",
      weekend: true
    }, {
      name: "白天码字",
      good: "今天白天不会有人打扰你码字",
      bad: "可能会被父母催婚/催娃",
      weekend: true
    }, {
      name: "开新书",
      good: "一个绝对爆火的开篇已然在脑海中形成",
      bad: "新书必扑"
    }, {
      name: "切书",
      good: "毁灭吧，赶紧的！",
      bad: "可能会被读者寄刀片！"
    }, {
      name: "出门",
      good: "可能会收获一场美丽的邂逅",
      bad: "浪了一天，怕是没时间更新了吧"
    }, {
      name: "找编辑要推荐",
      good: "编辑直接给你安排一波大封推",
      bad: "编辑大概率不会回你"
    }, {
      name: "晚上加更",
      good: "加更收到读者打赏",
      bad: "读者跳订，追读雪崩"
    }, {
      name: "在妹子面前吹牛",
      good: "改善你矮穷挫的形象",
      bad: "被嘲笑猥琐宅男"
    }, {
      name: "找朋友喝酒",
      good: "休息一下，调整状态",
      bad: "烂醉如泥，忘记更新"
    }, {
      name: "改文",
      good: "优化前文情节，吸引新读者的几率大大增加",
      bad: "越改越差，白白浪费时间"
    }, {
      name: "打LOL",
      good: "你将有如神助",
      bad: "你会被虐的很惨",
      weekend: true
    }, {
      name: "回复读者评论",
      good: "和读者拉进关系，获得打赏",
      bad: "被读者一顿狂奔，收藏追订暴跌"
    }, {
      name: "存稿",
      good: "多多存稿，以备不时之需",
      bad: "存下的稿件可能会丢",
      weekend: true
    },{
      name: "刷微博",
      good: "今天发生的事不能错过",
      bad: "今天的微博充满负能量",
      weekend: true
    }, {
      name: "刷B站",
      good: "更多的灵感等着你！",
      bad: "太过入神，忘记了更新",
      weekend: true
    }];

    var directions = ["北方", "东北方", "东方", "东南方", "南方", "西南方", "西方", "西北方"];

    var drinks = ["水", "茶", "红茶", "绿茶", "咖啡", "奶茶", "可乐", "鲜奶", "豆奶", "果汁", "果味汽水", "苏打水", "运动饮料", "酸奶", "酒"];

    var _activities = this.filter(activities);
    var today = new Date();
    var iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    var numGood = this.random(iday, 98) % 3 + 2;
    var numBad = this.random(iday, 87) % 3 + 2;
    var eventArr = this.pickRandomActivity(_activities, numGood + numBad);

    var goodList = [];
    var badList = [];

    for (var i = 0; i < numGood; i++) {
      goodList.push(eventArr[i]);
    }

    for (var i = 0; i < numBad; i++) {
      badList.push(eventArr[numGood + i]);
    }
    var totalList = {
      "today": this.getTodayString(),
      "goodList": goodList,
      "badList": badList,
      "direction": directions[this.random(iday, 2) % directions.length],
      "drinks": this.pickRandom(drinks, 2),
      "stars": this.star(this.random(iday, 6) % 5 + 1)
    }
    return totalList;
  },

  star(num) {
    var result = "";
    var i = 0;
    while (i < num) {
      result += "★";
      i++;
    }
    while (i < 5) {
      result += "☆";
      i++;
    }
    return result;
  },

  // 去掉一些不合今日的事件
  filter(activities) {
    var result = [];
    // 周末的话，只留下 weekend = true 的事件
    if (this.isWeekend()) {
      for (var i = 0; i < activities.length; i++) {
        if (activities[i].weekend) {
          result.push(activities[i]);
        }
      }
      return result;
    }
    return activities;
  },

  isWeekend() {
    var today = new Date();
    return today.getDay() == 0 || today.getDay() == 6;
  },

  // 从 activities 中随机挑选 size 个
  pickRandomActivity(activities, size) {
    var picked_events = this.pickRandom(activities, size);

    for (var i = 0; i < picked_events.length; i++) {
      picked_events[i] = picked_events[i];
    }

    return picked_events;
  },

  // 从数组中随机挑选 size 个
  pickRandom(array, size) {
    var result = [];
    var today = new Date();
    var iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    for (var i = 0; i < array.length; i++) {
      result.push(array[i]);
    }
    for (var j = 0; j < array.length - size; j++) {
      var index = this.random(iday, j) % result.length;
      result.splice(index, 1);
    }

    return result;
  },

  random(dayseed, indexseed) {
    var n = dayseed % 11117;
    for (var i = 0; i < 100 + indexseed; i++) {
      n = n * n;
      n = n % 11117; // 11117 是个质数
    }
    return n;
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    this.setData({
      today: this.getTotalObject()
    })
  }
})
