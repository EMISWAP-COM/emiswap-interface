import React, { ErrorInfo } from 'react';
import Modal from '../Modal'
import styled from 'styled-components/macro'
import {AppWrapper} from '../../base/ui/AppWrapper/AppWrapper'
import Logo from '../../assets/svg/logo.svg'
import WarningBlock from '../Warning/WarningBlock'
import {ButtonSecondary} from '../Button'

const ErrorContainer = styled.div`
  padding: 10px;
  width: 100%
  height: 100vh;
`;

const WarningWrapper = styled.div`
  display: flex;
  justify-content: column;
  width: 100%;
  height: 100%;
  padding: 10px;
`;


interface ErrorBoundaryProps {
  children: React.ReactNode;
  onDismiss?: () => void;
  title: string;
}

type ErrorBoundaryStateType = {
  hasError: boolean;
  error?: Error;
  isOpen: boolean;
};


export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryStateType> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, isOpen: true };

  }


  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ hasError: true, error });
  }

  handleDismiss = () => {

    if (this.props.onDismiss) {
      this.setState({ isOpen: false});
      this.props.onDismiss()
    }
  }


  render() {

    if (!this.state.error) {
      return (
        <AppWrapper>
          <ErrorContainer>
            <img src={Logo} alt="logo" />
            <Modal isOpen={this.state.isOpen} onDismiss={this.handleDismiss}>
              <WarningWrapper>
                <WarningBlock
                  title={this.props.title}
                  content={() => <p>{this.state.error?.message}</p>}
                  bottomContent={() => <div>
                      {this.props.onDismiss && <ButtonSecondary onClick={this.handleDismiss}>Dismiss</ButtonSecondary>}
                  </div>}/>
              </WarningWrapper>
            </Modal>
          </ErrorContainer>
        </AppWrapper>
      );
    }
    return this.props.children;
  }
}
