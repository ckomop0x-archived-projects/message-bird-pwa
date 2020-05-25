import styled from 'styled-components';

export const LoginStyled = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  position: relative;
`;

export const Container = styled.section`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

export const SignupHeading = styled.h1`
  color: #48578c;
  font-size: 24px;
  margin: 45px auto 5px;
  max-width: 460px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0;
  text-transform: none;
`;

export const SignUpDescription = styled.p`
  text-align: center;
  margin: 0 auto 30px;
  max-width: 315px;
  color: #4c5669;
`;

export const TextOnLineColumn = styled.div`
  text-align: center;
  position: relative;
  background: #dae3f0;
  height: 1px;
  max-width: 300px;
  margin: 30px auto;
`;

export const TextOnLine = styled.span`
  background-color: #fff;
  color: #c3cddd;
  font-weight: 600;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  top: -18px;
  display: inline-block;
  position: relative;
`;

export const SkewedBackground = styled.div`
  transform: skewY(-11deg);
  background: #f6fafd;
  height: 530px;
  position: absolute;
  width: 100%;
  margin-top: -160px;
  z-index: 0;
`;

export const BigLogo = styled.div`
  margin: 0 auto;
  position: relative;
  max-width: 170px;

  img {
    width: 100%;
    margin: 30px auto 0;
    display: block;
  }
`;

export const SignUpBox = styled.div`
  margin: 30px auto 45px;
  position: relative;
  border-radius: 4px;
  box-shadow: 0 0 25px 0 rgba(113, 150, 193, 0.2);
  background: #fff;
  overflow: hidden;
  max-width: 600px;
`;

export const LoginButton = styled.input`
  font-weight: 600;
  padding-bottom: 6px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
  text-align: center;
  text-decoration-color: rgb(255, 255, 255);
  text-decoration-line: none;
  text-decoration-style: solid;
  text-indent: 0px;
  text-rendering: optimizelegibility;
  text-shadow: none;
  text-transform: uppercase;
  touch-action: manipulation;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: 300px;
  word-spacing: 0px;
  writing-mode: horizontal-tb;
  color: rgb(255, 255, 255);
  cursor: pointer;
  display: block;
  font-family: Lota, sans-serif;
  font-feature-settings: 'tnum';
  font-size: 14px;
  font-stretch: 100%;
  outline-color: rgb(255, 255, 255);
  height: 50px;
  letter-spacing: 1px;
  line-height: 36px;
  margin-bottom: 40px;
  margin-left: 51px;
  margin-right: 51px;
  margin-top: 30px;
  max-width: 300px;
  border-radius: 2px;
  background-color: rgb(45, 155, 243);
  box-shadow: rgba(36, 129, 215, 0.05) 0 3px 6px 0,
    rgba(36, 129, 215, 0.04) 0 2px 3px 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(36, 129, 215, 0.1),
      0 3px 6px rgba(36, 129, 215, 0.08);
    transition: transform 0.2s ease;
  }
`;
