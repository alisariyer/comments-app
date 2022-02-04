import React from 'react'
import Card from './Card'
import data from '../data.json'

export default function CardContainer() {
    console.log(data.comments)
    const cards = data.comments.map((comment) => <Card key={comment.id} content={comment} />)
    return (
        <section>
            { cards }
        </section>
    )
}