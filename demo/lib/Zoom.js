import React from 'react'

import ImageZoom from './ImageZoom'

export default class Zoom extends React.Component{
    constructor(){
        super()
            this.state={m:4,image:0}
        
    }
    
    
    render(){
        
      
        return <div>
          <div style={{
              position:'absolute',
              top:'0px',
              right:'20px',
              color:'#ccc'
          }}><h6>
           React Zoomify Demo <br/>
           #paragjyoti  | paragjyoti2012@gmail.com <br/>
          <a href='https://github.com/PARAGJYOTI/react-zoomify'>   return to github page </a>
          </h6>
          </div>
         <div style={{color:'#0bbea1'}}> 
          <button className='button-transparent button-toolbar left' onClick={()=>this.setState({m:3})} >
          <span>3</span></button>
          <button className='button-transparent  button-toolbar middle' onClick={()=>this.setState({m:4})} >
          <span >4</span></button>
          <button className='button-transparent  button-toolbar right' onClick={()=>this.setState({m:4.6})} >
          <span >5</span></button>
          </div>
          <div style={{color:'#0bbea1',
                position:'absolute',
                top:'300px',
                left:'700px'    
    }}>
         <h3>Zoomed image will appear here</h3>
          
          </div>
        <ImageZoom width={300}  src={this.state.image+'.jpg'} magnification={this.state.m} s={200} zoomedImgLeft={400} zoomedImgTop={50}/>
          <div style={{
              marginLeft:'50px',
              border:'1px solid #eee',
              width:'300px',
              marginTop:'-40px'
        
          }}> <img className='image' src='0.jpg' width='auto' height='80px' onClick={()=>this.setState({image:0})}></img>
              <img className='image' src='1.jpg' width='auto' height='80px' onClick={()=>this.setState({image:1})}></img>
              <img className='image' src='2.jpg' width='auto' height='80px' onClick={()=>this.setState({image:2})}></img>
              <img className='image' src='3.jpg' width='95px' height='80px' onClick={()=>this.setState({image:3})}></img>
              
          </div>
        
        </div>
        
    }
    
}