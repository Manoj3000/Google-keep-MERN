import React, { Component } from 'react'
import './Show.css'
import Item from '../Item/Item'
import axios from 'axios'
import swal from 'sweetalert'


const Keep = 'http://localhost:4000/'
const KeepArchive = 'http://localhost:4000/archive/'
const keepBin = 'http://localhost:4000/bin/'

class Show extends Component {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            task: '',
            show: true,
            todos: [],
            archive:[],
            bin:[],
            isEdit:false
        }
    }

    componentDidMount() {

        axios.get(Keep)
            .then(result => {
                this.setState({
                    todos: result.data
                })
            })
            .catch(err => {
                console.log('Error while showing data from Show Component.' + err);
            })
    }

    componentDidUpdate(prevProps, prevState){
        
        if(prevState.todos !== this.state.todos){
            axios.get(Keep)
            .then(result => {
                this.setState({
                    todos: result.data
                })
            })
            .catch(err => {
                console.log('Error while showing data from Show Component.' + err);
            })
        }
    }

    editNote = (id) => {

        axios.get(Keep + id)
            .then(result => {
                this.setState({
                    title: result.data[0].title,
                    task: result.data[0].task,
                    isEdit: true
                })
            })
            .catch(err => {
                console.log('Error while editing note.');
            })
    }

    inputHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    submitHandler = (id) => {
        const updateddata = {
            title: this.state.title,
            task: this.state.task
        }

        axios.put(Keep + id, updateddata)
            .then(() => {
                console.log('Data updated successfully! from EditItem Component');
                this.setState({
                    isEdit: false
                })
            })
            .catch(err => {
                console.log('Error while updating data from EditItem Component.');
            })
    }

    archiveHandler = id => {

        axios.get(Keep + id)
            .then(result => {

                this.setState({
                    archive: result.data[0]
                })

                const data = this.state.archive

                axios.post(KeepArchive, data)
                    .then(() => {
                        this.setState({
                            archive: []
                        })
                        // swal("Task Archived!", "", "success");
                        axios.delete(Keep + id)
                            .then(() => {
                                console.log('Data archived');
                            })
                            .catch(err => {
                                console.log('Error while archive file deleteing from keep.' + err);
                            })

                    })
                    .catch(err => {
                        console.log('Error while Creating archive.');
                    })

            })
            .catch(err => {
                console.log('Error while archive request.' + err);
            })
    }

    deleteHandle = id => {

        axios.get(Keep + id)
            .then(result => {
                this.setState({
                    bin: result.data[0]
                })

                const data = this.state.bin

                axios.post(keepBin , data)
                .then(()=>{
                    axios.delete(Keep+id)
                    .then(()=>{
                        this.setState({
                            bin : []
                        })
                        console.log('data stored to bin successfully.');
                    })
                    .catch(err=>{
                        console.log('error while deleting data.');
                    })
                })
                .catch(err=>{
                    console.log('Error while deleted data sending to bin '+err);
                })
            })
            .catch(err => {
                console.log('Error while deleting  data from Item Component.' + err);
            })
    }


    render() {

        const result = this.state.todos.map((value) => <Item key={value.id} id={value.id} title={value.title} task={value.task} gridView={this.props.gridView} show={this.state.show} editNote={() => this.editNote(value.id)} isEdit={this.state.isEdit} editTitle={this.state.title} editTask={this.state.task} inputHandler={this.inputHandler} submitHandler={() => this.submitHandler(value.id)} archiveHandler={() => this.archiveHandler(value.id)} deleteHandle={() => this.deleteHandle(value.id)} />)

        return (
            <>
                <div className='show'>
                    {result}
                </div>
            </>
        )
    }
}

export default Show
