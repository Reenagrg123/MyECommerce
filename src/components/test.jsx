import React, { Component } from 'react';
class Test extends React.Component {
    state={
        myimg:""
    }
//   imageUpload = e => {
//     const file = e.target.files[0];
//     getBase64(file).then(base64 => {
//       localStorage["fileBase64"] = base64;
//       console.debug("file stored", base64);
//     });
//   };
 fun=()=>{
    var myimg=localStorage.getItem("image");
    this.setState({myimg:myimg});

 }
 componentDidMount(){
    this.fun();
 }

  render() {
     
     if(this.state.myimg!=""){

     
    return (
            <img src={this.state.myimg}></img>
    //   <input
    //     type="file"
    //     id="imageFile"
    //     name="imageFile"
    //     onChange={this.imageUpload}
    //   />
    );
  }
  else{
      return(<h1>"No image"</h1>)
  }
}
}

// const getBase64 = file => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//     reader.readAsDataURL(file);
//   });
// };

export default Test;