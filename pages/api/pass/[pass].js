import { GALERA_PASSWORD } from 'utils/constants'


export default async function auth(req, res) {
  
  const pass = req.query.pass;


  console.log('12121: ', pass, GALERA_PASSWORD)

  if(pass !== GALERA_PASSWORD){
    res.status(401).send({ error: 'bad password' })
  }

  res.status(200).send(pass)
}
