# react-zoom
Image Zooming library for react
# Publify.js
Action based PubSub Library on top of Socket.io 
####Making real-time event based code much simpler and maintainable


#Installation
```npm
 npm install --save react-zoom
 ```

### Use Cases 
   mainly for e-commerce image zooming purpose

### Pros :
     Bug free
     simple to use 
     cool-animation
     multiple zooming 
     fast (because it's react!)
     see the code and customize if you need.
     

#### For es6
 ```
 import ReactZoom from 'react-zoom'
```

#### For es5
 ```
var ReactZoom =require('react-zoom')
```
## API documentation
   
   
   ###  Props :
      
      width : number | width of the image  , (height is  not needed :-))
      
      magnification: number | magnification needed for the image 
      s  : number | dimension of the square-sized clipper
      zoomedImgLeft : number | the zoomed img position from left (absolute position)
      zoomedImgTop : number | zoomed img position from top (absolute position)
      
      and of-course 
      
      src : string | the sourcepath for the image
      

## Example
  
  ``` 
   render(){
   
    return   <ReactZoom 
                 width={300} 
                 src='../path/image.jpg'
                 s={150} 
                 magnification={4}
                 zoomedImgLeft={500}
                 zoomedImgTop={100}
                 />
```

  
  
 
 
 

