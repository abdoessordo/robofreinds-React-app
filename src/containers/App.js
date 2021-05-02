import React,{ Component } from 'react';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css'

class App extends Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {this.setState({robots: users})})
    }

    onSearchChange = (event) =>  {
        this.setState({searchfield : event.target.value})
    }
    render(){
        const filteredRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        
        return !this.state.robots.length ?
        (    
        <div className='tc'>
            <h1 className="f1">RoboFriends</h1>
            <SearchBox searchchange={this.onSearchChange}/>
            <h1>Loading ...</h1>
        </div>
        ) :
        (
            <div className='tc'>
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchchange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        )
    }
}

export default App;