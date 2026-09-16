export interface todos{
    userid:number,
    id:number, 
    title:string,
    completed:boolean
}
export interface CreateTodoPayload{
    userid:number,
    title:string,
    completed:boolean
}