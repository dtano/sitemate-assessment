const fs = require('fs');
const crypto = require("crypto");

const readJsonFile = async (filePath) => {
    try {
        const data = fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        throw new Error(`Error reading or parsing JSON file: ${err}`);
    }
}

const writeJsonFile = async (filePath) => {
    try{
        const json = JSON.stringify(data, null, 2);
        fs.writeFile(filePath, json, 'utf8');
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

        const data = await readJSONFile(filePath);
        data.push(newObj);
        await writeJSONFile(filePath, data);
        console.log('Object added successfully.');
    }catch(err){
        console.error(error);
    }
}

const deleteObjById = async (filePath, newObject) => {
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
        const index = data.findIndex(item => item.id === id);

        if (index !== -1) {
            data[index] = { ...data[index], ...updatedObj };
            await writeJsonFile(filePath, data);
            console.log(`Object with id ${id} updated successfully.`);
            return newObject;
        }else{
            throw new Error(`Object with id ${id} does not exist`);
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