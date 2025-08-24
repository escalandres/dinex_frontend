import { Component } from 'react';
import './404.css';
export default class P404 extends Component{
  componentDidMount() {
    document.title = "404 error - Page not found";
  }
  render(){
      return(
        <div className="wrapper m-0">
          <div className="error">
            <div className="number">4</div>
            <div className="illustration">
              <div className="circle"></div>
              <div className= "clip">
                <div className="paper">
                  <div className="face">
                    <div className="eyes">
                      <div className= "eye eye__left"></div>
                      <div className="eye eye__right"></div>
                    </div>
                    <div className="cheeks cheeks__left"></div>
                    <div className="cheeks cheeks__right"></div>
                    <div className="mouth"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="number">4</div>
          </div>
          <div className= "text">Oops. The page you're looking
          for doesn't exist. </div>
          <a className="button rounded-lg hover:text-white" href="/">Back Home </a>
      </div>
    
    )
  }
}





