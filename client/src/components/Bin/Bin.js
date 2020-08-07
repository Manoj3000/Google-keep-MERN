import React, { Component } from 'react'
import './Bin.css'
import axios from 'axios'
import Item from '../Item/Item'
import swal from 'sweetalert'

const Keep = 'http://localhost:4000/'
const KeepArchive = 'http://localhost:4000/archive/'
const keepBin = 'http://localhost:4000/bin/'


class Bin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            todos: [],
            restore:[],
            bin: true,
            isEdit: false
        }
    }

    componentDidMount() {
        axios(keepBin)
            .then(result => {
                this.setState({
                    todos: result.data
                })
            })
            .catch(err => {
                console.log('Error while showing data from Bin Component.' + err);
            })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.todos !== this.state.todos){
            axios.get(keepBin)
            .then(result => {
                this.setState({
                    todos: result.data
                })
            })
            .catch(err => {
                console.log('Error while Deleting data from Bin ComponentDidUpdate.' + err);
            })
        }
    }

    restoreHandler = id => {

        axios.get(keepBin + id)
            .then(result => {

                this.setState({
                    restore: result.data[0]
                })

                const data = this.state.restore

                axios.post(Keep, data)
                    .then(() => {
                        this.setState({
                            restore: []
                        })
                        axios.delete(keepBin + id)
                            .then(() => {
                                console.log('Data remove form bin');
                            })
                            .catch(err => {
                                console.log('Error while archive file deleteing from archive.' + err);
                            })

                    })
                    .catch(err => {
                        console.log('Error while createing Unbin in show ');
                    })

            })
            .catch(err => {
                console.log('Error while restore bin item request.' + err);
            })
    }

    deleteHandle = id => {

        axios.delete(keepBin + id)
            .then(() => {
                console.log('Data delete successfully from Item Component');
            })
            .catch(err => {
                console.log('Error while deleting  data from Item Component.' + err);
            })
    }


    render() {
        const result = this.state.todos.map(value => <Item bin={this.state.bin} key={value.id} id={value.id} title={value.title} task={value.task} gridView={this.props.gridView} restoreHandler={()=>this.restoreHandler(value.id)} deleteHandle={()=>this.deleteHandle(value.id)} />)
        return (
            <>
                <div style={{ textAlign: "center", marginTop: '20px' }}>
                    Recycle Bin
                </div>
                <div className='show'>
                    {result}
                </div>
            </>
        )
    }
}

export default Bin
