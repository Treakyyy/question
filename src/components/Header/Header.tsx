import React from 'react'
import styles from './Header.module.css'
import Timer from '../../UI/Timer'

interface HeaderProps {
  timerRef: React.RefObject<any>;
}

const Header: React.FC<HeaderProps> = ({ timerRef }) => {
  return (
    <div className={styles.header}>
      <h1>Тестирование</h1>
      <Timer ref={timerRef} />
    </div>
  )
}

export default Header;

