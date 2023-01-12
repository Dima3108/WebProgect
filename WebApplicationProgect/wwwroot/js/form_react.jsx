
class MyLableName extends React.Component {
    render() {
        return <label>Ваше имя:</label>
    }
}
class MyInputName extends React.Component {
    render() {
        return <input type="text" name="your_name" />
    }
}
class MyDIVName extends React.Component {
    render() {
        return <div>
            <MyLableName />
            <MyInputName/>
            </div>
    }
}
class MyLableMail extends React.Component {
    render() {
        return <label>Ваш email:</label>
    }
}
class MyInputMail extends React.Component {
    render() {
        return <input type="email" name="your_email" />
    }
}
class MyDIVMail extends React.Component {
    render() {
        return <div>
            <MyLableMail />
            <MyInputMail/>
            </div>
    }
}
class MyForm extends React.Component {
    render() {
        return <form >
            <div className="form-group">
            <MyDIVName />
                <MyDIVMail />
                </div>
            </form>
    }
}
ReactDOM.render(<MyForm/>, document.getElementById('react_content'));