import PropTypes from 'prop-types'; 
import './Modal.css';

function Modal({ onClose, children }) {
  const handleOutsideClick = (e) => {
    if (e.target.id === "myModalContainer") {
      onClose();
    }
  };

  Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  };
  

  return (
    <div id="myModalContainer" onClick={handleOutsideClick} style={{display: 'flex'}}>
      <div>
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default Modal;
