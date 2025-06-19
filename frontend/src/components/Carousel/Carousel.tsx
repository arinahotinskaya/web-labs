import React, { useRef } from 'react';
import { Carousel as AntdCarousel } from 'antd';

const contentStyle: React.CSSProperties = {
	height: '160px',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	background: '#364d79',
};

const Carousel = () => {
	const onChange = (currentSlide: number) => {
		console.log(currentSlide);
	};

	return (
		<AntdCarousel afterChange={onChange} infinite autoplay={false}>
			<div>
				<h3 style={contentStyle}>1</h3>
			</div>
			<div>
				<h3 style={contentStyle}>2</h3>
			</div>
			<div>
				<h3 style={contentStyle}>3</h3>
			</div>
			<div>
				<h3 style={contentStyle}>4</h3>
			</div>
		</AntdCarousel>
	);
};

export default Carousel;
