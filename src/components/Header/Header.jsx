import React, { useRef } from 'react'
import styles from './Header.module.css'
import Timer from '../../UI/Timer'

const Header = ({ timerRef }) => {
  return (
    <div className={styles.header}>
      <h1>Тестирование</h1>
      <Timer ref={timerRef} />
    </div>
  )
}

export default Header
