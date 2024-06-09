const express = require("express");
const { findObjectById, addObjectToDB, deleteObjById, updateObjById } = require("../utils/database");
const router = express.Router();

const ISSUES_DB_FILE_PATH = "../Sitemate/data/issues.json";

router.get("/:id", async (req, res) => {
    // GET ISSUE BY ID
    const issueId = req.params.id;
    console.log("GET ISSUE " + issueId);

    // PARSE ISSUES JSON FILE FOR GIVEN ID
    const issue = await findObjectById(ISSUES_DB_FILE_PATH, issueId);
    if(!!issue){
        return res.status(200).json(issue);
    }else{
        return res.status(404).json(`Issue with id ${issueId} not found`);
    }
});

router.post("/", async (req, res) => {
    // CREATE NEW ISSUE
    console.log(req.body);
    const newIssue = {
        title: req.body.title,
        description: req.body.description
    }

    // WRITE TO JSON FILE
    addObjectToDB(ISSUES_DB_FILE_PATH, newIssue);

    // RETURN CREATED OBJECT
    console.log(`Created Issue: ${newIssue}`);
    return res.status(200).json(newIssue);
});

router.put("/:id", async (req, res) => {
    // UPDATE ISSUE BY ID
    const issueId = req.params.id;

    const issue = await findObjectById(ISSUES_DB_FILE_PATH, issueId);
    if(!issue){
        return res.status(404).json("Issue does not exist");
    }

    // NOW UPDATE THE ISSUE
    if(!!req.body.title) issue.title = req.body.title;
    if(!!req.body.description) issue.description = req.body.description;

    // NOW UPDATE THE ITEM
    const updatedIssue = await updateObjById(ISSUES_DB_FILE_PATH, issue);
    if(!updatedIssue){
        return res.status(500).json("Failed to update issue");
    }

    return res.status(200).json(updatedIssue);
});

router.delete("/:id", async (req, res) => {
    // DELETE ISSUE BY ID
    const issueId = req.params.id;

    await deleteObjById(ISSUES_DB_FILE_PATH, issueId);
    console.log(`Deleted issue: ${issueId}`);

    res.status(200).send("Successful Deletion");
});

module.exports = router;