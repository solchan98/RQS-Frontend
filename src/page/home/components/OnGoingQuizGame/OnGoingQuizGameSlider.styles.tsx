import styled from 'styled-components';

export const SliderArrowButton = styled.button`
  display: block;
  &::before {
    color: ${(props) => props.color || 'gray'} !important;
  }
`;
