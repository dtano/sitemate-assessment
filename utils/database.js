const fs = require('fs');
const crypto = require("crypto");

const readJsonFile = async (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        throw new Error(`Error reading or parsing JSON file: ${err}`);
    }
}

const writeJsonFile = async (filePath, data) => {
    try{
        const json = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, json , 'utf8');
    }catch(err) {
        throw new Error(`Error writing to JSON file: ${err}`);
    }
}

const generateId = () => {
    const id = crypto.randomBytes(16).toString("hex");
    return id;
}

const findObjectById = async (filePath, id) => {
    try{
        const data = await readJsonFile(filePath);
        return data.find(item => item.id === id);
    }catch(err){
        console.error(error);
        return null;
    }
}

const addObjectToDB = async (filePath, newObject) => {
    try{
        const id = generateId();
        newObject.id = id;

        const data = await readJsonFile(filePath);
        data.push(newObject);
        await writeJsonFile(filePath, data);
        console.log('Object added successfully.');
    }catch(err){
        console.error(err);
    }
}

const deleteObjById = async (filePath, id) => {
    try{
        let data = await readJsonFile(filePath);
        data = data.filter(item => item.id !== id);
        await writeJsonFile(filePath, data);
        console.log(`Object with id ${id} deleted successfully.`);
    }catch(err){
        console.error(err);
    }
}

const updateObjById = async (filePath, newObject) => {
    try{
        let data = await readJsonFile(filePath);
        const index = data.findIndex(item => item.id === newObject.id);

        if (index !== -1) {
            data[index] = { ...data[index], ...newObject };
            await writeJsonFile(filePath, data);
            console.log(`Object with id ${newObject.id} updated successfully.`);
            return newObject;
        }else{
            throw new Error(`Object with id ${newObject.id} does not exist`);
        }
    }catch(err){
        console.error(err);
        return null;
    }
}

module.exports = {
    findObjectById,
    addObjectToDB,
    deleteObjById,
    updateObjById
}