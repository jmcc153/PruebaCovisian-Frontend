import { useEffect, useState } from 'react'
import styles from './pagination.module.scss'

export const Pagination = ({currentPage, setCurrentPage, itemsPerPage, data}) => {

  const [arrayPages, setArrayPages] = useState([])
  useEffect(() => {
    setArrayPages(Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => index + 1))
  }, [data])


  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const pagesSlice = () => {
    if (arrayPages.length < 4) {
      return arrayPages
    }
    return arrayPages.slice(currentPage - 1, currentPage + 2)
  }
  return (
    <div className={styles.pages}>
      <button className={styles.nextPrev} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage == 1}>Anterior</button>
      <div className={styles.numbers}>
        {pagesSlice().map((page, index) => (
          <button className={currentPage == page ? styles.active : ''} key={index} onClick={() => handlePageChange(page)}>{page}</button>
          ))}
      </div>
      <button className={styles.nextPrev} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage == arrayPages.length}>Siguiente</button>
    </div>
  )
}
