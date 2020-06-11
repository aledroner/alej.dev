export interface Route {
  name: string
  url: string,
  target?: string
}

export interface IconButton extends Route {
  icon: string
}
