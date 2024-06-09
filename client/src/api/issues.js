import axios from "./axios";

const ISSUES_URL = "/api/issues"
const ISSUES_URL_WITH_ID = (id) => {return `${ISSUES_URL}/${id}`};

export const getIssue = async (issueId) => {
    const response = await axios.get(ISSUES_URL_WITH_ID(issueId));
    return response;
}

export const createIssue = async (body) => {
    const response = await axios.post(ISSUES_URL, body);
    return response;
}

export const updateIssue = async (issueId, body) => {
    const response = await axios.put(ISSUES_URL_WITH_ID(issueId), body);
    return response;
}

export const deleteIssue = async (issueId) => {
    const response = await axios.delete(ISSUES_URL_WITH_ID(issueId));
    return response;
}