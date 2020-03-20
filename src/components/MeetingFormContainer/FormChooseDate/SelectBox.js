import React, { PureComponent } from 'react'
import './SelectBok.scss'

export default class SelectBox extends PureComponent {
   state = {
        ...this.props,
       items: this.props.items || [],
       showItems: false,
       selectedItem: this.props.appointment[this.props.type]
   } 

   dropDown = () => {
    this.setState(prevState => ({
      showItems: !prevState.showItems
    }))
  }

  selectItem = (item) => {
    this.setState({
      selectedItem: item,
      showItems: false,
    }) 
    console.log(item)
    this.props.handleSelectChange(this.props.type, item)
  }
  render () {
    return <div key={this.props.type}>
        <p>Select a {this.props.type}:</p>
      <div className="select-box--box">
        <div className="select-box--container">
          <div className="select-box--selected-item">
            { this.state.selectedItem[this.props.type] }
          </div>
          <div
            className="select-box--arrow"
            onClick={this.dropDown}
          ><span className={`${this.state.showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`}/></div>
        </div>
        <div
          className="select-box--items"
          style={{display: this.state.showItems ? 'block' : 'none'}}
        >
          {
            this.state.items.map(item => <div
              onClick={() => this.selectItem(item)}
              className={this.state.selectedItem === item ? 'selected' : ''}
            >
              {item[this.props.type] || item }
            </div>)
          }
        </div>
      </div>
      <input type="hidden" name={this.state.name} value={this.state.selectedItem.id} />
    </div>
  }
}