// component/CateNav/CateNav.js
Component({
  // 组件的属性列表
  properties: {
      wf:{
          type:Array
      },
      wc:{
          type:Number
      },
      tag:{
          type:String
      }
  },
  // 组件的方法列表
  methods: {
      toggle(event){
          let index=event.currentTarget.dataset.index
          let tag=this.properties.tag
          console.log("切换",index,tag);
          // 自定义事件
          this.triggerEvent("Click",{index,tag})
      }
  }
})