import React from 'react'
import imgAvatar from '../images/avatars/image-amyrobson.png'
import data from '../data.json'

export default function Comment() {
    const currentUser = data.currentUser.username;
    const createdAt = data.comments[0].createdAt;
    const comment = data.comments[0].content;
    return (
        <div className="card">
            <header className="card-header">
                <img className="card-img" src={imgAvatar} alt=""/>
                <p>{currentUser}</p>
                <span className="card-time">{createdAt}</span>
            </header>
            <section className="card-body">
                <p>{comment}</p>
            </section>
            <footer className="card-footer"></footer>
        </div>
    )
}