const logout = (_request, response) => {
  response.clearCookie(cookieName)

  response.status(200).json({ data: true })
}

export default logout