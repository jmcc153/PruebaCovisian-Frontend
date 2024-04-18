import styles from './table.module.scss';


export const Table = ({data, labels}) => {

  return (
    <>
      <table>
        <thead>
          <tr>
            {labels.map((label, index) => (
              <th key={index}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            data.map((user,index) => {
              return <tr key={index}>
                {Object.entries(user).map(([key,value]) => (
                  key == 'status' ? <td className={user.status == 'Pagado' ? styles.paid : styles.pending} key={key}>{value}</td> : <td key={key}>{value}</td>
              ))
            }
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  )
}
