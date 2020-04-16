import React from 'react';

const Group = (props) => {

  const { items, onSelectGenre, currentItem, textProperty, valueProperty } = props;

  return ( 
    <ul className="list-group">
      {items.map(item => <li className={currentItem === item ? "list-group-item active" :"list-group-item"   } onClick={() => onSelectGenre(item)} key={item[valueProperty]}>{item[textProperty]}</li>)}
    </ul>
   );
}

Group.defaultProps = {
  textProperty: 'name',
  valueProperty: 'id',
}


export default Group;