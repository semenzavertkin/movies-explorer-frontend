import React from "react";
import successImage from "../../images/successImage.svg";
import unsuccessImage from "../../images/unsuccessImage.svg";
import './InfoTooltip.css';

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_tooltip ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="conteiner__popup">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="popup__tooltip-conteiner">
          <img
            className="popup__icon"
            src={props.isErr ? unsuccessImage : successImage}
            alt={
              props.isErr
                ? "Что-то пошло не так! Попробуйте ещё раз."
                : "Успешно!"
            }
          />
          <p className="popup__tooltip-text">
            {props.isErr
              ? "Что-то пошло не так! Попробуйте ещё раз."
              : "Успешно!"}
          </p>
        </div>
      </div>
    </div>
  );
}
export default InfoTooltip;