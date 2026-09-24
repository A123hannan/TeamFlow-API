export interface todos{
    userId:number,
    id:number, 
    title:string,
    completed:boolean
}
export interface CreateTodoPayload{
    userId:number|string,
    title:string,
    completed:boolean
}
export interface UpdateTodoPayload{
    id:number,
    userId:number,
    title:string,
    completed:boolean
}