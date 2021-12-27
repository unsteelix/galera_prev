import querys from 'utils/querys';

export default async function api(req, res) {
  
  const { query, body } = req;
  const { method } = query;

  try {

    console.log(`\n\n======= [SS API call] [${method}] ===== \n\n`, body, '\n\n')

    const resData = await querys[method](body)

    return res.status(200).json(resData)  

  } catch(e) {
    console.log(`\n\n======= [SS API call error] [${method}] ===== \n\n`, e, '\n\n')

    return res.status(500).send(e)
  }  

}
