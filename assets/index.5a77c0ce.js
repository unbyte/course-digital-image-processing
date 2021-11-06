var t=Object.defineProperty,e=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,o=(e,a,l)=>a in e?t(e,a,{enumerable:!0,configurable:!0,writable:!0,value:l}):e[a]=l,n=(t,n)=>{for(var r in n||(n={}))a.call(n,r)&&o(t,r,n[r]);if(e)for(var r of e(n))l.call(n,r)&&o(t,r,n[r]);return t};"undefined"!=typeof require&&require;import{s as r,d as i,r as s,w as c,c as u,a as d,b as f,F as h,e as m,f as p,g as b,h as v,i as g,P as y,T as w}from"./vendor.8efa5101.js";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const a of t)if("childList"===a.type)for(const t of a.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),"use-credentials"===t.crossorigin?e.credentials="include":"anonymous"===t.crossorigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();const A=r(),M=r(),N=i((()=>{const t=s();return c(M,(()=>{var e;t.value&&(M.value?(t.value.width=M.value.width,t.value.height=M.value.height,null==(e=t.value.getContext("2d"))||e.putImageData(M.value,0,0)):(t.value.width=0,t.value.height=0))}),{immediate:!1}),()=>u(d,{style:"width: 100%; height: calc(100vh - 40px);"},{default:()=>[u("canvas",{ref:t},null)]})}));var E="_filter-panel_1vxbl_1",_="_actions_1vxbl_8",x="_filter-list_1vxbl_17",C="_filter_1vxbl_1",S="_psnr_1vxbl_23";function I(t,e){return e.reduce(((t,e)=>e(t)),t)}function P(t,e){return e.displayName=t,e}function L(t,e){return document.createElement("canvas").getContext("2d").createImageData(t,e)}function R(t,e){const a=e.length,l=Math.floor(a/2),{data:o,height:n,width:r}=t;return k(t,((t,i)=>{let s=0,c=0,u=0;for(let d=0;d<a;d++)for(let f=0;f<a;f++){const a=i+d-l,h=t+f-l;if(a>=0&&a<n&&h>=0&&h<r){const t=e[d][f],l=4*(a*r+h);s+=o[l]*t,c+=o[l+1]*t,u+=o[l+2]*t}}return[s,c,u]}))}function k({width:t,height:e},a){const l=L(t,e);for(let o=0;o<e;o++)for(let e=0;e<t;e++){const[n,r,i]=a(e,o),s=4*(o*t+e);l.data[s]=n,l.data[s+1]=r,l.data[s+2]=i,l.data[s+3]=255}return l}function O(t,e=3){return Array.from({length:e}).map((()=>Array(e).fill(t)))}function F(t){let e=0;return t.forEach((t=>t.forEach((t=>e+=t)))),function(t,e){return t.map((t=>t.map((t=>t*e))))}(t,1/e)}function G(t){const e=t.length;return t.sort(),e%2==0?(t[e/2-1]+t[e/2])/2:t[Math.floor(e/2)]}const T=F(O(1)),X=P("Mean",(t=>R(t,T))),j=F([[1,2,1],[2,4,2],[1,2,1]]),q=P("Gaussian",(t=>R(t,j))),z=P("Median",(t=>{const{data:e,height:a,width:l}=t;return k(t,((t,o)=>{const n=[],r=[],i=[];for(let s=0;s<3;s++)for(let c=0;c<3;c++){const u=o+s-1,d=t+c-1;if(u>=0&&u<a&&d>=0&&d<l){const t=4*(u*l+d);n.push(e[t]),r.push(e[t+1]),i.push(e[t+2])}}return[G(n),G(r),G(i)]}))})),U=[[0,-1,0],[-1,4,-1],[0,-1,0]],D=P("Laplacian",(t=>R(t,U))),V=[[0,-.2,0],[-.2,1.8,-.2],[0,-.2,0]],B=P("Sharpen",(t=>R(t,V))),$=F(O(1/9)),H=P("Low Pass",(t=>R(t,$))),K=[[-1,-1,-1],[-1,8,-1],[-1,-1,-1]],J=P("High Pass",(t=>R(t,K))),Q=[[1/4,0,-1/4],[.5,0,-.5],[1/4,0,-1/4]],W=[[1/4,.5,1/4],[0,0,0],[-1/4,-.5,-1/4]],Y=P("Sobel",(t=>function(t,e){const a=t.data,l=e.data,o=a.length,n=L(t.width,t.height);for(let r=0;r<o;r++){const t=a[r]+l[r];n.data[r]=t>255?255:t}return n}(R(t,Q),R(t,W)))),Z=[[0,0,0],[1,-1,0],[0,0,0]],tt=P("Roberts",(t=>R(t,Z))),et=[[0,0,1,0,0],[0,1,2,1,0],[1,2,-16,2,1],[0,1,2,1,0],[0,0,1,0,0]],at=P("LoG",(t=>R(t,et))),lt=F([[1,4,7,4,1],[4,16,26,16,4],[7,26,41,26,7],[4,16,26,16,4],[1,4,7,4,1]]),ot=P("Gaussian Blur",(t=>R(t,lt))),nt=F([[1,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0],[0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,1]]),rt=P("Motion Blur",(t=>R(t,nt))),it=[[-1,-1,0],[-1,0,1],[0,1,1]],st=P("Embossing",(t=>{const e=R(t,it),a=e.data.length;for(let l=0;l<a;l++)e.data[l]+=128;return e}));function ct(){const t=(e="image/*",()=>new Promise((t=>{const a=document.createElement("input");a.type="file",e&&(a.accept=e),a.onchange=()=>{if(!a.files)return;const e=Array.from(a.files);t(e[0])},a.click()})));var e;return()=>new Promise((e=>{t().then((t=>{const a=new Image;a.onload=()=>{const t=document.createElement("canvas");t.width=a.width,t.height=a.height;const l=t.getContext("2d");l.drawImage(a,0,0),e(l.getImageData(0,0,a.width,a.height))},a.src=URL.createObjectURL(t)}))}))}function ut(t,e){const{width:a,height:l,data:o}=t,{data:n}=e,r=t.data.length;let i=0;for(let c=0;c<r;c++)i+=Math.pow(o[c]-n[c],2);const s=i/(a*l)/3;return 10*Math.log10(65025/s)}const dt=t=>(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4),ft=t=>t>.008856?Math.pow(t,1/3):(903.3*t+16)/116;function ht(t,e,a){const l=dt(t),o=dt(e),n=dt(a),r=.2126729*l+.7151522*o+.072175*n,i=.0193339*l+.119192*o+.9503041*n,s=ft((.4124564*l+.3575761*o+.1804375*n)/.950456),c=ft(r);return[116*c-16,500*(s-c),200*(c-ft(i/1.088754))]}function mt(t,{blockSize:e,weight:a,iteration:l}){const{width:o,height:r}=t,i=function({width:t,height:e,data:a}){const l=new Array(t*e);for(let o=0;o<t;o++)for(let n=0;n<e;n++){const e=4*(n*t+o),[r,i,s]=ht(a[e],a[e+1],a[e+2]);l[e]=r,l[e+1]=i,l[e+2]=s,l[e+3]=a[e+3]}return l}(t),s=Array.from({length:r*o}).fill(-1),c=[];for(let n=Math.floor(e/2);n<o;n+=e)for(let t=Math.floor(e/2);t<r;t+=e)c.push(d(n,t));for(let n=0;n<l;n++)u();return{pixelate:function(t,e,a=!1){const{width:l,height:o,data:n}=t,r=Math.ceil(o/e),i=Math.ceil(l/e),u=L(l,o);for(let d=0;d<i;d++)for(let t=0;t<r;t++){const a=d*e,r=a+e,i=t*e,f=i+e,h=Object.create(null);for(let t=a;t<r&&t<l;t++)for(let e=i;e<f&&e<o;e++){const a=s[e*l+t];-1!==a&&(h[a]?h[a]++:h[a]=1)}let m=c[-1],p=Number.MIN_VALUE;for(const t in h)h[t]>p&&(p=h[t],m=c[t]);const b=4*(m.y*l+m.x);for(let t=a;t<r&&t<l;t++)for(let e=i;e<f&&e<o;e++){const a=4*(e*l+t);u.data[a]=n[b],u.data[a+1]=n[b+1],u.data[a+2]=n[b+2],u.data[a+3]=n[b+3]}}if(a){for(let t=e;t<l;t+=e)for(let e=0;e<o;e++){const a=4*(e*l+t);u.data[a]=255,u.data[a+1]=255,u.data[a+2]=255,u.data[a+3]=255}for(let t=e;t<o;t+=e)for(let e=0;e<l;e++){const a=4*(t*l+e);u.data[a]=255,u.data[a+1]=255,u.data[a+2]=255,u.data[a+3]=255}}return u},showContours:function(t){const{width:e,height:a,data:l}=t,o=L(e,a),n=[-1,0,1,-1,1,-1,0,1],r=[-1,-1,-1,0,0,1,1,1],i=Array.from({length:e}).map((()=>Array.from({length:a}).fill(!1)));for(let c=0;c<e;c++)for(let t=0;t<a;t++){let u=0;const d=s[t*e+c];for(let l=0;l<8;l++){const o=c+n[l],f=t+r[l];o>=0&&o<e&&f>=0&&f<a&&!1===i[o][f]&&d!==s[f*e+o]&&(u+=1)}const f=4*(t*e+c);u>=2?(o.data[f]=255,o.data[f+1]=255,o.data[f+2]=255,o.data[f+3]=255):(o.data[f]=l[f],o.data[f+1]=l[f+1],o.data[f+2]=l[f+2],o.data[f+3]=l[f+3])}return o},showContoursAfterAP:function(t){const{width:e,height:a,data:l}=t,o=L(e,a),n=m(h(10,5,5),.5,1e4),r=[-1,0,1,-1,1,-1,0,1],i=[-1,-1,-1,0,0,1,1,1],c=Array.from({length:e}).map((()=>Array.from({length:a}).fill(!1)));for(let u=0;u<e;u++)for(let t=0;t<a;t++){let d=0;const f=n[s[t*e+u]];for(let l=0;l<8;l++){const o=u+r[l],h=t+i[l];o>=0&&o<e&&h>=0&&h<a&&!1===c[o][h]&&f!==n[s[h*e+o]]&&(d+=1)}const h=4*(t*e+u);d>=2?(o.data[h]=255,o.data[h+1]=255,o.data[h+2]=255,o.data[h+3]=255):(o.data[h]=l[h],o.data[h+1]=l[h+1],o.data[h+2]=l[h+2],o.data[h+3]=l[h+3])}return o},showAP:function(t){const{width:e,height:a,data:l}=t,o=L(e,a),n=m(h(10,5,5),.5,2e3);for(let r=0;r<e;r++)for(let t=0;t<a;t++){const a=4*(t*e+r),i=c[n[s[t*e+r]]],u=4*(Math.floor(i.y)*e+Math.floor(i.x));o.data[a]=l[u],o.data[a+1]=l[u+1],o.data[a+2]=l[u+2],o.data[a+3]=l[u+3]}return o}};function u(){const t=Array.from({length:o*r}).fill(Number.MAX_VALUE);for(let l=0;l<c.length;l++){const a=c[l];for(let n=a.x-e;n<a.x+e;n++)for(let i=a.y-e;i<a.y+e;i++)if(n>=0&&n<o&&i>=0&&i<r){const e=f(a,n,i),r=i*o+n;e<t[r]&&(t[r]=e,s[r]=l)}}const a=function(t){const e=[];for(let a=0;a<t.length;a++)e.push(n({},t[a]));return e}(c);for(let e=0;e<c.length;e++){const t=c[e];t.l=t.a=t.b=t.x=t.y=t.count=0}for(let e=0;e<o;e++)for(let t=0;t<r;t++){const a=t*o+e,l=s[a];if(-1!==l){const o=c[l];o.l+=i[4*a],o.a+=i[4*a+1],o.b+=i[4*a+2],o.x+=e,o.y+=t,o.count+=1}}for(let e=0;e<c.length;e++){const t=c[e];0===t.count||void 0===t.x||void 0===t.y?c[e]=n({},a[e]):(t.l/=t.count,t.a/=t.count,t.b/=t.count,t.x=Math.floor(t.x/t.count),t.y=Math.floor(t.y/t.count))}}function d(t,e){let a,l=Number.MAX_VALUE;for(let n=t-1;n<=t+1&&n>=0&&n<o-1;n++)for(let t=e-1;t<=e+1&&t>=0&&t<r-1;t++){const e=i[4*(t*o+n+1)],r=i[4*((t+1)*o+n+1)],s=i[4*(t*o+n)],c=Math.abs(e-s)+Math.abs(r-s);c<l&&(l=c,a={x:n,y:t,l:s,a:i[4*(t*o+n)+1],b:i[4*(t*o+n)+2],count:0})}return a}function f(t,l,n){const r=4*(n*o+l),s=Math.sqrt(Math.pow(t.l-i[r],2)+Math.pow(t.a-i[r+1],2)+Math.pow(t.b-i[r+2],2)),c=Math.sqrt(Math.pow(t.x-l,2)+Math.pow(t.y-n,2));return Math.pow(s/a,2)+Math.pow(c/e,2)}function h(t=3,e=10,a=10){const l=c.length,o=new Array(l*l);let n=0;for(let i=0;i<l;i++)for(let r=0;r<l;r++){const s=i*l+r,u=c[i],d=c[r];o[s]=-(t*Math.pow(u.l-d.l,2)+e*Math.pow(u.a-d.a,2)+a*Math.pow(u.b-d.b,2)),n+=o[s]}const r=n/(l*l-l);for(let i=0;i<l;i++)o[i*l+i]=r;return o}function m(t,e=.5,a=200){const l=c.length,o=new Array(l*l).fill(0),n=new Array(l*l).fill(0),r=new Array(l).fill(-Number.MAX_SAFE_INTEGER),i=new Array(l).fill(-Number.MAX_SAFE_INTEGER),s=new Array(l).fill(-1);for(let c=0;c<l;c++)for(let e=0;e<l;e++){const a=c*l+e;t[a]>r[c]?(i[c]=r[c],r[c]=t[a]):t[a]>i[c]&&(i[c]=t[a])}let u=0,d=0,f=0,h=1;const m=a/10;for(;u<m&&d<a;){const a=new Array(l).fill(0);for(let e=0;e<l;e++)for(let s=0;s<l;s++){const c=e*l+s,u=r[e]===n[c]+t[c]?i[e]:r[e],d=t[c]-u;o[c]=f*o[c]+h*d,e!==s&&(a[s]+=Math.max(0,o[c]))}r.fill(-Number.MAX_SAFE_INTEGER),i.fill(-Number.MAX_SAFE_INTEGER);for(let e=0;e<l;e++){let c=-Number.MAX_SAFE_INTEGER,u=-1;for(let s=0;s<l;s++){const d=e*l+s,m=o[s*l+s],p=e===s?a[s]:Math.min(0,m+a[s]-Math.max(0,o[d]));n[d]=f*n[d]+h*p;const b=n[d]+t[d];b>r[e]?(i[e]=r[e],r[e]=b):b>i[e]&&(i[e]=b);const v=n[d]+o[d];(c===-Number.MAX_SAFE_INTEGER||c<v)&&(u=s,c=v)}u!==s[e]&&(s[e]=u)}d++,u++,f=e,h=1-e}return console.log(d,s.includes(-1)),s}}const pt=i((()=>{const t=s(),e=e=>{var a;return null==(a=t.value)?void 0:a.toggle(e)},{psnr:a,busy:l,filters:o,handlePush:n,handleRemove:r,handleClear:i}=function(){const t=[],e=s(0),a=s(!1),l=l=>{t.push(l),M.value&&(a.value=!0,setTimeout((()=>{M.value=I(M.value,[l]),e.value=ut(A.value,M.value),a.value=!1}),600))},o=l=>{t.splice(l,1),0===t.length?n():M.value&&A.value&&(a.value=!0,setTimeout((()=>{M.value=I(A.value,t),e.value=ut(A.value,M.value),a.value=!1}),600))},n=()=>{t.length=0,M.value&&A.value&&(M.value=A.value),e.value=0};return{filters:t,handlePush:l,handleRemove:o,handleClear:n,busy:a,psnr:e}}(),c=[{label:"Smoothing",items:[{label:X.displayName,command:()=>n(X)},{label:q.displayName,command:()=>n(q)},{label:z.displayName,command:()=>n(z)}]},{label:"Edge/Line",items:[{label:tt.displayName,command:()=>n(tt)},{label:at.displayName,command:()=>n(at)},{label:Y.displayName,command:()=>n(Y)},{label:J.displayName,command:()=>n(J)},{label:D.displayName,command:()=>n(D)}]},{label:"Enhancement",items:[{label:B.displayName,command:()=>n(B)},{label:H.displayName,command:()=>n(H)},{label:ot.displayName,command:()=>n(ot)},{label:rt.displayName,command:()=>n(rt)},{label:st.displayName,command:()=>n(st)}]},{label:"Segmentation",items:[{label:"SLIC Contours",command:()=>{const t=t=>mt(t,{blockSize:40,iteration:20,weight:10}).showContours(t);t.displayName="SLIC Contours",n(t)}},{label:"SLIC AP Contours",command:()=>{const t=t=>mt(t,{blockSize:40,iteration:20,weight:10}).showContoursAfterAP(t);t.displayName="SLIC AP Contours",n(t)}},{label:"SLIC AP",command:()=>{const t=t=>mt(t,{blockSize:40,iteration:20,weight:10}).showAP(t);t.displayName="SLIC AP",n(t)}},{label:"SLIC Pixelation",command:()=>{const t=t=>mt(t,{blockSize:15,iteration:10,weight:10}).pixelate(t,15,!0);t.displayName="SLIC Pixelation",n(t)}}]}],d=ct(),g=async()=>{M.value=A.value=await d()};return()=>u("div",{class:E},[u("div",null,[u("div",{class:`p-buttonset ${_}`},[u(f,{label:"Clear",class:"p-button-secondary p-button-outlined",icon:"pi pi-trash",onClick:i,disabled:!M.value||l.value},null),u(h,null,[u(f,{label:"Filters",icon:"pi pi-plus",class:"p-button-secondary","aria-haspopup":"true",onClick:e,disabled:!M.value||l.value},null),u(m,{ref:t,model:c,popup:!0},null)])]),u("div",{class:x},[o.map(((t,e)=>u("p",{class:C},[p(u(f,{label:t.displayName,class:"p-button-text p-button-plain",onClick:()=>r(e),disabled:l.value},null),[[b("tooltip"),`Remove ${t.displayName} Filter`]])]))).reverse()])]),u("div",null,[u("div",{class:S},[v("PSNR: "),a.value]),u("p",null,[u(f,{label:"Open Image",style:"width: 100%",icon:"pi pi-folder-open",class:"p-button",onClick:g,disabled:l.value},null)])])])}));g(i((()=>()=>u(h,null,[u("div",{class:"filter-panel"},[u(pt,null,null)]),u("div",{class:"image-container"},[u(N,null,null)])])))).use(y).directive("tooltip",w).mount("#app");
