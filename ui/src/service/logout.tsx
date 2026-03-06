export function logout() {
    sessionStorage.removeItem('TOKEN')
    localStorage.removeItem('USER')
    location.href = '/login'
}