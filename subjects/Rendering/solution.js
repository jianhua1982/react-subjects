////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - render DATA.title in an <h1>
// - render a <ul> with each of DATA.items as an <li>
// - now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
// - add a select dropdown to make filtering on `type` dynamic
// - add a button to toggle the sort order
// - Hint: you'll need an `updateThePage` function that calls `render`,
//   and then you'll need to call it in the event handlers of the form controls
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom';
import sortBy from 'sort-by';
import './styles';

const MenuList = React.createClass({
    render: function() {
        const filterBy = this.props.filterBy;
        const lis = this.props.data.map(function(item) {
            if(filterBy === '' || filterBy === item.type) {
                return <li key={item.id}>{item.name}</li>;
            }

            return null;
        });

        debugger

        return (
            <ul className="menuList">
                {lis}
            </ul>
        );
    }
});

const MenuSelect = React.createClass({
    getInitialState: function() {
        return {
            types: ''
        };
    },
    componentDidMount: function() {
        console.log('MenuSelect... componentDidMount');
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleChange: function(e) {
        const filterBy = 'english';

        console.log('change for option ' + filterBy);
        //debugger

        this.props.onSelectChange(filterBy);
    },
    render: function() {
        let types = new Set();
        //types.add('all');

        for(let item of this.props.data) {
            types.add(item.type);
        }

        let options = new Set(), index = 1;
        for(let type of types) {
            options.add(<option key={index++} value={type}>{type}</option>);
        }

        return (
            <select ref="types" className="menuSelect" onChange={this.handleChange}>
                {options}
            </select>
        );
    }
});

const Menu = React.createClass({
    getInitialState: function() {
        return {type: ''};
    },
    handleSelectChange: function(type){
        this.state.type = type;
    },
    render: function() {
        return (
            <div>
                <h1>{this.props.data.title} </h1>

                <MenuList data={this.props.data.items} filterBy={this.state.type}>
                </MenuList>

                <div>
                    <span>You can filter by</span>

                    <MenuSelect data={this.props.data.items} onSelectChange={this.handleSelectChange}>

                    </MenuSelect>
                </div>
            </div>
        );
    }
});

render(<Menu data={
    {
      title: 'Menu',
      items: [
        { id: 1, name: 'tacos', type: 'mexican' },
        { id: 2, name: 'burrito', type: 'mexican' },
        { id: 3, name: 'tostada', type: 'mexican' },
        { id: 4, name: 'mushy peas', type: 'english' },
        { id: 5, name: 'fish and chips', type: 'english' },
        { id: 6, name: 'black pudding', type: 'english' },
        { id: 7, name: 'xiao chao rou', type: 'Chinese' }
      ]
    }
}  />, document.getElementById('app'), () => {
  //require('./tests').run()
});
