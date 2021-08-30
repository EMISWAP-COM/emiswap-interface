import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import Question from '../../assets/svg/FAQIcon/question.svg';
import ArrowDown from '../../assets/svg/FAQIcon/arrowDown.svg';
import ArrowUp from '../../assets/svg/FAQIcon/arrowUp.svg';

export interface AccordionProps {
  header: string;
  children: React.ReactNode;
  btnClick?: () => void;
  btnText?: string;
  btnSecondClick?: () => void;
  btnSecondText?: string;
  isContentFullWidth?: boolean;
}

const StyledAccordion = styled.div`
  background: #000;
  border: 1px solid #eaeeee;
  box-sizing: border-box;
  box-shadow: 0 2px 10px -2px rgba(231, 215, 175, 0.3), 0px 21px 20px -15px rgba(140, 125, 85, 0.05);
  border-radius: 12px;
  padding: 27px 30px;
  margin: 10px auto;
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`

const StyledHeaderLeft = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 18px;
  }
`

const StyledHeaderOpenIcon = styled.div`
  height: 32px;
`

const StyledHeaderTitle = styled.div`
  font-family: 'IBM Plex Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  letter-spacing: -0.01em;
  color: #fff;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 16px;
    line-height: 1.4;
  `};
`

const StyledAccordionContent = styled.div<{isContentFullWidth?: boolean}>`
  height: 0px;
  transition: height 0.5s;
  overflow: hidden;
  padding: ${({isContentFullWidth}) => isContentFullWidth ? '0 0' : '0 38px'};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 0;
  `};
`

const StyledChildrenWrapper = styled.div`
  margin: 40px 0;
`

export const AccordionButtonsWrapper = styled.div`
  display: flex;
  // justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: block;
    height: auto;
  `};
`

export const AccordionButton = styled.div`
  background: ${({theme}) => theme.purple};
  border-radius: 4px;
  width: 245px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-family: 'IBM Plex Sans', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.02em;
  color: ${({theme}) => theme.white};
  // margin: 0 30px;

  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.purpleBoxShadow};
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0 auto 16px auto;
  `};
`

/*const StyledLine = styled.div`
  width: 200px;
  height: 1px;
  background: #dbdede;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`*/

export default (props: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>();

  const handleSwitchAccordion = () => {
    const isNowOpen = !isOpen;
    setIsOpen(isNowOpen);

    // Synchronously change content height to auto and then zero to get the value.
    // Then asynchronously set this value as content height so transition could work
    if (isNowOpen) {
      contentRef.current.style.height = 'auto';
      const contentHeight = contentRef.current.clientHeight;
      contentRef.current.style.height = '0px';
      setTimeout(() => {
        contentRef.current.style.height = `${contentHeight}px`;
      });
    } else {
      contentRef.current.style.height = '0px';
    }
  };

  // Recalculate content height on resize if accordion is opened
  useLayoutEffect(() => {
    const resizeHandler = () => {
      if (isOpen) {
        contentRef.current.style.height = 'auto';
        const contentHeight = contentRef.current.clientHeight
        setTimeout(() => {
          contentRef.current.style.height = `${contentHeight}px`;
        });
      }
    }

    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [isOpen])

  return (
    <StyledAccordion>
      <StyledHeader onClick={handleSwitchAccordion}>
        <StyledHeaderLeft>
          <img src={Question} alt="" />
          <StyledHeaderTitle>{props.header}</StyledHeaderTitle>
        </StyledHeaderLeft>
        <StyledHeaderOpenIcon>
          <img src={isOpen ? ArrowUp : ArrowDown} alt="" />
        </StyledHeaderOpenIcon>
      </StyledHeader>
      <StyledAccordionContent ref={contentRef} isContentFullWidth={props.isContentFullWidth}>
        <StyledChildrenWrapper>
          {props.children}
        </StyledChildrenWrapper>
        {(props.btnText || props.btnSecondText) && (
          <AccordionButtonsWrapper>
            {props.btnText && (
              <AccordionButton onClick={props.btnClick}>
                {props.btnText}
              </AccordionButton>
            )}
            {props.btnSecondText && (
              <AccordionButton onClick={props.btnSecondClick}>
                {props.btnSecondText}
              </AccordionButton>
            )}
          </AccordionButtonsWrapper>
        )}
      </StyledAccordionContent>
    </StyledAccordion>
  );
};
