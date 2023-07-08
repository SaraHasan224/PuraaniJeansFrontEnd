import React from 'react';

const AuthSlider = () => {
    return (
        <div className="slider-light">
            <div className="slick-slider">
                <div>
                    <div className="position-relative h-100 d-flex justify-content-center align-items-center bg-plum-plate" tabIndex="-1">
                        <div className="slide-img-bg" style="background-image: url('assets/images/originals/city.jpg');"></div>
                        <div className="slider-content"><h3>Perfect Balance</h3>
                            <p>ArchitectUI is like a dream. Some think it's too good to be true! Extensive collection of unified React Boostrap Components and Elements.</p></div>
                    </div>
                </div>
                <div>
                    <div className="position-relative h-100 d-flex justify-content-center align-items-center bg-premium-dark" tabIndex="-1">
                        <div className="slide-img-bg" style="background-image: url('assets/images/originals/citynights.jpg');"></div>
                        <div className="slider-content"><h3>Scalable, Modular, Consistent</h3>
                            <p>Easily exclude the components you don't require. Lightweight, consistent Bootstrap based styles across all elements and components</p></div>
                    </div>
                </div>
                <div>
                    <div className="position-relative h-100 d-flex justify-content-center align-items-center bg-sunny-morning" tabIndex="-1">
                        <div className="slide-img-bg" style="background-image: url('assets/images/originals/citydark.jpg');"></div>
                        <div className="slider-content"><h3>Complex, but lightweight</h3>
                            <p>We've included a lot of components that cover almost all use cases for any type of application.</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AuthSlider;