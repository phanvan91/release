"use strict";(self.webpackChunkreact_app=self.webpackChunkreact_app||[]).push([[995],{5822:function(e,r,n){n.d(r,{Z:function(){return s}});var t=n(2791),a=n(3504),i=n(184),c=function(e){var r=e.breadcrumb,n=e.title,c=e.showButton,s=e.buttonAction,l=e.buttonText;return(0,i.jsx)("div",{className:"page-breadcrumb",children:(0,i.jsxs)("div",{className:"row align-items-center",children:[(0,i.jsxs)("div",{className:"col-6",children:[(0,i.jsx)("nav",{"aria-label":"breadcrumb",children:(0,i.jsx)("ol",{className:"breadcrumb mb-0 d-flex align-items-center",children:r.map((function(e,r){return(0,i.jsxs)(t.Fragment,{children:[e.url&&(0,i.jsx)("li",{className:"breadcrumb-item",children:(0,i.jsxs)(a.rU,{to:e.url,className:"link",children:[e.icon&&(0,i.jsx)("i",{className:e.icon}),e.icon&&" ",e.name]})}),!e.url&&(0,i.jsx)("li",{className:"breadcrumb-item active",children:e.name})]},r)}))})}),n?(0,i.jsx)("h1",{className:"mb-0 fw-bold",children:n}):null]}),(0,i.jsx)("div",{className:"col-6",children:c?(0,i.jsx)("div",{className:"text-end upgrade-btn",children:(0,i.jsx)(a.rU,{to:s,className:"btn btn-primary text-white",children:l})}):null})]})})},s=c;c.defaultProps={breadcrumb:[],title:"",showButton:!1}},966:function(e,r,n){var t=n(184);r.Z=function(e){var r=e.error;return r&&(0,t.jsx)("p",{className:"text-danger mb-1",children:r.message})}},9815:function(e,r,n){var t=n(2791),a=n(2007),i=n.n(a),c=n(966),s=n(184),l=(0,t.forwardRef)((function(e,r){var n=e.type,t=void 0===n?"text":n,a=e.onChange,i=e.placeholder,l=e.name,o=e.errors,d=e.disabled,u=void 0!==d&&d;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("input",{ref:r,id:l,name:l,onChange:a,type:t,className:o[l]?"form-control border border-danger":"form-control",placeholder:i,disabled:u}),(0,s.jsx)(c.Z,{error:o[l]})]})}));l.defaultProps={},l.propTypes={type:i().string,onChange:i().func,placeholder:i().string,name:i().string,errors:i().object,disabled:i().bool},l.displayName="Input",r.Z=l},3015:function(e,r,n){var t=n(184),a=function(e){var r=e.label,n=e.loading,a=e.className,i=void 0===a?"":a;return(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)("button",{type:"submit",className:"submit-btn".concat(i?" "+i:""),disabled:n,children:[r,n?(0,t.jsx)("span",{className:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"}):""]})})};r.Z=a,a.defaultProps={}},9822:function(e,r,n){n.d(r,{Qs:function(){return T},L8:function(){return I},Xn:function(){return _},Y$:function(){return Y},Z0:function(){return P},ao:function(){return E},l:function(){return q},$0:function(){return k},dY:function(){return U}});var t=n(885),a=n(2791),i=n(3270),c=n(9434),s=n(6871),l=n(7166),o=function(e){return{type:l.Qb,payload:e}},d=function(e){return{type:l.zi,payload:e}},u=function(){return{type:l.Nq}},m=function(e){return{type:l.E3,payload:e}},p=function(e){return{type:l.OV,payload:e}},f=function(e){return{type:l.TA,payload:e}},j=(n(6451),function(e){return function(r){return r.project[e]}}),h=j("isLoading"),x=j("list"),v=j("listParams"),b=j("getListFailed"),g=j("item"),N=j("getItemFailed"),Z=j("createSuccess"),y=j("createFailed"),w=j("updateSuccess"),S=j("updateFailed"),F=j("deleteSuccess"),C=j("deleteFailed"),E=function(){var e=(0,i.Kx)(),r=e.get("page")||1,n=e.get("per_page")||10;return(0,a.useMemo)((function(){return{page:r,per_page:n,order_by_created_at:"desc"}}),[r,n])},P=function(e){return(0,i.Zp)({action:o,loadingSelector:h,dataSelector:x,failedSelector:b,param:e})},q=function(){return(0,c.v9)(v)},_=function(e){return(0,a.useMemo)((function(){return{id:(null===e||void 0===e?void 0:e.id)||null,name:(null===e||void 0===e?void 0:e.name)||"",giturl:(null===e||void 0===e?void 0:e.giturl)||"",description:(null===e||void 0===e?void 0:e.description)||""}}),[e])},T=function(){var e=(0,s.s0)(),r=(0,i.qd)({loadingSelector:h,action:d}),n=(0,t.Z)(r,2),a=n[0],c=n[1];return(0,i.E2)(Z,"Create project success",(function(){return e("/project")})),(0,i.dH)(y,"Create project Failed"),[a,c]},U=function(){var e=(0,s.s0)(),r=(0,i.qd)({loadingSelector:h,action:p}),n=(0,t.Z)(r,2),a=n[0],c=n[1];return(0,i.E2)(w,"Update project success",(function(){return e("/project")})),(0,i.dH)(S,"Update project Failed"),[a,c]},k=function(){(0,i.Yw)(u)},Y=function(e){return(0,i.Zp)({action:m,loadingSelector:h,dataSelector:g,failedSelector:N,param:e})},I=function(e){var r=(0,c.I0)(),n=(0,i.qd)({loadingSelector:h,action:f}),a=(0,t.Z)(n,2),s=a[0],l=a[1];return(0,i.E2)(F,"Delete project success",(function(){r(o(e))})),(0,i.dH)(C,"Delete project Failed"),[s,l]}},3179:function(e,r,n){n.r(r),n.d(r,{default:function(){return N}});var t=n(885),a=n(2791),i=n(6871),c=n(9822),s=n(1413),l=n(4259),o=n(4695),d=n(9815),u=n(3015),m=n(7942),p=m.Ry().shape({name:m.Z_().required("The project name field is required").max(255,"The project name may not be greater than 255 characters."),giturl:m.Z_().required("The git url field is required").max(255,"The git url may not be greater than 255 characters."),description:m.Z_().required("The description field is required")}),f=n(184);function j(e){var r=e.project,n=(0,c.Xn)(r);(0,c.$0)();var i=(0,l.cI)({defaultValues:n,resolver:(0,o.X)(p)}),m=i.register,j=i.handleSubmit,h=i.setError,x=i.formState.errors,v=i.reset;(0,a.useEffect)((function(){r&&v(n)}),[r]);var b=(0,c.Qs)({setError:h}),g=(0,t.Z)(b,2),N=g[0],Z=g[1],y=(0,c.dY)({setError:h}),w=(0,t.Z)(y,2),S=w[0],F=w[1];return(0,f.jsxs)("form",{onSubmit:j(r?F:Z),children:[(0,f.jsxs)("div",{className:"row mb-3",children:[(0,f.jsxs)("div",{className:"col-sm-4",children:["Project name ",(0,f.jsx)("span",{className:"text-danger",children:"*"})]}),(0,f.jsx)("div",{className:"col-sm-8",children:(0,f.jsx)(d.Z,(0,s.Z)((0,s.Z)({},m("name")),{},{placeholder:"Name",errors:x}))})]}),(0,f.jsxs)("div",{className:"row mb-3",children:[(0,f.jsxs)("div",{className:"col-sm-4",children:["Git url ",(0,f.jsx)("span",{className:"text-danger",children:"*"})]}),(0,f.jsx)("div",{className:"col-sm-8",children:(0,f.jsx)(d.Z,(0,s.Z)((0,s.Z)({},m("giturl")),{},{placeholder:"Git url",errors:x}))})]}),(0,f.jsxs)("div",{className:"row mb-3",children:[(0,f.jsx)("div",{className:"col-sm-4",children:"Description"}),(0,f.jsx)("div",{className:"col-sm-8",children:(0,f.jsx)("textarea",(0,s.Z)({rows:"5",className:"form-control"},m("description")))})]}),(0,f.jsx)("hr",{}),(0,f.jsx)("div",{className:"row",children:(0,f.jsx)("div",{className:"col text-end",children:(0,f.jsx)(u.Z,{loading:r?S:N,className:"btn btn-primary text-white",label:r?"Update":"Create"})})})]})}var h=j;j.defaultProps={};var x=n(5822),v=n(547),b=[{name:"",url:"/",icon:"mdi mdi-home-outline fs-4"},{name:"Project",url:"/project",icon:null},{name:"Create",url:null,icon:null}],g=[{name:"",url:"/",icon:"mdi mdi-home-outline fs-4"},{name:"Project",url:"/project",icon:null},{name:"Edit",url:null,icon:null}];var N=function(){var e=(0,i.UO)(),r=(0,c.Y$)(e.id?e:null),n=(0,t.Z)(r,2),s=n[0];return n[1]?(0,f.jsx)(v.Z,{}):(0,f.jsxs)(a.Fragment,{children:[(0,f.jsx)(x.Z,{breadcrumb:e.id?g:b,title:e.id?"Project Edit":"Project Create"}),(0,f.jsx)("div",{className:"container-fluid",children:(0,f.jsx)("div",{className:"row",children:(0,f.jsx)("div",{className:"col-12",children:(0,f.jsx)("div",{className:"card",children:(0,f.jsxs)("div",{className:"card-body",children:[(0,f.jsx)("h4",{className:"card-title",children:e.id?"Project Edit":"Create new project"}),(0,f.jsx)("hr",{}),(0,f.jsx)(h,{project:s})]})})})})})]})}}}]);
//# sourceMappingURL=995.4e65b7b9.chunk.js.map