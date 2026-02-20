export function convertFirstUpperCase(string) {
    if(string !== null) {
        return string.toLowerCase().split(' ').map(function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ')
    }
}