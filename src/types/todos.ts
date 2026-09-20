export interface todos{
    userId:number,
    id:number, 
    title:string,
    completed:boolean
}
export interface CreateTodoPayload{
    userId:number,
    title:string,
    completed:boolean
}