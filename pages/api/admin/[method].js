import querys from 'utils/querys';

export default async function api(req, res) {

  try {

    const { query, body } = req;
    const { method } = query;

    console.log(`\n\n======= [SS API call] [${method}] ===== \n\n`, body, '\n\n')

    const resData = await querys[method](body)
    return res.status(200).json(resData)  

  } catch(e) {
    return res.status(500).send(e.message)
  }  

}
