import React, { useState } from 'react';
import CommonLayout from '../../components/layouts/common-layout';
import ProductList from './common/productList';
import { Container, Row} from 'reactstrap';
import FilterPage from './common/filter';

const Shop = () => {
    const [sidebarView,setSidebarView] = useState(false)
    
    const openCloseSidebar = () => {
        if(sidebarView){
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
                            <FilterPage sm="3" sidebarView={sidebarView} closeSidebar={() => openCloseSidebar(sidebarView)} />
                            <ProductList
                                colClass="col-xl-3 col-6 col-grid-box"
                                layoutList=''
                                openSidebar={() => openCloseSidebar(sidebarView)}
                                title="Mens Wear"
                                parent="Home"
                                subTitle="Shop"
                            />
                        </Row>
                    </Container>
                </div>
            </section>
        </CommonLayout>
    )
}

export default Shop;