import styled from 'styled-components'
import colors from "./colors";

export const StyledBtnPrimary = styled.button`
    width: 175px;
    height: 50px;
    color: ${colors.backgroundPrimary};
    border-radius: 50px;
    background: ${colors.primaryBtn};
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    &:hover {
         color: ${colors.primaryBtn};
         background: ${colors.backgroundPrimary};
         border: 2px solid ${colors.primaryBtn};
    }
    &:focus {
        outline: none;
        box-shadow: none;
    }
`
export const StyledBtnSecondary = styled.button`
    width: 175px;
    height: 50px;
    color: ${colors.secondaryBtn};
    border-radius: 50px;
    background: ${colors.backgroundPrimary};
    border: 2px solid ${colors.secondaryBtn};
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    &:hover {
         color: ${colors.primaryBtn};
         background: ${colors.backgroundPrimary};
         border: 2px solid ${colors.primaryBtn};
    }
    &:focus {
        outline: none;
        box-shadow: none;
    }
`
export const StyledInput = styled.input`
    border-radius: 50px;
    border: 2px solid ${colors.secondaryBtn};
    &:focus {
        outline: none;
        box-shadow: none;
    }
`
export const StyledTextarea = styled.textarea`
    border-radius: 25px;
    resize: none;
    border: 2px solid ${colors.secondaryBtn};
`
export const ErrorMsg = styled.p`
    color: ${colors.secondary}
    font-style: italic;
`

export const SliderStyle = styled.div`
    .prev,
    .next {
        z-index: 2;
        border: none;
        background: transparent;
    }
    
    .prev:hover,
    .next:hover {
        cursor: pointer;
    }
    
    .slide {
        width: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity 4s 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .slide.active {
        opacity: 1;
    }

    .slide .slide__image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    
    .card-body {
       padding: 5rem 1rem;
    } 
    
    .btn-slider {
        display: flex;
        justify-content: space-between;
        margin: 0px -11px 0px -11px;
    }
    
    i {
        color: black;
    }
`

export const FavoriteButton = styled.div`
  .add-fav {
    cursor: pointer;
    transition: all .5s ease;
    
  .fa-heart {
    font-size: 24px;
    color: #454552;
    position: relative;
    transition: all .5s ease-in-out;
  }
  .fa-plus-circle {
    font-size: 9px;
    color: #454552;
    background: #ffffff;
    border-radius: 100%;
    position: absolute;
    bottom: 5px;
    right: 2px;
    line-height: 9px;
    text-align: center;
    -webkit-transition: all 1s ease-in-out;
    -webkit-transition: all 1s ease-in-out;
    -webkit-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
  }
  input[type="checkbox"] { 
    position: absolute;
    opacity: 0;
    &:checked + .fa-heart {
      color: #E85A70;
      .fa-plus-circle {
        opacity: 0;
        transition: all .2s ease-in-out;
      }
    }
  }
}
`
