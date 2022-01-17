import React from 'react';

const Slide = ({classy, image}) => (
    <div className={classy}>
        <img src={image} alt={image} className="slide__image"/>
    </div>
);

const Slider = ({slides}) => {
    const [cur, setCur] = React.useState(0);
    const nextMoving = () => {
        if (cur >= slides.length - 1) {
            setCur(0);
        } else {
            setCur(cur + 1);
        }
    };
    const prevMoving = () => {
        if (cur <= 0) {
            setCur(slides.length - 1);
        } else {
            setCur(cur - 1);
        }
    };
    return (
        <section className="slider">
            {!slides || slides.length === 0 ? null : (
                <>
                    <div className={"btn-slider"}>
                        <button className="prev" onClick={prevMoving}>
                            <i className="fas fa-arrow-circle-left"/>
                        </button>
                        <button className="next" onClick={nextMoving}>
                            <i className="fas fa-arrow-circle-right"/>
                        </button>
                    </div>
                    {slides.map((slide, idx) => {
                        return (
                            <Slide
                                classy={idx === cur ? "slide active" : "slide"}
                                key={idx}
                                {...slide}
                            />
                        );
                    })}
                </>
            )}
        </section>
    );
};

export default Slider;
