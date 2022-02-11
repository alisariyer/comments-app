import React from 'react'

export default function Modal({handleChoice}) {

    return (
        <div className="modal">
            <section>
                <h3>Delete comment</h3>
                <p>Are you sure want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className="modal-footer">
                    <button type="button" className="btn-no" onClick={() =>handleChoice(false)}>NO, CANCEL</button>
                    <button type="button" className="btn-yes" onClick={() =>handleChoice(true)}>YES, DELETE</button>
                </div>
            </section>
        </div> 
    )
}