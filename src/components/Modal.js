import React from 'react'

export default function Modal() {
    return (
        <div class="modal">
            <section>
                <h3>Delete comment</h3>
                <p>Are you sure want to delete this comment? This will remove the comment and can't be undone.</p>
                <div class="modal-footer">
                    <button type="button" className="btn-no">NO, CANCEL</button>
                    <button type="button" className="btn-yes">YES, DELETE</button>
                </div>
            </section>
        </div> 
    )
}