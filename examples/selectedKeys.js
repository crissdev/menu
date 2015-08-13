'use strict';

import React from 'react';
import Menu, {SubMenu, Item as MenuItem, ItemGroup as MenuItemGroup, Divider} from 'rc-menu';

import 'rc-menu/assets/index.less';
import 'font-awesome/css/font-awesome.css';

var Test = React.createClass({
  getInitialState(){
    return {
      destroyed: false,
      selectedKeys: [],
      openedKeys: []
    };
  },

  onSelect(info){
    console.log('selected ', info);
    this.setState({
      selectedKeys: info.selectedKeys
    });
  },

  onDeselect(info) {
    console.log('deselect ', info);
  },

  onOpen(info){
    console.log('opened ', info);
    this.setState({
      openedKeys: info.openedKeys
    });
  },

  onClose(info){
    console.log('opened ', info);
    this.setState({
      openedKeys: info.openedKeys
    });
  },

  getMenu(){
    return (
      <Menu multiple={true}
            onSelect={this.onSelect}
            onDeselect={this.onDeselect}
            onOpen={this.onOpen}
            onClose={this.onClose}
            openedKeys={this.state.openedKeys}
            selectedKeys={this.state.selectedKeys}>
        <SubMenu key="1" title="submenu1">
          <MenuItem key="1-1">item1-1</MenuItem>
          <MenuItem key="1-2">item1-2</MenuItem>
        </SubMenu>
        <SubMenu key="2" title="submenu2">
          <MenuItem key="2-1">item2-1</MenuItem>
          <MenuItem key="2-2">item2-2</MenuItem>
        </SubMenu>
        <MenuItem key="3">item3</MenuItem>
      </Menu>
    );
  },

  onCheck(e){
    var value = e.target.value;
    if (e.target.checked) {
      this.setState({
        selectedKeys: this.state.selectedKeys.concat(value)
      });
    } else {
      var selectedKeys = this.state.selectedKeys.concat();
      var index = selectedKeys.indexOf(value);
      if (value !== -1) {
        selectedKeys.splice(index, 1);
      }
      this.setState({
        selectedKeys: selectedKeys
      });
    }
  },

  onOpenCheck(e){
    var value = e.target.value;
    if (e.target.checked) {
      this.setState({
        openedKeys: this.state.openedKeys.concat(value)
      });
    } else {
      var openedKeys = this.state.openedKeys.concat();
      var index = openedKeys.indexOf(value);
      if (value !== -1) {
        openedKeys.splice(index, 1);
      }
      this.setState({
        openedKeys: openedKeys
      });
    }
  },

  render(){
    if (this.state.destroyed) {
      return null;
    }
    var allSelectedKeys = ["1-1", "1-2", "2-1", "2-2", "3"];
    var allOpenedKeys = ["1", "2"];
    var selectedKeys = this.state.selectedKeys;
    var openedKeys = this.state.openedKeys;

    return <div>
      <h2>multiple selectable menu</h2>

      <p>
        selectedKeys: &nbsp;&nbsp;&nbsp;
        {allSelectedKeys.map((k)=> {
          return <label key={k}>{k} <input value={k} key={k} type="checkbox" onChange={this.onCheck}
                                           checked={selectedKeys.indexOf(k)!==-1}/></label>;
        })}
      </p>

      <p>
        openedKeys: &nbsp;&nbsp;&nbsp;
        {allOpenedKeys.map((k)=> {
          return <label key={k}>{k} <input value={k} type="checkbox" onChange={this.onOpenCheck}
                                           checked={openedKeys.indexOf(k)!==-1}/></label>;
        })}
      </p>

      <div style={{width: 400}}>{this.getMenu()}</div>
    </div>;
  },

  destroy(){
    this.setState({
      destroyed: true
    });
  }
});


React.render(<Test />, document.getElementById('__react-content'));