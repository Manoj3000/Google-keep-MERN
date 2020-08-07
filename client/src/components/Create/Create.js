import React, { Component } from 'react'
import './Create.css'
import Axios from 'axios'
import swal from 'sweetalert'

class Create extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isShow: false,
            id: '',
            title: '',
            task: ''
        }
    }

    inputHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = e => {
        e.preventDefault()
        if (this.state.title !== '' && this.state !== '') {

            const data = {
                id: Date.now(),
                title: this.state.title,
                task: this.state.task
            }

            Axios.post('http://localhost:4000/' , data)
            .then(()=>{
                this.setState({
                    id: '',
                    title: '',
                    task: ''
                })
                // swal("Task added!", "", "success");
            })
            .catch(err =>{
                console.log('Error while Creating data from Create Component.');
            })

        }
    }
    
    cancelHandler = e => {
        this.setState({
          title: '',
          task: ''
        })
      }
    
    showForm = () => {
        this.setState({
            isShow: true
        })
    }

    hideForm = () => {
        this.setState({
            isShow: false
        })
    }

    render() {
        const { title, task, } = this.state
        return (
            <div className='create-area'>
                <form className='create-box' onSubmit={this.submitHandler} autoComplete='off'>
                    {this.state.isShow ?
                        <input 
                            className='title'
                            name='title'
                            onChange={this.inputHandler}
                            value={title}
                            type='text'
                            placeholder='Title'
                            required />
                        : null}

                        <input 
                            className='note' 
                            name='task' 
                            onClick={this.showForm} 
                            onChange={this.inputHandler} 
                            value={task} 
                            type='text' 
                            placeholder='Take a note...' 
                            required />

                    {this.state.isShow ?
                        <div className='form-btns'>
                            <button className='btn-submit' type='submit'>Add</button>
                            <button onClick={this.cancelHandler} className='btn-cancel' type='button'>Cancel</button>
                            <button onClick={this.hideForm} className='btn-close' type='button'>Close</button>
                        </div>

                        : null}

                </form>
            </div>
        )
    }
}

export default Create
