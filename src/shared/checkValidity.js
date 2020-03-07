export let checkValidity=(values,rules)=>{
    let isValid=true;
    if(rules.required)
    isValid=values.trim()!=='' && isValid;
    if(rules.minLength)
    isValid=values.length>=rules.minLength && isValid;
    if(rules.maxLength)
    isValid=values.length<=rules.maxLength && isValid
    return isValid ;

}