import { useQuery } from "@tanstack/react-query";
import { gitHubApi } from "../../api/gitHubApi";
import { Label } from "../interfaces/label";

const getLabels = async (): Promise<Label[]> => {
    const { data } = await gitHubApi.get<Label[]>('/labels?per_page=100');

    return data;
}

export const useLabels = () => {

    const labelsQuery = useQuery({
        queryKey: ['labels'],
        queryFn: getLabels,
        staleTime: 1000 * 60 * 60,
        // placeholderData: [] // me permite mostrar al usuario data precargada mientras que llega la info de consutla
        // initialData: [] // Me permite cargar información inicial con la cual trabajara el usuario y no se cambiara hasta que se ejecute un staleTime o se refresque el navegador
    });

    return {
        labelsQuery
    };
}