import React, { Component } from 'react'
import Item from '../Item/Item'

class Search extends Component {
    render() {

        const result = this.props.searchedData.map((value) => <Item todos key={value.id} id={value.id} title={value.title} task={value.task} gridView={this.props.gridView} />)

        return (
            <div className='show'>
                {result}
            </div>
        )
    }
}

export default Search
