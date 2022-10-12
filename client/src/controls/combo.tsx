import React from 'react';
export const Combo: React.FunctionComponent<any> = ({ name, value, items, onChange }) => {
    return <select className='combo' name={name} onChange={onChange} value={value}>
        {items.map(function (item: any, index: number) {
            return <option key={index + 1} value={item.value}>{item.name}</option>
        })}
    </select>
}