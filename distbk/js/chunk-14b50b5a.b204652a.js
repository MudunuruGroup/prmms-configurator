(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-14b50b5a"],{"08cf":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-list-item-subtitle",{staticClass:"text-wrap"},[e._v(" Use "),a("code",[e._v("dark")]),e._v(" prop to switch table to the dark theme. ")]),a("div",{staticClass:"mt-4"},[a("v-simple-table",{attrs:{dark:""},scopedSlots:e._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[e._v("Name")]),a("th",{staticClass:"text-left"},[e._v("Calories")])])]),a("tbody",e._l(e.desserts,(function(t){return a("tr",{key:t.name},[a("td",[e._v(e._s(t.name))]),a("td",[e._v(e._s(t.calories))])])})),0)]},proxy:!0}])})],1)],1)},i=[],r={name:"TableSimpleDarktheme",data:function(){return{desserts:[{name:"Frozen Yogurt",calories:159},{name:"Ice cream sandwich",calories:237},{name:"Eclair",calories:262},{name:"Cupcake",calories:305},{name:"Gingerbread",calories:356},{name:"Jelly bean",calories:375},{name:"Lollipop",calories:392},{name:"Honeycomb",calories:408},{name:"Donut",calories:452},{name:"KitKat",calories:518}]}}},n=r,l=a("2877"),o=a("6544"),c=a.n(o),d=a("5d23"),h=a("1f4f"),u=Object(l["a"])(n,s,i,!1,null,null,null);t["default"]=u.exports;c()(u,{VListItemSubtitle:d["b"],VSimpleTable:h["a"]})},"1f4f":function(e,t,a){"use strict";a("a9e3");var s=a("5530"),i=(a("8b37"),a("80d2")),r=a("7560"),n=a("58df");t["a"]=Object(n["a"])(r["a"]).extend({name:"v-simple-table",props:{dense:Boolean,fixedHeader:Boolean,height:[Number,String]},computed:{classes:function(){return Object(s["a"])({"v-data-table--dense":this.dense,"v-data-table--fixed-height":!!this.height&&!this.fixedHeader,"v-data-table--fixed-header":this.fixedHeader},this.themeClasses)}},methods:{genWrapper:function(){return this.$slots.wrapper||this.$createElement("div",{staticClass:"v-data-table__wrapper",style:{height:Object(i["f"])(this.height)}},[this.$createElement("table",this.$slots.default)])}},render:function(e){return e("div",{staticClass:"v-data-table",class:this.classes},[this.$slots.top,this.genWrapper(),this.$slots.bottom])}})},"8b37":function(e,t,a){}}]);
//# sourceMappingURL=chunk-14b50b5a.b204652a.js.map