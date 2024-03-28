import { useQuery } from '@tanstack/react-query';
import { gitHubApi } from '../../api/gitHubApi';
import { Issue } from '../interfaces';
import { IssueComment } from '../components/IssueComment';

const getIssueInfo = async(issueNumber: number): Promise<Issue> => {
    const { data } = await gitHubApi.get<Issue>(`/issues/${issueNumber}`);
    return data;
}

const getIssueComments = async(issueNumber: number): Promise<Issue[]> => {
    const { data } = await gitHubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
    return data;
}

export const useIssue = ( issueNumber: number ) => {
    
    const issueQuery = useQuery({
        queryKey: ['issue', issueNumber],
        queryFn: () => getIssueInfo(issueNumber),
    });

    const commentsQuery = useQuery({
        queryKey: ['issue', issueNumber, 'comments'],
        queryFn: () => getIssueComments(issueQuery.data!.number),
        enabled: !!issueQuery.data
    });


    return {
        issueQuery,
        commentsQuery
    }
}