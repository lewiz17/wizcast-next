export const formatTitle = (title) => {
    return String(title).toLocaleLowerCase().replaceAll(" ", "-");
}

export const formatDuration = (number) => {
    const runtime = number;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const formattedTime = `${hours}h ${minutes}min`;
    return formattedTime;
}