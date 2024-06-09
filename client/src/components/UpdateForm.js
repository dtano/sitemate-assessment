import React, { useState } from "react"
import * as issuesApi from "../api/issues";

const UpdateForm = () => {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            setIsLoading(true);
            const body = {}

            if(!!title) body.title = title;
            if(!!description) body.description = description;
            
            console.log("CALL API", body);
            const issue = await issuesApi.updateIssue(id, body);
            console.log("Issue", issue.data);
            setResult(issue.data);
            setIsLoading(false);

            clearFields();
        }catch(err){
            setResult(err.message);
            setIsLoading(false);
        }
    }

    const clearFields = () => {
        setId(null);
        setTitle(null);
        setDescription(null);
    }

    return (
        <div className='post-form'>
            <h2>UPDATE ISSUE</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    ID: 
                    <input type='text' name='id' value={id} onChange={e => setId(e.target.value)}/>
                </label>
                <label>
                    Title: 
                    <input type='text' name='title' value={title} onChange={e => setTitle(e.target.value)}/>
                </label>
                <label>
                    Description:
                    <input type='text' name='description' value={description} onChange={e => setDescription(e.target.value)}/>
                </label>
                <button type="submit" disabled={isLoading}>
                    Submit
                </button>
            </form> 
            <div>
                {!!result ? JSON.stringify(result) : ""}
            </div>
        </div>
    );
}

export default UpdateForm;