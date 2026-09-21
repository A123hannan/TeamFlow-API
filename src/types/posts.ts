export interface Posts{
userId:number,
id:number,
title:string,
body:string
}
export interface CreatePostPayload{
    userId:number|string,
title:string,
body:string
}
