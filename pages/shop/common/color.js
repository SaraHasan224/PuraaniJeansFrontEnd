import React, { useState, useContext } from 'react';
import { Collapse } from 'reactstrap';
import FilterContext from '../../../context/filter/FilterContext';
import { useSelector } from 'react-redux';
import { HELPER } from '../../../utils';


const Color = () => {
    const { color } = useSelector((state) => state.products);

    const context = useContext(FilterContext);
    const { isChecked, selectedColor, handleColor } = context;
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="collection-collapse-block open">
            <h3 className="collapse-block-title" onClick={toggle}>colors</h3>
            <Collapse isOpen={isOpen}>
                <div className="collection-collapse-block-content">
                    <div className="color-selector">
                        <ul>
                            {HELPER.isNotEmpty(color) && Object.keys(color)?.map((value, i) => {
                                return (<li
                                    style={{ backgroundColor: color[value].value }} 
                                    className={`${color[value]} ${selectedColor.indexOf(color[value].value) > -1 ? 'active' : ''}`}
                                    onClick={() => { 
                                        handleColor(color[value]?.value, isChecked);
                                    }}
                                ></li>)
                            })
                            }
                        </ul>
                    </div>
                </div>
            </Collapse>
        </div>
    )
}

export default Color;