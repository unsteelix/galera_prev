import fs from 'fs'
import path from 'path'


export default function(req, res) {

    try {

        const fileName = req.query.name;

        const ext = fileName.split('.')[1]
    
        const filePath = path.resolve('.', `volume/files/${fileName}`)
    
        console.log(`\n\n[api/image call] ${filePath}\n\n`)
        
        const imageBuffer = fs.readFileSync(filePath)
        console.log('\n\n ===== imageBuffer ===== \n\n', imageBuffer)


        res.setHeader('Content-Type', `image/${ext}`)
        res.send(imageBuffer)
        res.status(200)

    } catch(e) {

        try {
            console.log('\n\n ===== API IMAGE CALL ERROR ===== \n\n', e)
            const imageBufferDefault = fs.readFileSync(path.resolve('.', `public/not_found.png`))
    
            console.log('\n\n ===== DAFAULT ===== \n\n', imageBufferDefault, '\n\n')
    
    
            res.setHeader('Content-Type', `image/png`)
            res.send(imageBufferDefault)
        } catch (anotherErr) {
            res.json(anotherErr);
            res.status(405).end();        
        }

    }

}