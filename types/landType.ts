interface eachart {
  title: string
  id: string
  eachart?: string
}
interface Paragraph {
  title: string
  id: string
  paragraph: eachart[]
}
export interface type {
  title: string
  id: string
  children: Paragraph[]
}

interface year {
  years: string
  id: string
}
interface deal {
  first_level_title: string
  tabData: year[]
  tableData: []
}
export interface trans {
  title: string
  tradeArea: deal
  businessTradePrice: deal
  mineralTradePrice: deal
}
