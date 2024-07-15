export function GetCookie(cookieName: string): string | null {
  const name = `${cookieName}=`
  const decodedCookies = decodeURIComponent(document.cookie)
  const cookies = decodedCookies.split(";")
  let cookieValue: string | null = null
  for (let cookie of cookies) {
    const trimedCookie = cookie.trim()
    if (trimedCookie.indexOf(name) !== 0) continue
    cookieValue = cookie.substring(name.length, cookie.length)
    break
  }
  return cookieValue
}

export function SetCookie(cookieName: string, cookieValue: string, days?: number): void {
  let expires: string = ""
  if (days) {
    const date = new Date()
    date.setDate(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = ` ; expires=${date}`
  }
  document.cookie = `${cookieName}=${cookieValue}${expires}; path=/`
}

export function RemoveCookie(cookieName: string): void {
  const pastDate = 100 * 365 * -1
  SetCookie(cookieName, "", pastDate)
}