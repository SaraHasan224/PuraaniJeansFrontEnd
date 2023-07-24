import React, { useState ,useContext } from 'react';
import { Collapse } from 'reactstrap';
import FilterContext from '../../../context/filter/FilterContext';
import { useSelector } from 'react-redux';
import { HELPER } from '../../../utils';


const Color = () => {
    const { filters } = useSelector((state) => state.products);
    var { colors } = filters

    const context = useContext(FilterContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div className="collection-collapse-block open">
            <h3 className="collapse-block-title" onClick={toggle}>colors</h3>
            <Collapse isOpen={isOpen}>
                <div className="collection-collapse-block-content">
                    <div className="color-selector">
                        <ul>
                            {HELPER.isNotEmpty(colors) && Object.keys(colors)?.map((color, i) =>{
                                return(<li
                                    style={{backgroundColor: colors[color]}}
                                    className={`${colors[color]} ${context.selectedColor === colors[color]? 'active' : ''}`}
                                    onClick={() => {context.setSelectedColor(colors[color])}}
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