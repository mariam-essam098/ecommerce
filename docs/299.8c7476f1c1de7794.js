"use strict";(self.webpackChunkFreshCartEcommerce=self.webpackChunkFreshCartEcommerce||[]).push([[299],{5299:(P,g,r)=>{r.r(g),r.d(g,{BrandsComponent:()=>C});var o=r(6814),c=r(6472),p=r(1120),t=r(4769),_=r(5614);const u=function(n){return["/brandsDetails",n]};function l(n,i){if(1&n&&(t.TgZ(0,"div",8)(1,"div",9),t._UZ(2,"img",10)(3,"hr"),t.TgZ(4,"h3",11),t._uU(5),t.qZA()()()),2&n){const e=i.$implicit;t.xp6(1),t.Q6J("routerLink",t.VKq(4,u,e._id)),t.xp6(1),t.Q6J("src",e.image,t.LSH)("alt",e.name),t.xp6(3),t.Oqu(e.name)}}const m=function(n,i,e){return{id:"productPaginate",itemsPerPage:n,currentPage:i,totalItems:e}};function h(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"section",1)(1,"div",2)(2,"h2",3),t._uU(3,"Shop Brands"),t.qZA(),t.TgZ(4,"div",4),t.YNc(5,l,6,6,"div",5),t.ALo(6,"paginate"),t.qZA()(),t.TgZ(7,"div",6)(8,"pagination-controls",7),t.NdJ("pageChange",function(s){t.CHM(e);const d=t.oxw();return t.KtG(d.pageChanged(s))})("pageBoundsCorrection",function(s){t.CHM(e);const d=t.oxw();return t.KtG(d.pageChanged(s))}),t.qZA()()()}if(2&n){const e=t.oxw();t.xp6(5),t.Q6J("ngForOf",t.xi3(6,5,e.brandsData,t.kEZ(8,m,e.pageSize,e.curentPage,e.total))),t.xp6(3),t.Q6J("maxSize",9)("directionLinks",!0)("autoHide",!0)("responsive",!0)}}let C=(()=>{class n{constructor(e){this._BrandsService=e,this.brandsData=[],this.pageSize=0,this.curentPage=1,this.total=0}ngOnInit(){this._BrandsService.getBrands().subscribe({next:e=>{this.brandsData=e.data,this.pageSize=e.metadata.limit,this.curentPage=e.metadata.currentPage,this.total=e.results}})}pageChanged(e){this._BrandsService.getBrands(e).subscribe({next:a=>{this.brandsData=a.data,this.pageSize=a.metadata.limit,this.curentPage=a.metadata.currentPage,this.total=a.results}})}static#t=this.\u0275fac=function(a){return new(a||n)(t.Y36(_.G))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-brands"]],standalone:!0,features:[t.jDz],decls:1,vars:1,consts:[["class","py-5 my-4",4,"ngIf"],[1,"py-5","my-4"],[1,"container"],[1,"text-center","py-3","text-main","fw-bold"],[1,"row","g-3"],["class","col-sm-12 col-md-3",4,"ngFor","ngForOf"],[1,"d-flex","justify-content-center","mt-5"],["id","productPaginate","previousLabel","Previous","nextLabel","Next","screenReaderPaginationLabel","Pagination","screenReaderPageLabel","page","screenReaderCurrentLabel","You're on page",3,"maxSize","directionLinks","autoHide","responsive","pageChange","pageBoundsCorrection"],[1,"col-sm-12","col-md-3"],[1,"p-2","cursor-pointer","product",3,"routerLink"],[1,"w-100",3,"src","alt"],[1,"pt-2","text-center","small","fw-bold","text-main"]],template:function(a,s){1&a&&t.YNc(0,h,9,12,"section",0),2&a&&t.Q6J("ngIf",s.brandsData.length>0)},dependencies:[o.ez,o.sg,o.O5,c.JX,c._s,c.LS,p.rH]})}return n})()}}]);