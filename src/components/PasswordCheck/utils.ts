

export function hasSymbol(symbols: string){
  if( symbols.includes('A') || symbols.includes('a') || symbols.includes('1') || symbols.includes('&'))
    return true
  else
    return false
}
export function getLevelIcon(strenghtLevel: number){
  let LevelIcon = 
  strenghtLevel == 4 ?'check-circle':
  strenghtLevel == 3 ?'plus-circle':
  strenghtLevel == 2 ?'minus-circle':
  strenghtLevel == 1 ?'arrow-down-circle':'alert-circle'
  return LevelIcon
}
export function getLevelMessage(strenghtLevel: number){
  let LevelMessage = 
  strenghtLevel == 4 ?'Forte':
  strenghtLevel == 3 ?'Segura':
  strenghtLevel == 2 ?'Mediana':
  strenghtLevel == 1 ?'Fraca':'Precária'
  return LevelMessage
}
export function getTimeFormated(secondsToHack: number){
  let TimeFormated = 
  secondsToHack/(60*60*24*30.25*12*1000) >= 1 ? `${Math.round(secondsToHack/(60*60*24*30.25*12*1000))} Milênios`:
  secondsToHack/(60*60*24*30.25*12*100) >= 1 ? `${Math.round(secondsToHack/(60*60*24*30.25*12*100))} Séculos`:
  secondsToHack/(60*60*24*30.25*12*10) >= 1 ? `${Math.round(secondsToHack/(60*60*24*30.25*12*10))} Décadas`:
  secondsToHack/(60*60*24*30.25*12) >= 1 ? `${Math.round(secondsToHack/(60*60*24*30.25*12))} Anos`:
  secondsToHack/(60*60*24*30.25) >= 1 ? `${Math.round(secondsToHack/(60*60*24*30.25))} Meses`:
  secondsToHack/(60*60*24*7) >= 1 ? `${Math.round(secondsToHack/(60*60*24*7))} Semanas`:
  secondsToHack/(60*60*24) >= 1 ? `${Math.round(secondsToHack/(60*60*24))} Dias`:
  secondsToHack/(60*60) >= 1 ? `${Math.round(secondsToHack/(60*60))} Horas`:
  secondsToHack/60 >= 1 ? `${Math.round(secondsToHack/60)} Minutos`: `${secondsToHack.toFixed(2)} Segundos`
  return  TimeFormated
}
export function getColor(score: number){
  let actualColor = 
  score == 4 ?'#90BE6D':
  score == 3 ?'#409FFF':
  score == 2 ?'#F9C74F':
              '#EE8B9B'
  return actualColor
}