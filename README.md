# react-zoomify
An Image Zooming library for react 
  (best for e-commerce) 


##Installation
```npm
 npm install --save react-zoomify
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
 import ReactZoomify from 'react-zoomify'
```

#### For es5
 ```
var ReactZoomify =require('react-zoomify')
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
   
    return   <ReactZoomify
                 width={300} 
                 src='../path/image.jpg'
                 s={150} 
                 magnification={4}
                 zoomedImgLeft={500}
                 zoomedImgTop={100}
                 />
```

  
  
 
 
 

