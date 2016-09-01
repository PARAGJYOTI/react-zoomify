
// paragjyoti2012@gmail.com
// 2016

import React from 'react'
import Offset from 'document-offset'

export default class ImageZoom extends React.Component{
     constructor(){
         super()
         this.state={
             px:0,
             py:0,
             Ox:0,
             Oy:0,
             w:0,
             h:0,
             dx:0,
             dy:0,
             cEx:0,
             cEy:0,
             isVisible:false,
             isStatic:false,
             scroll:0
         }
     }
     
     
     
     componentDidMount(){
          let img=document.getElementById('img')      
          let clipper=document.getElementById('clipper')
          let  cEx= clipper.getBoundingClientRect().left+(this.props.s/2),    //these are clipper position erors tht are eliminated
               cEy=clipper.getBoundingClientRect().top+(this.props.s/2)
          
           let  w=this.props.width;

             let that=this
       img.addEventListener('load',function(){
          
           var h=img.clientHeight,
            Oy=img.getBoundingClientRect().top,
            Ox=img.getBoundingClientRect().left
   
           that.setState({h:h,Ox,Oy})
           
       })
          
          
          
    //     modal.addEventListener('scroll',function(){
          
    //    })
     let modal=  document.getElementsByClassName('in modal')
         Array.from(modal).forEach(function(element) {
      element.addEventListener('scroll', function() {
          
          let  Oy=img.getBoundingClientRect().top
          let   Ox=img.getBoundingClientRect().left
           that.setState({scroll:element.scrollTop,Oy})
        
          
      });
    });
      
        window.addEventListener('mousemove',this.handleMouseMove.bind(this))  
         this.setState({w,cEx,cEy:cEy})
        
     }
        
     componentWillUnmount(){
         
         window.removeEventListener('mousemove',this.handleMouseMove.bind(this))
         
         
         let img=this.refs.img.removeEventListener('load',function(){
          
           var h=img.clientHeight
           that.setState({h:h})
           
       })
        
       let modal=  document.getElementsByClassName('in modal')
         Array.from(modal).forEach(function(element) {
           element.removeEventListener('scroll', function() {
          
          let  Oy=img.getBoundingClientRect().top
          let   Ox=img.getBoundingClientRect().left
           that.setState({scroll:element.scrollTop,Oy})
        
          
      });
    });

     }
     
     handleMouseMove({pageX,pageY}){
          let dx=this.d(pageX,this.state.Ox,this.props.s),
              dy=this.d(pageY,this.state.Oy,this.props.s);
              
         let {px,py,Ox,Oy}=this.state     
              
         let w=this.props.width,
              h=this.state.h,
              
              
              isVisible=false,
              isStatic=false
              
              
          if(dx < 0 || dy < 0 || dx > w-this.props.s || dy > h-this.props.s){
              isStatic=true
          }    
          if(px > Ox && py > Oy && px < w+Ox && py< h+Oy ){
              isVisible=true
          }    
          let clipper=document.getElementById('clipper')
          
        //   console.log(clipper.getBoundingClientRect().top,'cll',py)
          
          this.setState({px:pageX,py:pageY,dx:dx,dy:dy,isVisible:isVisible,isStatic:isStatic})
     }
     
     d(p,O,s){
         
         return p-(O+(s/2))
         
     }
     
     D(d,m){
         return m*d
     }
     
     render(){
         
         let m=this.props.magnification?this.props.magnification:5;
         let W=this.D(this.props.width,m),
             H=this.D(this.state.h,m),
             S=this.D(this.props.s,m),
             Dx=this.D(this.state.dx,m),
             Dy=this.D(this.state.dy,m)
         let posX= -Dx,
             posY = -Dy;
          
          if(Dx<0){
              posX=0
          }
          if(Dy<0){
              posY=0
          }
          if(Dy>H-S){
              posY=S-H
          }
          if(Dx>W-S){
              posX=S-W
          }
       
          let w=this.props.width,
              h=this.state.h,    
              s=this.props.s,
              src=this.props.src,
              zoomedImgTop=this.props.zoomedImgTop,
              zoomedImgLeft=this.props.zoomedImgLeft
         let {dx,dy,Ox,Oy,py,px,cEx,cEy,scroll}=this.state  
         
            
         let sPos=  getSposition(dx,dy,w,h,s,Ox,Oy,px,py,cEx,cEy,scroll)     
         
         let sLeft=sPos.sLeft
         let sTop=sPos.sTop
            
         
         
       return  <div>
         <div>
           <img id='img'
             ref='img'
             src={src}
             width={w+'px'}
             height='auto'
             
             style={{margin:'60px',position:'relative'}}
           ></img>
        
         </div>
           <div id='clipper'
            style={{
                position:'absolute',
                width:`${s}px`,
                height:`${s}px`,
                top:`${!this.state.isStatic?py-this.state.cEy+this.state.scroll:sTop}`,
                left:`${!this.state.isStatic?px-this.state.cEx:sLeft}`,
                // top:`${py-this.state.cEy}`,
                // left:`${px-this.state.cEx}`,
                visibility:`${this.state.isVisible?'visible':'hidden'}`,
                background:'transparent',
                boxShadow:'0px 1px 16px 0px rgba(0,0,0,0.5)'
                
            }}
           
           ></div>
       
           <div
            style={{
                width:`${S}px`,
                height:`${S}px`,
                background:'#ccc',
                backgroundImage:`url(${src})`,
                backgroundPosition: `${posX}px ${posY}px`,
                backgroundSize:`${W}px ${H}px`,
                backgroundRepeat:'no-repeat',
                
                 backgroundAttachment:'scroll',
                transition:'opacity .3s ease-out,visibility .3s ease-out',
                position:'absolute',
                top:`${zoomedImgTop+'px'}`,
                left:`${zoomedImgLeft+'px'}`,
                zIndex:'9999',
                boxShadow:'0px 4px 4px rgba(0,0,0,.4)',
                visibility:`${this.state.isVisible?'visible':'hidden'}`,
                opacity:`${this.state.isVisible?'1':'0'}`
                 
            }}
           >
      
   
           </div>
           
           {console.log('scroll:',this.state.scroll ,'cEy :', cEy, 'Oy :',Oy)}
           
         </div>
         
     }
     
     
};



function getSposition(dx,dy,w,h,s,Ox,Oy,px,py,cEx,cEy,scroll){
  let sLeft=Ox,
      sTop=Oy
    if(dx<0){
        
        sLeft=Ox
        if(dy<0){
            sTop=Oy
        }
        if(dy>0){
            sTop=py-(s/2)
        }
        if(dy>h-s){
            sTop=Oy+h-s
        }
}
  if(dx>0){
      sLeft=px-(s/2)
        if(dy<0){
            sTop=Oy
        }
        if(dy>0){
            sTop=py-(s/2)
        }
        if(dy>h-s){
            sTop=Oy+h-s
        }
  }
  if(dx>w-s){
      sLeft=Ox+w-s

        if(dy<0){
            sTop=Oy
        }
        if(dy>0){
            sTop=py-(s/2)
        }
        if(dy>h-s){
            sTop=Oy+h-s
        }
  }
       
  return {sLeft:sLeft-(cEx-(s/2)),sTop:sTop-(cEy-(s/2))+scroll}  
    
}

          
