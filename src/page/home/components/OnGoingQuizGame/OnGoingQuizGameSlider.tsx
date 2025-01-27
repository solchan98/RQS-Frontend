import React from 'react';
import Slider from 'react-slick';
import { SliderArrowButton } from './OnGoingQuizGameSlider.styles';

interface IOnGoingQuizGameSliderProps {
  children?: React.ReactNode;
}

interface IArrowButtonProps {
  className?: string;
  style?: React.CSSProperties | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const ArrowButton = (props: IArrowButtonProps) => {
  const { className, style, onClick } = props;
  return <SliderArrowButton className={className} style={{ ...style }} onClick={onClick} color='gray' />;
};

export const OnGoingQuizGameSlider = ({ children }: IOnGoingQuizGameSliderProps) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowButton />,
    prevArrow: <ArrowButton />,
  };

  return <Slider {...settings}>{children}</Slider>;
};
