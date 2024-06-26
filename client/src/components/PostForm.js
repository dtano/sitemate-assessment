import React, { useState } from "react"
import * as issuesApi from "../api/issues";

const PostForm = () => {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            setIsLoading(true);
            const body = {
                title: title,
                description: description
            }
            
            console.log("CALL API", body);
            const issue = await issuesApi.createIssue(body);
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
        setTitle(null);
        setDescription(null);
    }

    return (
        <div className='post-form'>
            <h2>POST ISSUE</h2>
            <form onSubmit={handleSubmit}>
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

export default PostForm;