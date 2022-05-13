import{S as D,a as q,P as K,W as Y,b as J,O as Q,A as T,c as O,d as W,M as _,e as y,f as F,B as X,g as Z,V as j,h as $,D as A,i as ee,C as te,j as ie}from"./vendor.60ce5e9f.js";const ne=function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))z(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const S of a.addedNodes)S.tagName==="LINK"&&S.rel==="modulepreload"&&z(S)}).observe(document,{childList:!0,subtree:!0});function P(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerpolicy&&(a.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?a.credentials="include":t.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function z(t){if(t.ep)return;t.ep=!0;const a=P(t);fetch(t.href,a)}};ne();var oe=`precision mediump float;

uniform float u_time;

varying vec2 UV;

void main(){
	UV = uv;
	vec4 mvPosition = modelViewMatrix*vec4(position,1.);
	mvPosition.y += sin(u_time / 2. + uv.x) * 2.0;
	mvPosition.x += cos(u_time / 1.3 + uv.y) * 2.0;
	gl_Position = projectionMatrix*mvPosition;
}`,se=`precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 UV;

void main(void){
	vec2 position = UV * 2. - 1.;
	
	float red = abs( 
		sin(position.x * position.y + u_time / 5.)
	);
	float green = abs( 
		sin(position.x * position.y + u_time / 4.) 
	);
	float blue = abs( 
		sin(position.x * position.y + u_time / 3.) 
	);

	gl_FragColor=vec4(red, green, blue, 1.0);
}`;let f,V,k,g=.01,e=.1,i=.1,n=.1,c=.15,l=.11,p=.15,m,d,v,re=new te,B,s,E,r,w,o,M,x,b;function ae(){ce(),de(),le()}function de(){E=new D,document.body.appendChild(E.dom)}function ce(){d=new q,v=new K(75,window.innerWidth/window.innerHeight,.1,1e3),v.position.z=7,m=new Y,m.shadowMap.enabled=!0,m.shadowMap.type=J,m.setPixelRatio(window.devicePixelRatio),m.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(m.domElement),new Q(v,m.domElement),B=new T(3355443),d.add(B);const h=.25;s=new O(16777215),s.position.set(-.5,.5,4),s.castShadow=!0,s.intensity=h,d.add(s),s=new O(16777215),s.position.set(-.5,.5,4),s.castShadow=!0,s.intensity=h,d.add(s);const u=s.clone();u.intensity=1-h,u.castShadow=!1,d.add(u);const P=1024,z=.5,t=500;s.shadow.mapSize.width=P,s.shadow.mapSize.height=P,s.shadow.camera.near=z,s.shadow.camera.far=t;const a=new W(1),S=new _({color:1118481});r=new y(a,S),r.castShadow=!0,r.position.set(-2,-.35,2),r.scale.set(.2,.2,.2),d.add(r),V=new F(r.position,.2);const H=new W(1),I=new _({color:7408395});w=new y(H,I),w.castShadow=!0,w.position.set(0,0,-2),d.add(w),k=new F(w.position,1);const N=new X,R=new _({color:4548489});o=new y(N,R),o.castShadow=!0,o.position.set(-2,-2,-2),o.scale.set(.5,.5,.5),o.rotateY(200),d.add(o),f=new Z(new j,new j),f.setFromObject(o);const L=new $(30,30,30,30),C=new _({color:1114129,side:A,flatShading:!0}),U={u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new ie(800,800)}};new ee({uniforms:U,vertexShader:oe,fragmentShader:se,side:A}),M=new y(L,C),M.position.z=-4,M.receiveShadow=!0,x=new y(L,C),x.position.x=5,x.rotation.y=Math.PI/2,x.receiveShadow=!0,b=new y(L,C),b.position.x=-5,b.rotation.y=Math.PI/2,b.receiveShadow=!0,d.add(M),d.add(x),d.add(b),G()}function le(){window.addEventListener("resize",pe,!1),window.addEventListener("keyup",h=>{const{key:u}=h;switch(u){case"-":e>0&&(e-=.1),e<0&&(e+=.1),i>0&&(i-=.1),i<0&&(i+=.1),n>0&&(n-=.1),n<0&&(n+=.1),console.log(e);break;case"=":e<0&&(e-=.1),e>0&&(e+=.1),i<0&&(i-=.1),i>0&&(i+=.1),n<0&&(n-=.1),n>0&&(n+=.1);break}})}function pe(){v.aspect=window.innerWidth/window.innerHeight,v.updateProjectionMatrix(),m.setSize(window.innerWidth,window.innerHeight)}function G(){requestAnimationFrame(()=>{G()}),o.position.x-=c,f.max.x-=c,f.min.x-=c,o.position.y-=l,f.max.y-=l,f.min.y-=l,o.position.z-=p,f.max.z-=p,f.min.z-=p,r.position.x+=e,r.position.y+=i,r.position.z+=n,w.position.x+=g,fe(),re.getDelta(),m.render(d,v)}function fe(){f.intersectsSphere(V)&&(e=-e,i=-i,n=-n,c=-c,l=-l,p=-p),f.intersectsSphere(k)&&(c=-c,l=-l,p=-p),V.intersectsSphere(k)&&(e=-e,i=-i,n=-n),o.position.x>2&&(c=-c),o.position.x<-2&&(c=-c),o.position.y>2&&(l=-l),o.position.y<-2&&(l=-l),o.position.z>2&&(p=-p),o.position.z<-2&&(p=-p),r.position.x>2&&(e=-e),r.position.x<-2&&(e=-e),r.position.y>2&&(i=-i),r.position.y<-2&&(i=-i),r.position.z>2&&(n=-n),r.position.z<-2&&(n=-n),w.position.x>2&&(g=-g),w.position.x<-2&&(g=-g)}ae();
