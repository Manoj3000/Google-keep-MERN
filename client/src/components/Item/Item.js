import React, { Component } from 'react'
import './Item.css'
import TextareaAutosize from 'react-textarea-autosize';
import Modal from 'react-modal'

Modal.setAppElement('#root')


class Item extends Component {

    render() {

        const { show, archive, bin, id, title, task, gridView, editNote, isEdit, editTitle, editTask, inputHandler, submitHandler, archiveHandler, unArchiveHandler, restoreHandler, deleteHandle } = this.props

        return (
            <>
                <div className='show-item' style={gridView ? { 'flexBasis': '250px' } : { 'flexBasis': '50%' }} >
                    <div onClick={ bin ? null : editNote} >
                        <h5 className='title'>
                            {title}
                        </h5>
                        <p className='task' >
                            {task}
                        </p>
                    </div>
                    <div className='show-item-btns'>
                        {show ?
                            <button onClick={archiveHandler} type='button' className='show-btn tooltip'>
                                <span className='tooltiptext'>Archive</span>
                                <i className='fa fa-archive'></i>
                            </button>
                        : null}

                        {archive ?
                            <button type='button' onClick={unArchiveHandler} className='show-btn tooltip'>
                                <span className='tooltiptext'>Remove</span>
                                <i className='fa fa-upload'></i>
                            </button>
                        : null}

                        {bin ?
                            <button type='button' onClick={restoreHandler} className='show-btn tooltip'>
                                <span className='tooltiptext'>Restrore</span>
                                <i className='fa fa-upload'></i>
                            </button>
                        : null}

                        <button onClick={deleteHandle} type='button' className='show-btn tooltip'>
                            <span className='tooltiptext'> Delete</span>
                            <i className='fa fa-trash'></i>
                        </button>

                    </div>

                </div>
                <Modal
                    isOpen={isEdit}
                    shouldCloseOnOverlayClick={false}
                    parentSelector={() => document.querySelector('#root')}
                    style={{
                        overlay: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)'
                        },
                        content: {

                            border: 'none',
                            background: 'transperent',
                            overflow: 'auto',
                            overflowY: 'hidden',
                            borderRadius: '4px',
                            outline: 'none',
                            padding: '20px'
                        }
                    }}
                >
                    <div className='edit-item-container'>
                        <form className='edit-item' onSubmit={submitHandler}>
                            <input
                                name="title"
                                type='text'
                                className='title'
                                placeholder="title"
                                value={editTitle}
                                onChange={inputHandler}
                            />
                            <TextareaAutosize
                                name='task'
                                type='text'
                                className='task'
                                placeholder="note..."
                                value={editTask}
                                onChange={inputHandler}
                            />

                            <div className='edit-btn'>
                                <button>save</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </>
        )
    }
}

export default Item
