import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('react_content'));

/*class MyForm extends React.Component{
  render(){
    return <h3>Hellow render!</h3>
  }
}
root.render(
  <React.StrictMode>
    <App />
    <MyForm/>
  </React.StrictMode>
);*/
class MyForm extends React.Component {
  render() {
    return <form >

      {this.props.children}
    </form>
  }
}
class MyDIV extends React.Component {
  render() {
    return <div>
      {this.props.children}
    </div>
  }
}
class MyLabel extends React.Component {
  constructor(props) {
   super(props);
  this.props=props;
  }
  render() {
    return <label>
      {this.props.value}
    </label>
  }
}
class MyInputText extends React.Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    return <input type="text" id={this.props.id} className="form-group" />
  }
}
class MyTextarea extends React.Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    return <textarea id={this.props.id} className="form-group"></textarea>
  }
}
class MyButton extends React.Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    if (this.props.id === "res_b") {
      return <button type="button" id={this.props.id} className="btn btn-primary"
      >
        {this.props.value}
      </button>
    }
    else if (this.props.id === "add_f_but") {
      return <button type="button" id={this.props.id} className="btn btn-primary"
      >
        {this.props.value}
      </button>
    }
    else {
      return <button type="button" id={this.props.id}
      >
        {this.props.value}
      </button>
    }
  }
}
class MySpan extends React.Component {
  constructor(props) {
    super(props);
    this.props=props;
  }
  render() {
    return <span id={this.props.id}></span>
  }
}
class MyFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Files: [], tFile: null };
    // this.DeleteFile = this.DeleteFile.bind(this);
    this.interval = setInterval(() => this.Update(), 1000);
  }
  GenerateID(i) {
    return "id" + String(i);
  }
  GetKStart() {
    return "{";
  }
  GetKStop() {
    return "}";
  }
  DeleteFile = (a, file) => {

    sessionStorage.removeItem(file);
    var v = sessionStorage.getItem('files_inf');


    sessionStorage.setItem('files_inf', v.replace(file, ''));
    
    this.Update();

  }
  GetNames() {
    if (sessionStorage.getItem('files_inf') != null && sessionStorage.getItem('files_inf') !== "") {
      var str = sessionStorage.getItem('files_inf');
      var strin_ = str.replace(" ", "").split("\n");
      const m = [];
      for (var i = 0; i < strin_.length; i++) {
        if (strin_[i] != null && strin_[i] !== "") {
          m.push(String(strin_[i]));
        }
      }
      return m;
    }
    else {
      const v = [];
      return v;
    }
  }
  Update() {
    var n = this.GetNames();

    this.setState(
      state => ({
        Files: n
      })
    );

  }
  render() {
    return <div className="storageCont">
      {
        this.state.Files.map(
          f => (
            <div>

              <button type="button" id={this.GenerateID(f)} onClick={
                (event) => this.DeleteFile(event, f)
              }
                className="btn btn-danger"
              >
                ??????????????</button>
              <label >???????? {f}</label>
              {

                //this.DeleteFile(f)
              }

            </div>
          )
        )
      }
    </div>
  }
}
root.render(React.createElement(MyForm, {},
  React.createElement(MyDIV, {},
    React.createElement(MyLabel, { value: "???????? ??????(???? 35 c??????????????):" }),
    React.createElement(MyInputText, { id: "us_n" })
  ),
  React.createElement(MyDIV, {},
    React.createElement(MyLabel, { value: "?????? ??????????????????????(???? 4096 ????????????????)" }),
    React.createElement(MyTextarea, { id: "us_c" })
  ),
  React.createElement(MyDIV, {},
    React.createElement(MyDIV, {},
      React.createElement(MyButton, { id: "add_f_but", value: "???????????????? ????????" })
    ),
    React.createElement(MyDIV, {},
      React.createElement(MySpan, { id: "file_load_log" })
    ),
    React.createElement(MyDIV, {},
      React.createElement(MySpan, { id: "file_error_log" })
    ),
    React.createElement(MyFiles, {}),
    React.createElement(MyDIV, {},
      React.createElement(MyButton, { id: "res_b", value: "??????????????????" })
    )

  )
)
  );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
