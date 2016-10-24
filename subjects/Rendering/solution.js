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

//let types_g;
const allTypes = 'all';

const MenuList = React.createClass({
    render: function() {
        let data;
        //debugger
        if(this.props.state.sortBy) {
            //debugger
            data = JSON.parse(JSON.stringify(this.props.data)).sort(sortBy('name'));
        }
        else {
            data = this.props.data;
        }

        const filterBy = this.props.state.type;
        const lis = data.map(function(item) {
            if(filterBy === allTypes || filterBy === item.type) {
                return <li key={item.id}>{item.name}</li>;
            }

            return null;
        });

        return (
            <ul className="menuList">
                {lis}
            </ul>
        );
    }
});


const MenuSelect = React.createClass({
    //getInitialState: function() {
    //    return {
    //        types: new Set()
    //    };
    //},
    componentDidMount: function() {
        console.log('MenuSelect... componentDidMount');
    },
    handleChange: function (...types) {
        //debugger

        //let selectDom = this.refs.selectDom,
        //    selectDom.getAttribute('types');
        //const filterBy = this.state.types[this.refs.types.selectedIndex];

        //let filterBy = this.refs.selectDom.getAttribute('data-types')[this.refs.selectDom.selectedIndex];
        // tmp solution
        //debugger

        const typesObj = JSON.parse(window.document.getElementsByClassName('menuSelect')[0].getAttribute('data-types'));
        //const filterBy = Array.from(types_g)[this.refs.selectDom.selectedIndex];
        const filterBy = typesObj.types[this.refs.selectDom.selectedIndex];

        console.log('change for option ' + filterBy);

        this.props.onSelectChange(filterBy);
    },
    render: function() {

        let types = new Set();
        types.add(allTypes);
        for(let item of this.props.data) {
            types.add(item.type);
        }

        let options = new Set(),
            index = 1;

        for(let type of types) {
            options.add(<option key={index++} value={type}>{type}</option>);
        }

        //types_g = types;

        return (
            <select ref="selectDom" className="menuSelect" onChange={this.handleChange} data-types={JSON.stringify({types: Array.from(types)})}>
                {options}
            </select>
        );
    }
});

const Menu = React.createClass({
    getInitialState: function() {
        return {
            type: allTypes,
            sortBy: false
        };
    },
    handleSelectChange: function(type){
        this.setState({type: type});
    },

    handleCheckboxChange: function(event){
        this.setState({sortBy: event.target.checked});
    },

    render: function() {
        return (
            <div>
                <h1>{this.props.data.title} </h1>

                <MenuList data={this.props.data.items} state={this.state} >
                </MenuList>

                <div>
                    <span>You can filter by</span>

                    <MenuSelect data={this.props.data.items} onSelectChange={this.handleSelectChange}>
                    </MenuSelect>

                    <div>
                        <input type="checkbox" className="checkboxSwitch" onClick={this.handleCheckboxChange} />
                        <span>排序显示</span>
                    </div>
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
        { id: 7, name: 'xiao chao rou', type: 'Chinese' },
        { id: 8, name: 'mapo beason', type: 'Chinese' }
      ]
    }
}  />, document.getElementById('app'), () => {
  //require('./tests').run()
});
