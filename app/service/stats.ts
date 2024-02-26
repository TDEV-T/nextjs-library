export async function getStats(){
    try{
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}stats`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
        })

        if (resp.status == 200){
            const data = await resp.json();
            return data;
        }else {
            return null;
        }
    }catch(e){
        console.log(e)
    }
}