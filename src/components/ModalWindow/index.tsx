"use client";

import React, { Dispatch, SetStateAction } from "react";

import "./style.scss";
// import close from "@/assets/close.png";

const ModalWindow = ({
  title,
  setClose,
  children,
}: {
  title: string;
  setClose: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode; // Дополнительные компоненты, которые будут отображаться внутри модального окна, например, кнопки "Отмена" и "Сохранить" в форме добавления поста.
}) => {
  const onclose = () => setClose(false);
  return (
    <section className="modal-window">
      <article>
        <div className="modal-head">
          <h2>{title}</h2>
          <div className="modal-close" onClick={onclose}>
            X
          </div>
        </div>
        <div className="modal-content">{children}</div>
      </article>
    </section>
  );
};

export default ModalWindow;
