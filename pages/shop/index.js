import React, { useState } from 'react';
import CommonLayout from '../../components/layouts/common-layout';
import ProductList from './common/productList';
import { Container, Row } from 'reactstrap';
import FilterPage from './common/filter';
import { HELPER } from '../../utils';
import { useSelector } from 'react-redux';

const Shop = () => {
    const { color } = useSelector((state) => state.products);

    const [sidebarView, setSidebarView] = useState(false)

    const openCloseSidebar = () => {
        if (sidebarView) {
            setSidebarView(!sidebarView)
        } else {
            setSidebarView(!sidebarView)
        }
    }

    return (
        <CommonLayout title="collection" parent="home" >
            <section className="section-b-space ratio_asos">
                <div className="collection-wrapper">
                    <Container>
                        <Row>
                            {
                                HELPER.isNotEmpty(color) ?
                                    <FilterPage sm="3" sidebarView={sidebarView} closeSidebar={() => openCloseSidebar(sidebarView)} />
                                    : ""
                            }
                            <ProductList
                                colClass="col-xl-3 col-6 col-grid-box"
                                layoutList=''
                                openSidebar={() => openCloseSidebar(sidebarView)}
                            />
                        </Row>
                    </Container>
                </div>
            </section>
        </CommonLayout>
    )
}

export default Shop;