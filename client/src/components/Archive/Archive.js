import React, { Component } from 'react'
import './Archive.css'
import Item from '../Item/Item'
import axios from 'axios'
import swal from 'sweetalert'

const Keep = 'http://localhost:4000/'
const KeepArchive = 'http://localhost:4000/archive/'
const keepBin = 'http://localhost:4000/bin/'

class Archive extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: '',
            task: '',
            todos: [],
            unArchive: [],
            bin:[],
            isEdit: false,
            archive: true
        }
    }

    componentDidMount() {

        axios.get(KeepArchive)
            .then(result => {
                this.setState({
                    todos: result.data
                })
            })
            .catch(err => {
                console.log('Error while showing data from Archive Component.' + err);
            })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.todos !== this.state.todos){
            axios.get(KeepArchive)
            .then(result => {
                this.setState({
                    todos: result.data
                })
            })
            .catch(err => {
                console.log('Error while Unarchive data from Archive ComponentDidUpdate.' + err);
            })
        }
    }

    editNote = (id) => {

        axios.get(KeepArchive + id)
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

        axios.put(KeepArchive + id, updateddata)
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

    unArchiveHandler = id => {

        axios.get(KeepArchive + id)
            .then(result => {

                this.setState({
                    unArchive: result.data[0]
                })

                const data = this.state.unArchive

                axios.post(Keep, data)
                    .then(() => {
                        this.setState({
                            unArchive: []
                        })
                        // swal("Task Unarchived!", "", "success");
                        axios.delete(KeepArchive + id)
                            .then(() => {
                                console.log('Data Unarchived');
                            })
                            .catch(err => {
                                console.log('Error while archive file deleteing from archive.' + err);
                            })

                    })
                    .catch(err => {
                        console.log('Error while createing Unachive ');
                    })

            })
            .catch(err => {
                console.log('Error while unarchive request.' + err);
            })
    }

    deleteHandle = id => {
        axios.get(KeepArchive + id)
            .then(result => {
                this.setState({
                    bin: result.data[0]
                })

                const data = this.state.bin

                axios.post(keepBin, data)
                    .then(() => {
                        axios.delete(KeepArchive + id)
                            .then(() => {
                                this.setState({
                                    bin: []
                                })
                                console.log('data stored to bin successfully.');
                            })
                            .catch(err => {
                                console.log('error while deleting data.');
                            })
                    })
                    .catch(err => {
                        console.log('Error while deleted data sending to bin ' + err);
                    })
            })
            .catch(err => {
                console.log('Error while deleting  data from Item Component.' + err);
            })
    }


    render() {

        const result = this.state.todos.map((value) => <Item key={value.id} id={value.id} title={value.title} task={value.task} gridView={this.props.gridView} archive={this.state.archive} editNote={() => this.editNote(value.id)} isEdit={this.state.isEdit} editTitle={this.state.title} editTask={this.state.task} inputHandler={this.inputHandler} submitHandler={() => this.submitHandler(value.id)} unArchiveHandler={() => this.unArchiveHandler(value.id)} deleteHandle={() => this.deleteHandle(value.id)} />)

        return (
            <>
                <div style={{ textAlign: "center", marginTop: '20px' }}>
                    Your Archive
                </div>
                <div className='show'>
                    {result}
                </div>
            </>
        )
    }
}

export default Archive
