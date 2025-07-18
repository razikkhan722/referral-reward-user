import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const PopupWrapper = ({
  trigger,
  modal = true,
  children,
  position = 'right center',
}) => {
  return (
   <Popup trigger={trigger} modal={modal} position={position}>
      {(close) => (
        <div className="popup-content">
          <div>
            <button className="close" onClick={close}>
              &times;
            </button>
          </div>
          <div>
            {typeof children === 'function' ? children(close) : children}
          </div>
        </div>
      )}
    </Popup>
  );
};

export default PopupWrapper;
