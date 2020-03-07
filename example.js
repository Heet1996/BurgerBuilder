function nextGreater(arr,n,pos)
{   
    for(let j=pos+1;j<n;j++)
        {
            if(arr[pos]<arr[j])
                return j;
        }
    
}
function nextSmaller(arr,n,pos)
{
    
    for(let j=pos+1;j<n;j++)
        {if(arr[pos]>arr[j])
            return arr[j];
            
        }
    return -1;
}
function main() {
    let n=10;
    let arr=[1,6,2,10,2,3,2,10,6,4];
    let arr1="";
    let arr2="";
    for(let i=0;i<n;i++)
    {
        let greater=nextGreater(arr,n,i);
        let smaller;
        arr2+=(greater+" ");
        if(greater==-1) smaller=-1;
        else smaller=nextSmaller(arr,n,greater);
        arr1+=(smaller+" ");
    
    }
    
    console.log(arr1);
}

main();