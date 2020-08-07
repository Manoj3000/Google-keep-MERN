import React, { Component } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Create from './components/Create/Create'
import Show from './components/Show/Show'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Search from './components/Search/Search'
import Axios from 'axios'
import Archive from './components/Archive/Archive'
import Bin from './components/Bin/Bin'

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            wantToSearch: false,
            search: '',
            searchedData: [],
            gridView: true,
            toggleNavbar: false,
            navTitle: 'Keep'
        }
    }

    searchHandler = e => {
        this.setState({
            search: e.target.value,
            wantToSearch: true
        })
        if (this.state.search === '') {
            this.setState({
                wantToSearch: false
            })
        } else {
            Axios.get('http://localhost:4000/search/' + this.state.search)
                .then(result => {
                    this.setState({
                        searchedData: result.data,
                    })
                })
                .catch(err => {
                    console.log('Error while Showing Searched data.' + err);
                })
        }

    }

    refreshPage = () => {
        window.location.reload(false);
    }

    gridViewhandler = () => {
        this.setState({
            gridView: !this.state.gridView
        })
    }

    toggleNavbarHandler = () => {
        this.setState({
            toggleNavbar: !this.state.toggleNavbar
        })
    }

    navTitleHandler = e => {
        this.setState({
            navTitle: e
        })
    }

    render() {
        return (
            <BrowserRouter>
                <div className='app'>

                    <Navbar navTitle={this.state.navTitle} toggleNavbar={this.state.toggleNavbar} toggleNavbarHandler={this.toggleNavbarHandler} search={this.state.search} searchHandler={this.searchHandler} refreshPage={this.refreshPage} gridView={this.state.gridView} gridViewhandler={this.gridViewhandler} />

                    {this.state.toggleNavbar 
                        ?
                        <div className='sidebar'>
                            <ul className='sidebar-ul'>

                                <Link to='/' onClick={() => this.navTitleHandler('Keep')} >
                                    <li className='sidebar-li'>
                                        <i className='fa fa-lightbulb-o'></i>
                                    </li>

                                </Link>
                                <Link to='/archive' onClick={() => this.navTitleHandler('Archive')}>
                                    <li className='sidebar-li'>
                                        <i className='fa fa-archive'></i>
                                    </li>

                                </Link>
                                <Link to='/bin' onClick={() => this.navTitleHandler('Bin')}>
                                    <li className='sidebar-li'>
                                        <i className='fa fa-trash'></i>
                                    </li>
                                </Link>

                            </ul>
                        </div>

                        : 
                        null}

                    <Switch>
                        <Route exact path='/'>
                            <Create />
                            {this.state.wantToSearch ?
                                <Search
                                    searchedData={this.state.searchedData}
                                    gridView={this.state.gridView}

                                />
                                :
                                <Show
                                    gridView={this.state.gridView}
                                />}
                        </Route>
                        <Route path='/archive'>
                            <Archive
                                navTitle={this.state.navTitle}
                                gridView={this.state.gridView}
                            />
                        </Route>
                        <Route path='/bin'>
                            <Bin
                                gridView={this.state.gridView}
                            />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App
