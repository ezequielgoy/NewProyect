import React from 'react'

export default function Message({message,sender}) {
    return (
            <div>
                <div className="msgMetaData">
                    <p>{sender}:</p>
                </div>
                <div className="msg">
                    <p>{message}</p>
                </div>
            </div>
    )
}
