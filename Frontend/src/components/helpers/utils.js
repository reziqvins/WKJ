export default function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    
    return formattedDate;
}