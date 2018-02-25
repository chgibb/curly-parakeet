
export function changePage(to : string,options? : any) : void
{
    (global as any).$.mobile.changePage(to,options);
}