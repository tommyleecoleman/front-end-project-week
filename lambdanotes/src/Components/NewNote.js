import React from 'react';

const NewNote = (props) => {
    
        return (
            <form onSubmit={props.submitNote}>
                <input type="text" name="note" onChange={props.handleInput} placeholder="New Note" />
                <input type="text" name="details" onChange={props.handleInput} placeholder="Note Details" />
                <button type="submit" onSubmit={props.submitNote}>Submit Note</button>
            </form>
        )
    }


export default NewNote;