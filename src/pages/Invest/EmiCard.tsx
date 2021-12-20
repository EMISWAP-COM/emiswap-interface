import styled from 'styled-components';

export const EmiCard = styled.div`
  position: absolute;
  width: 440px;
  background: #ffffff;
  border-radius: 24px;
  padding: 32px 40px 20px;
  left: 0;
  top: 0;
  right: -210%;
  margin: 0 auto;
  border: 1px solid #ecceff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .arrow-left {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #ecceff;
    position: absolute;
    left: -10px;
    z-index: 100;
  }
  .arrow-left-white {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #fff;
    position: absolute;
    left: -9px;
    z-index: 110;
  }

  .arrow-position {
    &-1 {
      top: 130px;
    }
    &-2 {
      top: 225px;
    }
  }
  .block-with-cards {
    &__header {
      font-family: 'IBM Plex Sans', Arial, sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 26px;
      display: flex;
      align-items: center;
      color: #24272c;
      margin-bottom: 14px;
    }

    &__cards {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .block-with-current-cards {
        width: 100%;
        display: flex;
        margin-bottom: 32px;
        padding-bottom: 32px;
        border-bottom: 1px solid #eaeeee;

        &__img {
          width: 80px;
          margin-right: 24px;
        }

        &__info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        &__title {
          font-family: 'IBM Plex Sans', Arial, sans-serif;
          font-style: normal;
          font-weight: 600;
          font-size: 36px;
          line-height: 47px;
          display: flex;
          align-items: center;
          text-align: center;
          color: #11b382;
        }

        &__text {
          font-family: 'IBM Plex Sans', Arial, sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 20px;
          line-height: 32px;
          display: flex;
          align-items: center;
          text-align: center;
          letter-spacing: -0.01em;
          color: #24272c;
        }
      }

      .emicard {
        width: 100%;
        display: flex;
        margin-bottom: 10px;
        padding: 9px;
        border: 1px solid #ffffff;
        &__info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        &__img {
          margin-right: 24px;
        }

        &__title {
          font-family: 'IBM Plex Sans', Arial, sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 23px;
          display: flex;
          align-items: center;
          letter-spacing: -0.01em;
          color: #24272c;
        }

        &__description {
          font-family: 'IBM Plex Sans', Arial, sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 13px;
          line-height: 17px;
          display: flex;
          align-items: center;
          letter-spacing: -0.01em;
          color: #89919a;
        }

        &__description-card {
          font-family: 'IBM Plex Sans', Arial, sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 160%;
          display: flex;
          align-items: center;
          color: #24272c;
        }

        .green-color {
          color: #11b382;
        }

        .ml-5 {
          margin-left: 5px;
        }

        .mr-5 {
          margin-right: 5px;
        }
      }
    }

    &__footer {
      font-family: 'IBM Plex Sans', Arial, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 170%;
      display: flex;
      align-items: center;
      color: #24272c;
      margin-top: 10px;
    }

    &__btn {
      background: #e8f8f3;
      border-radius: 8px;
      margin-top: 16px;
      width: 360px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      text-decoration: none;

      font-family: 'IBM Plex Sans', Arial, sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 170%;
      text-align: center;
      color: #11b382;
    }

    &__btn-img {
      position: absolute;
      left: 60px;
    }
  }

  .elem2 {
    height: 520px;
    top: 86px;
  }

  .elem1 {
    height: 460px;
    top: 26px;
  }

  .active {
    border: ${({ theme }) => `1px solid ${theme.primary1}`}!important;
    border-radius: 24px;
  }

  .grey {
    color: ${({ theme }) => theme.grey6}!important;
    filter: grayscale(100%) !important;
    opacity: 0.5;
  }

  .grey-text {
    color: ${({ theme }) => theme.grey6}!important;
    opacity: 0.4;
  }

  @media screen and (max-width: 1400px) {
    width: 340px;
    right: -185%;
    padding: 20px;

    .block-with-cards {
      &__btn {
        width: 100%;
      }

      &__btn-img {
        left: 20px;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    width: 100%;
    right: 0;
    top: 103%;

    .block-with-cards {
      &__btn {
        width: 100%;
      }

      &__btn-img {
        left: 20px;
      }
    }
    .arrow-left {
      border-right: 10px solid transparent;
      border-left: 10px solid transparent;
      border-bottom: 10px solid #ecceff;
      border-top: 0;
      position: absolute;
      left: 0;
      z-index: 100;
      right: 0;
      margin: auto;
      top: -10px;
    }
    .arrow-left-white {
      border-right: 10px solid transparent;
      border-left: 10px solid transparent;
      border-bottom: 10px solid #fff;
      border-top: 0;
      position: absolute;
      left: 0;
      z-index: 100;
      right: 0;
      margin: auto;
      top: -9px;
    }
  }
`;

export const EmiCardHeader = styled.div`
  color: #e50606;
  font-size: 1rem;

  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;
