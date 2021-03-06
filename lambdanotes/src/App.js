import React, { Component } from 'react';
import NoteList from './Components/NoteList';
import NewNote from './Components/NewNote';
import ViewNote from './Components/ViewNote';
import UpdateNote from './Components/UpdateNote';
import './App.css';
import { BrowserRouter as Router, Route, NavLink,  Switch } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
      this.state = {
        notes: [],
        note: '',
        details: '',
        id: '',
    }

  }
  

  render() {
    return (
      <Router>
        <div className="mainContainer">
          <div className="navBar">
            <h1> Lambda Notes </h1>
          
                
                <NavLink to='/'>
                  <button type="submit" className="navButton"><p>View Your Notes</p>
                  </button>
                </NavLink>
          
                <NavLink to='/createNote'>
                <div className="navButton2">
                  <p>+Create New Note</p>
              
                </div>
                </NavLink>
            
          </div>
        
          <div className="mainContent">
            <Route path='/' component={this.notes} exact/>
            <Route path='/createNote' component={this.noteForm} />
            <Route path='/:id' component={this.viewNote} />
            <Route path='/update' component={this.updateNote} />
      
          </div>
        </div>
      </Router>
    );
  }


  viewNote = (props) => {
    let id = props.match.params.id;
    let noteDelete = this.noteDelete;

    if(id.length > 1) {
      return null;
    } 

    let note = this.state.notes[id].note;
    let details = this.state.notes[id].details;

    noteDelete = (e) => {
      e.preventDefault();
      let arrayItem = this.state.notes[id];
      let newObj = this.state.notes.filter(item => item !== arrayItem);
      let newerObj = newObj.map(noteObj => {
        return noteObj = {
          note: noteObj.note,
          details: noteObj.details,
          id: newObj.indexOf(noteObj),
        }
      })
      this.setState({
        notes: newerObj,
       })
     return props.history.push('/', this.state)
    }//Note Delete Function

    return (
      <ViewNote note={note} details={details} id={id} noteDelete={noteDelete} updateNote={this.updateNote} />
    )
  }

  noteForm = () => {
    return (
      <NewNote handleInput={this.handleInput} submitNote={this.submitNote} noteValue={this.state.note} detailsValue={this.state.details} />
    )
  }

  notes = () => {
    return (
      <NoteList notes={this.state.notes}  navNote={this.navToNote} idGenerator={this.idGenerator}/>
    )
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value});
}

  updateNote = () => {
    return (
    <UpdateNote handleInput={this.handleInput} submitNote={this.submitNote} noteValue={this.state.note} detailsValue={this.state.details} />
    )
  }

  submitUpdate = (e) => {
    e.preventDefault();
    let updateObj = {
      note: this.state.note,
      details: this.state.details,
    }
  }

  submitNote = (e) => {
      e.preventDefault();
      if(this.state.note.length > 0 && this.state.details.length > 0) {
      let newObj = {
        note: this.state.note, 
        details: this.state.details,
        id: this.state.notes.length,
      };
      this.setState({
        notes: [...this.state.notes, newObj],
      })
      this.setState({
          note: '',
          details: '',
          id: '',
      });
    }
  }
}



export default App;
