import React from 'react'


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
             isVisible:false,
             isStatic:false
         }
     }
     
     
     
     componentDidMount(){
         let img=this.refs.img,
             Ox=img.offsetLeft,
             Oy=img.offsetTop,
             w=this.props.width;
             let that=this
       // As Image height is not provided as prop , height is calculated after image is loaded.        
             
       img.addEventListener('load',function(){
          
           var h=img.clientHeight
           that.setState({h:h})
           
       })
                      
             
        window.addEventListener('mousemove',this.handleMouseMove.bind(this))  
         this.setState({Ox,Oy,w})
        
     }
     componentWillUnmount(){
         window.removeEventListener('mousemove',this.handleMouseMove.bind(this))
         let img=this.refs.img.removeEventListener('load',function(){
          
           var h=img.clientHeight
           that.setState({h:h})
           
       })
            
     }
     
     handleMouseMove({pageX,pageY}){
      // pageX and pageY are the cursor position during mousemove 
         
          let dx=this.d(pageX,this.state.Ox,this.props.s),
              dy=this.d(pageY,this.state.Oy,this.props.s);
              
         let {px,py,Ox,Oy}=this.state     
              
         let w=this.props.width,
              h=this.state.h,
              
         // isVisible is for checking the cursor is within the image or not. 
           // if mouse is outside the img element , isvisible is false and vise versa      
              isVisible=true,
          
         // isStatic is used for the square sized clipper on the image is touching the boundrary of the parent image or not.
              
              isStatic=false
              
              
          if(dx < 0 || dy < 0 || dx > w-this.props.s || dy > h-this.props.s){
              isStatic=true
          }    
          if(px < Ox || py < Oy || px > w+Ox || py> h+Oy ){
              isVisible=false
          }    
          
          
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
         let {dx,dy,Ox,Oy,py,px}=this.state  
         
            
         let sPos=  getSposition(dx,dy,w,h,s,Ox,Oy,px,py)     
         
         let sLeft=sPos.sLeft
         let sTop=sPos.sTop
            
         
         
       return  <div>
         <div>
           <img id='img'
             ref='img'
             src={src}
             width={w+'px'}
             height='auto'
             style={{margin:'50px'}}
           ></img>
        
         </div>
           <div
            style={{
                position:'absolute',
                width:`${s}px`,
                height:`${s}px`,
                top:`${!this.state.isStatic?py-(s/2):sTop}px`,
                left:`${!this.state.isStatic?px-(s/2):sLeft}px`,
                visibility:`${this.state.isVisible?'visible':'hidden'}`,
                background:'rgba(0,0,0,.3)',
                
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
           
           
           
         </div>
         
     }
     
     
};

//getSposition returns calculated position of Square-clipper 
//if dx,dy<0 or dx<w-s , dy<h-s , the clipper is going outside the boundrary which is prevented via setting isStatic to true 

function getSposition(dx,dy,w,h,s,Ox,Oy,px,py){
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
       
  return {sLeft:sLeft,sTop:sTop}  
    
}
