export interface Albums{
userId:number,
id:number,
title:string
}
export interface CreateAlbumPayload{
userId:number|string,
title:string,
}
export interface UpdateAlbumPayload{
// userId:number|stri,
id:number,
title:string,
}
