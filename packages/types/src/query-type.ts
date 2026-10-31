type queryType = {
    type: string;
    errorMessage: string;
    responseStatus: number;
}

type queryErrorType = {
    errorMessage: string;
    responseStatus: number;
}

type query = {
    type : queryType
    required : boolean
    error : queryErrorType
}

export type { query, queryType, queryErrorType };