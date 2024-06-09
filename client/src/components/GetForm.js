import React, { useState } from "react"
import * as issuesApi from "../api/issues";

const GetForm = () => {
    const [id, setId] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            setIsLoading(true);
            
            const issue = await issuesApi.getIssue(id);

            setResult(issue.data);
            setIsLoading(false);
            setId(null);
        }catch(err){
            setResult(err.message);
            setIsLoading(false);
        }
    }

    return (
        <div className='post-form'>
        <h2>GET ISSUE</h2>
        <form onSubmit={handleSubmit}>
            <label>
                ID: 
                <input type='text' name='title' value={id} onChange={e => setId(e.target.value)}/>
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

export default GetForm;