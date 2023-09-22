export const removeAccents = (str) => {
    const accents = "ÀÁÂÃÄÅàáâãäåÇçÐðÈÉÊËèéêëÌÍÎÏìíîïÑñÒÓÔÕÖØòóôõöøÙÚÛÜùúûüÝý";
    const accentsOut = "AAAAAAaaaaaaCcDdEEEEeeeeIIIIiiiiNnOOOOOOooooooUUUUuuuuYY";

    return str
        .split("")
        .map((letter) => {
        const index = accents.indexOf(letter);
        return index !== -1 ? accentsOut[index] : letter;
        })
        .join("");
};
  
export const formatTitle = (title) => {
    const normalizedTitle = removeAccents(String(title).toLowerCase());
    return normalizedTitle.replaceAll(" ", "-");
};

export const formatRate = (num) => {
    return num != undefined ? num.toFixed(1): 0;
}

export const formatDuration = (number) => {
    const runtime = number;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const formattedTime = `${hours}h ${minutes}min`;
    return formattedTime;
}


export const formatNames = (string) => {
    return string
        .normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
        .normalize().toLocaleLowerCase();
}