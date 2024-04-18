import { useEffect, useState } from 'react'
import { Table } from 'components/table/Table'
import styles from './App.module.scss'
import { Pagination } from 'components/pagination/Pagination'

export const App = () => {

  const [data, setData] = useState([])
  const [date, setDate] = useState({
    dateStart: '',
    dateEnd: ''
  })
  const [countAlquileres, setCountAlquileres] = useState([0, 0])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const url = `${import.meta.env.VITE_URL_API}` || "http://localhost:5281/api"

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_API}/alquiler/GetTables?dateStart=${date.dateStart}&dateEnd=${date.dateEnd}`)
      .then(response => response.json())
      .then(data => setData(data))
  }, [date])

  const paginatedItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return data.slice(indexOfFirstItem, indexOfLastItem)
  }

  const handleDate = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setDate({
      ...date,
      [name]: value
    })
  }

  const handleFilterCard = (e) => {
    e.preventDefault()
    fetch(`${import.meta.env.VITE_URL_API}/alquiler/GetAlquileresMensuales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Fecha: e.target.value })
    })
      .then(response => response.json())
      .then(data => setCountAlquileres(prev => [prev[0], data]))
    fetch(`${import.meta.env.VITE_URL_API}/alquiler/GetAlquileresDiarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Fecha: e.target.value })
    })
      .then(response => response.json())
      .then(data => setCountAlquileres(prev => [data, prev[1]]))
  }
  console.log(countAlquileres)

  return (
    <>
      <div className={styles.container}>
        <h1>Lista alquiler de carros</h1>
        <div className={styles.containerFilterCards}>
          <p>Ingresar una fecha para observar cuantos alquileres se han realizado ese mes y ese día</p>
          <input type="date" onChange={handleFilterCard} />
          <div className={styles.containerCard}>
            <div className={styles.card}>
              <h4>Alquileres Mensuales</h4>
              <p>{countAlquileres[1]}</p>
            </div>
            <div className={styles.card}>
              <h4>Alquileres Diarios</h4>
              <p>{countAlquileres[0]}</p>
            </div>
          </div>
        </div>
        <div className={styles.containerFilter}>
          <h4>Filtrar por fecha</h4>
          <form className={styles.containerInput} onChange={handleDate}>
            <label>Fecha inicio</label>
            <input type="date" name="dateStart" />
            <label>Fecha fin</label>
            <input type="date" name="dateEnd" />
          </form>
        </div>
        <div className={styles.containerTable}>
          <Table data={paginatedItems()} labels={['CEDULA', 'NOMBRE', 'FECHA ALQUILER', 'TIEMPO ALQUILADO', 'SALDO', 'PLACA', 'MARCA']} />
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={5} data={data} />
      </div>
    </>
  )
}

