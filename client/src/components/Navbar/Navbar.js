import React, { Component } from 'react'
import logo from '../../asset/keep.png'
import './Navbar.css'

class Navbar extends Component {
    render() {
        const {navTitle , toggleNavbar , toggleNavbarHandler , search, searchHandler , refreshPage , gridView , gridViewhandler } = this.props
        return (
            <nav className='my-navbar' >
                <div className='one' >
                    <button className='nav-btn-bars' onClick={toggleNavbarHandler} >
                        <span className={toggleNavbar ? 'fa fa-times' : 'fa fa-bars' }></span>
                    </button>
                    <img className='nav-logo'
                        src={logo}
                        alt='Keep logos' />
                    <h5 className='nav-keep' > {navTitle} </h5>
                </div>
                <div className='two' >
                    <i className="fa fa-search"
                        aria-hidden="true" > </i>
                    <input value={search}
                        onChange={searchHandler}
                        className='nav-search'
                        type='search'
                        placeholder='Search' />
                </div>
                <div className='three' >
                    <button id='refresh' onClick={refreshPage} className='side-btn' >
                        <span className='fa fa-refresh' ></span>
                    </button>
                    <button id='grid' className='side-btn' onClick={gridViewhandler} >
                        <span className={gridView ? 'fa fa-th-large' : 'fa fa-pause' }></span>
                    </button>
                    <button id='setting' className='side-btn' >
                        <span className='fa fa-cog' ></span>
                    </button>
                </div>
            </nav>
            
        )
    }
}

export default Navbar