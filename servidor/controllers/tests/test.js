
import { Test } from '../../mongodbConfig.js'

let token

async function getTest(req, res) {

    //const testStr = new Test({ text:"Hola mundo" });
    //await testStr.save();
    
    let test = await Test.find({});
    console.log(test);

    res.send(test[0]);
}

export { getTest }