/**
 * Created by cup on 23/10/2016.
 */

import { render } from 'react-dom'

const tabType = PropTypes.shape({
    label: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
});

const countryType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
});

const styles = {}

styles.tab = {
    display: 'inline-block',
    padding: 10,
    margin: 10,
    borderBottom: '4px solid',
    borderBottomColor: '#ccc',
    cursor: 'pointer'
};

styles.activeTab = {
    ...styles.tab,
    borderBottomColor: '#000'
};


styles.panel = {
    padding: 10
};

const Tabs = React.createClass({
    propTypes: {
        data: PropTypes.arrayOf(tabType)
    },
    getInitialState() {
        return {
            activeTabIndex: 0
        }
    },
    selectTabIndex(activeTabIndex) {
        this.setState({
            activeTabIndex
        })
    },
    render() {
        const { data } = this.props
        const { activeTabIndex } = this.state


        /*
         The key point is to define active prop in render method.
         */
        const tabs = data.map((tab, index) => {
            const isActive = index === activeTabIndex
            const style = isActive ? styles.activeTab : styles.tab

            return (
                <div
                    key={tab.label}
                    className="Tab"
                    style={style}
                    onClick={() => this.selectTabIndex(index)}
                >{tab.label}</div>
            )
        })

        const activeTab = data[activeTabIndex]
        const content = activeTab && activeTab.content

        return (
            <div className="Tabs">
                {tabs}
                <div className="TabPanel" style={styles.panel}>
                    {content}
                </div>
            </div>
        )
    }
})

const App = React.createClass({
    propTypes: {
        countries: PropTypes.arrayOf(countryType).isReuired
    },
    render() {
        const data = this.props.countries.map(country => ({
            label: country.name,
            content: country.description
        }))

        return (
            <div>
                <h1>Countries</h1>
                <Tabs data={data}/>
            </div>
        )
    }
})

const DATA = [
    { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
    { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
    { id: 3, name: 'Russia', description: 'World Cup 2018!' }
]

render(<App countries={DATA}/>, document.getElementById('app'), function () {
    require('./tests').run(this)
})
