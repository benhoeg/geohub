import styled from 'styled-components'

type StyledProps = {
  type: 'solidGreen' | 'solidPink' | 'solidBlack' | 'solidBlue' | 'solidPurple' | 'ghost' | 'icon' | 'iconRounded'
  primaryColor?: string
  secondaryColor?: string
  isDisabled?: boolean
  width?: string
  isRound?: boolean
}

const StyledButton = styled.div<StyledProps>`
  width: ${({ width }) => width ? width : 'fit-content'};
  cursor: ${({ isDisabled }) => isDisabled && 'not-allowed'};
  
  button {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: ${({ isRound }) => isRound ? '20' : '3'}px;
    height: 42px;
    padding: 0 25px;
    font-size: 1rem;
    font-weight: 500;
    width: 100%;
    user-select: none;

    ${({ type, isDisabled }) => 
      type === 'solidGreen' && 
      !isDisabled && `
        background-color: #047857;
        color: #fff;
    `}

    ${({ type, isDisabled }) => 
      type === 'solidPink' && 
      !isDisabled && `
        background-color: #9D174D;
        color: #fff;
    `}

    ${({ type, isDisabled }) => 
      type === 'solidBlue' && 
      !isDisabled && `
        background-color: #0072FF;
        color: #fff;
    `}

    ${({ type, isDisabled }) => 
      type === 'solidPurple' && 
      !isDisabled && `
        background-color: var(--darkPurple);
        color: #fff;
    `}

    ${({ type, isDisabled }) => 
      type === 'solidBlack' && 
      !isDisabled && `
        background-color: #000;
        color: #fff;
    `}

    ${({ type, isDisabled }) => 
      type === 'ghost' && 
      !isDisabled && `
        background-color: transparent;
        border: var(--border);
        color: #fff;
    `}

    ${({ type, isDisabled }) => 
      type === 'icon' && 
      !isDisabled && `
        padding: 0;
        background-color: transparent;
        height: fit-content;
        width: fit-content;
    `}

    ${({ type, isDisabled }) => 
    type === 'iconRounded' && 
    !isDisabled && `
      border-radius: 50%;
      background-color: var(--background1);
      height: 40px;
      width: 40px;
      padding: 0;
    `}

    ${({ primaryColor, secondaryColor, isDisabled }) => 
      primaryColor && 
      secondaryColor && 
      !isDisabled && `
        background-color: ${ primaryColor };
        color: ${ secondaryColor };
    `}

    ${({ isDisabled }) => 
      isDisabled && `
        background-color: var(--background3);
        color: var(--color2);
        pointer-events: none;
        opacity: 0.5;
    `}
  }
`

export default StyledButton