import { useState } from 'react';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h2>안녕하세요!</h2>
      <div>내용내용내용</div>
      <button onClick={openModal}>버튼 열기</button>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2>안녕하세요</h2>
          <p>모달 내용은 어쩌고 저쩌고</p>
        </Modal>
      )}
    </div>
  );
}

export default App;
