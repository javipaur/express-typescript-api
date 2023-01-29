import { Request, Response } from "express";
import * as cheerio from 'cheerio'


const URLS = {
    farmacias: 'https://www.cofalava.org/sec_df/wf_municipioGuardiaslst.aspx?IdMenu=1014'
  }

  async function scrape (url:string) {
    const res = await fetch(url)
    const html = await res.text()
    return cheerio.load(html)
  }

export const getPharmacies= async (_req:Request,res:Response)=>{
        const $ = await scrape(URLS.farmacias)
        const $rows = $('.FarmaciasGuardiaListado')
        const $count = $rows.length
        console.log($count)
        const FARMACIASBOARD_SELECTORS = {
          nombre: { selector: 'h6', typeOf: 'string' },
          poblacion: { selector: '#ctl00_ch_GridGuardias_ctl00_Label1', typeOf: 'string' },
          direccion: { selector: '#ctl00_ch_GridGuardias_ctl00_Label2', typeOf: 'string' },
          telefono: { selector: '#ctl00_ch_GridGuardias_ctl00_Label3', typeOf: 'string' },
          codigopostal: { selector: '#ctl00_ch_GridGuardias_ctl00_lblCP', typeOf: 'string' },
          horario: { selector: '#ctl00_ch_GridGuardias_ctl00_lblHorarioFarmacia', typeOf: 'string' }
        }
      
        const cleanText = (text:any) => text
          .replace(/\t|\n|\s:/g, '')
          .trim()
      
        const farmaciasBoardSelectorEntries = Object.entries(FARMACIASBOARD_SELECTORS)
        const farmaciasBoard:any = []
        $rows.each((index, el) => {
          const farmaciasBoardEntries = farmaciasBoardSelectorEntries.map(([key, { selector }]) => {
                  if (selector !== 'h6') {
                      const selectorI = selector.substring(0, 26)
                      const selectorF = selector.substring(28)
                      selector = selectorI.concat(('0' + index).slice(-2)).concat(selectorF)
                  }
      
                      const rawValue = $(el).find(selector).text()
                      console.log(rawValue)
                      const cleanedValue = cleanText(rawValue)
      
                      return [key, cleanedValue]
          })
          farmaciasBoard.push(Object.fromEntries(farmaciasBoardEntries))
      })
      
        farmaciasBoard.filter((a:any )=> a.poblacion === 'VITORIA-GASTEIZ')
        console.log(JSON.stringify(farmaciasBoard))
        res.json(farmaciasBoard)
      
 }